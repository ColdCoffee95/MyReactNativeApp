/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    SafeAreaView,
    FlatList,
    Image,
    View
} from 'react-native';
import Text from '../../components/common/MyText';
type Props = {};
export default class AfterSaleOrders extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loadingMore: false,//是否在上拉拉加载更多中
            allLoadCompleted: false,//是否全部加载完
            pageSize: 5,
            pageNo: 1,
            orderList: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        let orderList = null;
        if (this.state.isLoading) {
            orderList = <View/>
        } else {
            orderList = <FlatList
                data={this.state.orderList}
                extraData={this.state}
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

        return <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
            <View style={styles.container}>
                {
                    !this.state.isLoading && !this.state.loadingMore && orderList
                }
            </View>
        </SafeAreaView>

    }

    _onEndReached() {
        if (this.state.allLoadCompleted || this.state.loadingMore) {
            return;
        }
        this.state.loadingMore = true;
        this.state.pageNo += 1;
        let params = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNo,
        };
        HttpUtils.post('/order/selectOrderAftersalesByMemberId', params, data => {
            console.warn(data.data.isLastPage)
            let list = data.data.pageInfo.list;
            let arr = [];
            list.map(value => {
                value.goodsInfo = JSON.parse(value.goodsInfo);
                arr.push(value);
            });
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({orderList: this.state.orderList.concat(arr),loadingMore:false});
        })
    }

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => {
        let goodsList = [];
        item.goodsInfo.map(value => {
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
                        <View style={styles.priceNumberView}>
                            <Text style={styles.priceText}>¥{value.putPrice}</Text>
                            <Text>×{value.number}</Text>
                        </View>
                    </View>
                </View>
            )
        });
        let typeName = afterTypes.find(value => item.orderAftersalesStatus == value.id).name;
        return <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.afterSaleDetail(item.orderAftersalesId)}>
            <View>
                {/*yMMddHHmmss*/}
                <View style={styles.orderTopView}>
                    <Text>申请时间：{dateFormat(item.createTime)}</Text>
                    <Text>{typeName}</Text>
                </View>
                <View style={styles.goodsWrapper}>
                    {goodsList}
                </View>
                <View style={styles.paymentPrice}>
                    <Text>退款金额：¥{item.refundPrice}</Text>
                </View>
            </View>
        </TouchableHighlight>
    };

    afterSaleDetail(id) {
        this.props.navigation.navigate('AfterSaleDetail', {id: id});
    }

    _renderFooter() {
        if (this.state.loadingMore) {
            return (<View/>)
        } else if (this.state.allLoadCompleted) {
            if (this.state.orderList.length > 0) {
                return (<View style={{alignItems: 'center', height: 30, justifyContent: 'center'}}>
                    <Text>没有更多了</Text>
                </View>)
            } else {
                return <View></View>
            }
        } else {
            return (<View></View>)
        }
    }

    fetchData() {
        this.setState({
            isLoading: true,
            pageNo: 1,
        });
        let params = {
            pageSize: this.state.pageSize,
            pageNum: 1,
        };
        HttpUtils.post('/order/selectOrderAftersalesByMemberId', params, data => {

            let list = data.data.pageInfo.list;
            let arr = [];
            list.map(value => {
                value.goodsInfo = JSON.parse(value.goodsInfo);
                arr.push(value);
            });
            if (data.data.pageInfo.isLastPage) {
                this.setState({
                    allLoadCompleted: true,
                });
            }
            this.setState({
                orderList: arr,
                isLoading: false,
            });
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteColor,
        flex: 1,

    },
    orderTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: whiteColor,
    },
    goodsWrapper: {
        backgroundColor: '#f8f8f8',
    },
    goodsView: {
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10
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
        height: screenWidth * 0.25,
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
        width: screenWidth,
        padding: 12,
        backgroundColor: whiteColor,
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: screenWidth,
        padding: 5,
        backgroundColor: whiteColor,
        borderTopWidth: 1,
        borderTopColor: borderColor
    },
    commonButton: {
        backgroundColor: whiteColor,
        marginRight: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: borderColor
    },
    activeButton: {
        backgroundColor: whiteColor,
        marginRight: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: activeColor
    }
});
