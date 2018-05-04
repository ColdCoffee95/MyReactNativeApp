/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Image,
    Alert,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveButton from '../../components/common/ActiveButton';
import Text from '../../components/common/MyText';

type Props = {};
export default class Order extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loadingMore: false,//是否在上拉拉加载更多中
            allLoadCompleted: false,//是否全部加载完
            pageSize: 10,
            pageNo: 1,
            total:0,
            tabList: [
                {
                    id: -1,
                    name: "全部"
                },
                {
                    id: 1,
                    name: "待支付"
                },
                {
                    id: 3,
                    name: "待发货"
                },
                {
                    id: 2,
                    name: "待收货"
                },
                {
                    id: 4,
                    name: "待评价"
                }
            ],
            orderType: -1,
            orderList: [],
            searchWord: ''
        }
    }

    componentDidMount() {
        if (this.props.navigation.state.params && this.props.navigation.state.params.type) {
            this.state.orderType = this.props.navigation.state.params.type;
        }
        // this.props.navigation.setParams({orderGoBack: this.orderGoBack.bind(this)});
        this.fetchData()
    }

    // static navigationOptions = ({navigation, screenProps}) => ({
    //     headerLeft: <TouchableOpacity onPress={() => navigation.state.params.orderGoBack()}>
    //         <View style={{paddingLeft: 15}}>
    //             <Icon name='angle-left' size={40} color='black'></Icon>
    //         </View>
    //     </TouchableOpacity>
    //
    // });

    render() {
        let orderList = null;
        if (this.state.isLoading) {
            orderList = <View/>
        } else {
            orderList = <FlatList
                data={this.state.orderList}
                extraData={this.state}
                initialNumToRender={this.state.total}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.2}
                ItemSeparatorComponent={() => <View
                    style={{backgroundColor: '#f2f2f2', height: 10}}
                />}
                ListFooterComponent={this._renderFooter.bind(this)}
                ListEmptyComponent={() => <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50
                    }}
                >
                    <Image
                        style={{width: 200, height: 200}}
                        resizeMode='contain'
                        source={require('../../images/noOrder.png')}
                    />
                    <Text>当前无此类订单</Text>
                </View>}
            />
        }
        let tabList = [];
        this.state.tabList.map(value => {
            tabList.push(
                <TouchableOpacity
                    key={value.id}
                    onPress={() => this.changeTab(value.id)}>
                    <View style={styles.singleTab}>
                        <Text
                            style={this.state.orderType === value.id ? styles.activeTab : styles.negativeTab}>{value.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
            <View style={styles.container}>
                <View style={styles.tabView}>
                    {tabList}
                </View>
                {
                    !this.state.isLoading && orderList
                }
            </View>
        </SafeAreaView>

    }

    // orderGoBack() {
    //     this.props.navigation.pop();
    // }

    _onEndReached() {

        if (this.state.allLoadCompleted || this.state.loadingMore) {
            return;
        }
        this.state.loadingMore = true;
        this.state.pageNo += 1;
        let params = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNo,
            searchWord: this.state.searchWord,
            orderStatus: this.state.orderType
        };
        HttpUtils.post('/order/viewOrderList', params, data => {
            console.warn('_onEndReached')
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({orderList: this.state.orderList.concat(data.data.list), loadingMore: false});
        })
    }

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => {
        let goodsList = [];
        item.orderItemList.map(value => {
            goodsList.push(
                <View style={styles.goodsView}>
                    <View style={styles.goodsImgView}>
                        <Image
                            source={{uri: value.goodsImg + '?imageMogr2/thumbnail/200x200'}}
                            resizeMode='contain'
                            style={styles.goodsImg}
                        />
                    </View>
                    <View style={styles.goodsInfoView}>
                        <Text style={styles.goodsTitle}
                              numberOfLines={2}>{value.goodsTitle}</Text>
                        <View>
                            <Text style={styles.sku}>{value.sku}</Text>
                        </View>

                        <View style={styles.priceNumberView}>
                            <Text style={styles.priceText}>¥{value.putPrice}</Text>
                            <Text>×{value.number}</Text>
                        </View>
                    </View>
                </View>
            )
        });
        let orderTypeName = orderStatusList.find(value => item.orderStatus === value.id).name;
        // let height = 40 + 40 + item.orderItemList.length * 100 + 40;
        return <TouchableHighlight
            underlayColor='#f2f2f2'
            onPress={() => this.orderDetail(item.orderId)}
            >
            <View>
                {/*yMMddHHmmss*/}
                <View style={styles.orderTopView}>
                    <Text>{dateFormat(item.createTime)}</Text>
                    <Text>{orderTypeName}</Text>
                </View>
                <View style={styles.goodsWrapper}>
                    {goodsList}
                </View>
                <View style={styles.paymentPrice}>
                    <Text>支付金额：¥{item.paymentPrice}</Text>
                </View>
                {
                    item.orderStatus === 1 &&
                    <View style={styles.btnView}>
                        <ActiveButton clickBtn={() => this.jumpToPay(item.orderId)} text='去支付'
                                      textStyle={{color: 'black'}}
                                      style={styles.commonButton}></ActiveButton>
                        <ActiveButton clickBtn={() => this.cancelOrder(item.orderId)} text='取消订单'
                                      textStyle={{color: 'black'}}
                                      style={styles.commonButton}></ActiveButton>
                    </View>
                }
                {
                    item.orderStatus === 2 &&
                    <View style={styles.btnView}>
                        <ActiveButton clickBtn={() => this.getDeliveryInfo(item.orderId)} text='查看物流'
                                      textStyle={{color: 'black'}}
                                      style={styles.commonButton}></ActiveButton>
                        <ActiveButton clickBtn={() => this.confirmReceipt(item.orderId)} text='确认收货'
                                      textStyle={{color: 'black'}}
                                      style={styles.commonButton}></ActiveButton>
                    </View>
                }
                {
                    item.orderStatus === 3 &&
                    <View style={styles.btnView}>
                        <ActiveButton clickBtn={() => this.expediteDelivery(item.orderId)} text='催发货'
                                      textStyle={{color: 'black'}}
                                      style={styles.commonButton}></ActiveButton>
                    </View>
                }
                {
                    item.orderStatus === 4 &&
                    <View style={styles.btnView}>
                        <ActiveButton clickBtn={() => this.comment(item.orderId)} text='评价'
                                      style={styles.activeButton} textStyle={{color: activeColor}}></ActiveButton>
                    </View>
                }
            </View>
        </TouchableHighlight>
    }

    orderDetail(id) {
        this.props.navigation.navigate('OrderDetail', {id: id});
    }

    changeTab(index) {
        if (this.state.orderType === index) {
            return;
        }
        this.state.orderType = index;
        this.fetchData();
    }

    _renderFooter() {
        if (this.state.loadingMore) {
            return <View/>
        } else if (this.state.allLoadCompleted) {
            if (this.state.orderList.length > 0) {
                return (<View style={{alignItems: 'center', height: 30, justifyContent: 'center'}}>
                    <Text>没有更多订单了</Text>
                </View>)
            } else {
                return <View/>
            }
        } else {
            return <View/>
        }
    }

    fetchData() {
        this.state.isLoading = true;
        this.state.pageNo = 1;
        let params = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNo,
            searchWord: this.state.searchWord,
            orderStatus: this.state.orderType
        };
        HttpUtils.post('/order/viewOrderList', params, data => {
            console.warn(data)
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({
                orderList: data.data.list,
                total:data.data.total,
                isLoading: false,
            });
        })
    }

    jumpToPay(orderId) {//去支付
        this.props.navigation.navigate('SelectPayType', {
            orderId: orderId, goBack: () => this.fetchData()
        });
    }

    cancelOrder(orderId) {//取消订单
        Alert.alert(null, '确认取消该订单？',
            [
                {
                    text: "确定", onPress: () => {
                    HttpUtils.post('/order/manuallyCancelOrder', {orderId: orderId}, data => {
                        ToastUtil.show('操作成功');
                        this.fetchData();
                    })
                }
                },
                {
                    text: "取消", onPress: () => {
                }
                },
            ],
            {cancelable: false}
        )
    }

    getDeliveryInfo(orderId) {//查看物流
        this.props.navigation.navigate('ViewLogistics', {orderId: orderId});
    }

    confirmReceipt(orderId) {//确认收货
        Alert.alert(null, '确认收到货了吗？',
            [
                {
                    text: "确认", onPress: () => {
                    HttpUtils.post('/order/confirmReceive', {orderId: orderId}, data => {
                        ToastUtil.show('操作成功');
                        this.fetchData();
                    })
                }
                },
                {
                    text: "取消", onPress: () => {
                }
                },
            ],
            {cancelable: false}
        )
    }

    expediteDelivery() {
        Alert.alert(null, '操作成功,已提醒商家尽快发货')
    }

    comment(orderId) {
        this.props.navigation.navigate('Comment', {
            orderId: orderId,
            goBack: () => this.fetchData()
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteColor,
        flex:1
    },
    orderTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: whiteColor,
    },
    goodsWrapper: {
        backgroundColor: '#f8f8f8',
    },
    goodsView: {
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        height: 100,
    },
    goodsImgView: {
        width: screenWidth * 0.25,
        height: screenWidth * 0.25,
        marginLeft: screenWidth * 0.05,
        borderWidth: 1,
        borderColor: borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    goodsImg: {
        width: 80,
        height: 80
    },
    goodsInfoView: {
        justifyContent: 'space-between',
        width: screenWidth * 0.7,
        paddingLeft: 10,
        paddingRight: 10
    },
    goodsTitle: {},
    priceNumberView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceText: {
        color: activeColor
    },
    sku: {
        color: '#ababab'
    },
    ems: {
        color: '#ababab'
    },
    tabView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: screenWidth,
        backgroundColor: whiteColor,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    singleTab: {
        width: screenWidth / 5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        color: activeColor
    },
    negativeTab: {
        color: '#444'
    },
    paymentPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: screenWidth,
        height: 40,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: whiteColor,
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: screenWidth,
        height: 40,
        backgroundColor: whiteColor,
        borderTopWidth: 1,
        borderTopColor: borderColor
    },
    commonButton: {
        backgroundColor: whiteColor,
        marginRight: 10,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: borderColor
    },
    activeButton: {
        backgroundColor: whiteColor,
        marginRight: 10,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: activeColor
    }
});
