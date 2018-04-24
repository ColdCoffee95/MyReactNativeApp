/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    FlatList,
    TouchableHighlight,
    SafeAreaView,
    Text,
    View
} from 'react-native';
import ActiveButton from '../../components/common/ActiveButton'
import LoadingView from '../../components/common/LoadingView';

type Props = {};

export default class DiaperCurrency extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            goodsList: [],
            isLoading: true,
            allLoadCompleted: false,
            loadingMore: false,
            pageSize: 10,
            pageNo: 1,
            type: 4//4是尿不湿通货

        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        let goodsList = null;
        if (this.state.isLoading) {
            goodsList = <LoadingView/>
        } else {
            goodsList = <FlatList
                data={this.state.goodsList}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.2}
                numColumns={2}
                ListHeaderComponent={() => <View>
                    <Image
                        resizeMode='contain'
                        style={styles.banner}
                        source={require('../../images/milkCurrency.png')}
                    />
                </View>}
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
                        source={require('../../images/noGoods.png')}
                    />
                    <Text>暂无此类商品</Text>
                </View>}
            />
        }
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <View style={styles.goodsListView}>
                        {goodsList}
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    fetchData() {
        let params = {
            pageSize: this.state.pageSize,
            pageNo: 1,
            type: this.state.type
        };
        HttpUtils.post('/goods/selectActivityGoodsList', params, data => {
            if (data.data.isLastPage) {
                this.setState({
                    allLoadCompleted: true,
                });
            }
            this.setState({
                goodsList: data.data.list,
                isLoading: false,
            });
        })
    }

    _renderFooter() {
        if (this.state.loadingMore) {
            return (<LoadingView/>)
        } else if (this.state.allLoadCompleted) {
            return (<View style={{alignItems: 'center', height: 30, justifyContent: 'center'}}>
                <Text>没有更多商品了</Text>
            </View>)
        } else {
            return (<View></View>)
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
            pageNo: this.state.pageNo,
            type: this.state.type
        };
        HttpUtils.post('/goods/selectActivityGoodsList', params, data => {
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({goodsList: this.state.goodsList.concat(data.data.list),loadingMore:false});
        })
    }

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.goodsDetail(item.id)}>
            <View style={styles.goodsView} key={item.id}>
                <View style={styles.goodsImgView}>
                    <Image
                        style={styles.goodsImg}
                        resizeMode='contain'
                        source={{uri: item.img + '?imageView2/1/w/200/h/200'}}
                    />
                </View>
                <View style={styles.goodsTitleView}>
                    <Text style={styles.goodsTitle} numberOfLines={2}>{item.title}</Text>
                </View>
                <View style={styles.goodsPriceView}>
                    <Text style={styles.goodsPrice}>¥{item.marketPrice}</Text>
                    <Text style={{
                        color: this.getColor(item.tradeType)

                    }}>{item.tradeName}</Text>
                </View>
                <View>
                    <ActiveButton text="立即抢购" style={styles.buyBtn} clickBtn={() => {
                        this.goodsDetail(item.id)
                    }}/>
                </View>
            </View>
        </TouchableHighlight>
    );

    getColor(type) {
        let color = '#78E285';
        cartTabList.map(value => {
            if (value.id === type) {
                color = value.color;
            }
        });
        return color;
    }

    goodsDetail(id) {
        this.props.navigation.navigate('GoodsDetail', {id: id});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    banner: {
        width: screenWidth,
        height: 384 * screenWidth / 750
    },
    goodsListView: {
        width: screenWidth,
        justifyContent: 'space-between'
    },
    goodsView: {
        width: screenWidth / 2,
        borderLeftColor: borderColor,
        borderRightColor: borderColor,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // height: 220,
    },
    goodsImgView: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goodsImg: {
        width: 100,
        height: 100
    },
    goodsInfoView: {
        // justifyContent: 'space-between',
    },
    goodsTitleView: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 30
    },
    goodsTitle: {
        fontSize: 12
    },
    goodsPriceView: {
        flexDirection: 'row',
        width: screenWidth / 2 - 20,
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    goodsPrice: {
        color: activeColor
    },
    goodsTrade: {
        color: '#c685ff',
    },
    buyBtn: {
        backgroundColor: activeColor,
        alignItems: 'center',
        width: (screenWidth - 6) / 2,
        padding: 10,
    }
});
