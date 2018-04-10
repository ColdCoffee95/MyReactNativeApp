/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    ActivityIndicator,
    Linking,
    TextInput,
    FlatList,
    Image,
    Alert,
    ScrollView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveButton from '../../components/common/ActiveButton';
import {observer} from 'mobx-react';
import {action, autorun} from 'mobx';
import selectPayTypeCountdown from '../../mobx/selectPayTypeCountdown'

type Props = {};
@observer
export default class Order extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loadingMore: false,//是否在上拉拉加载更多中
            allLoadCompleted: false,//是否全部加载完
            pageSize: 5,
            pageNo: 1,
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
        this.state.orderType = this.props.navigation.state.params.type || -1;
        this.fetchData()
    }

    render() {
        let orderList = null;
        if (this.state.isLoading) {
            orderList = <ActivityIndicator style={styles.loadingStyle}></ActivityIndicator>
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
                        style={{width: 100, height: 100}}
                        resizeMode='contain'
                        source={require('../../images/no-order.jpg')}
                    />
                </View>}
            />
        }
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        } else {
            return <View style={styles.container}>

            </View>
        }

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
            searchWord: this.state.searchWord,
            orderStatus: this.state.orderType
        };
        HttpUtils.post('/order/viewOrderList', params, data => {
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({orderList: this.state.goodsList.concat(data.data.list)});
            this.state.loadingMore = false;
        })
    }

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => {
        let sellout = <View></View>
        if (item.count === 0) {
            sellout = <Image
                style={styles.goodsImgSellout}
                resizeMode='contain'
                source={require('../../images/sellout.png')}
            />;
        }

        return <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.goodsDetail(item.id)}>
            <View style={styles.goodsView} key={item.id}>
                <View style={styles.goodsImgView}>
                    <Image
                        style={styles.goodsImg}
                        resizeMode='contain'
                        source={{uri: item.img + '?imageView2/1/w/200/h/200'}}
                    />
                    {sellout}
                </View>
                <View style={styles.goodsInfoView}>
                    <View style={styles.goodsTitleView}>
                        <Text numberOfLines={2}>{item.title}</Text>
                    </View>
                    <View style={styles.goodsPriceView}>
                        <Text style={styles.goodsPrice}>¥{item.marketPrice}</Text>
                        <Text style={{color: this.getColor(item.tradeType)}}>{item.tradeName}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    }

    _renderFooter() {
        if (this.state.loadingMore) {
            return (<View>
                <ActivityIndicator></ActivityIndicator>
            </View>)
        } else if (this.state.allLoadCompleted) {
            return (<View style={{alignItems: 'center', height: 30, justifyContent: 'center'}}>
                <Text>没有更多商品了</Text>
            </View>)
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
            searchWord: this.state.searchWord,
            orderStatus: this.state.orderType
        };
        HttpUtils.post('/order/viewOrderList', params, data => {
            console.warn(data.data.list)
            if (data.data.isLastPage) {
                this.setState({
                    allLoadCompleted: true,
                });
            }
            this.setState({
                orderList: data.data.list,
                isLoading: false,
            });
        })
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,

    },

});
