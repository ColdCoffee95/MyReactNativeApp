/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight,
    View,
    FlatList,
    Text,
} from 'react-native';
import LoadingView from '../../components/common/LoadingView';
export default class RecommandForYou extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            goodsList: [],
            allLoadCompleted: false,
            loadingMore: false,
            pageSize: 10,
            pageNo: 1,
            isLoading: true,
            type: 1,

        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        let goodsList = null;
        if (this.state.isLoading) {
            return <LoadingView/>
        } else {
            goodsList = <FlatList
                data={this.state.goodsList}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.2}
                numColumns={2}
                ListHeaderComponent={() => this._renderHeader()}
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
            return <View style={styles.container}>

                <View style={styles.goodsListView}>
                    {goodsList}
                </View>
            </View>
        }

    }

    _renderHeader() {
        return <View>
            {this.props.header}
            <View style={styles.activityTitle}>
                <Image style={styles.imageLogo} resizeMode='contain'
                       source={require('../../images/tjlogo.png')}/>
                <Image style={styles.imageTitle} resizeMode='contain'
                       source={require('../../images/tjword.png')}/>
            </View>
        </View>
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
        console.warn('reaching')
        this.state.loadingMore = true;
        this.state.pageNo += 1;
        let params = {
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo,
            type: this.state.type
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({goodsList: this.state.goodsList.concat(data.data.list)});
            this.state.loadingMore = false;
        })
    }

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <TouchableHighlight underlayColor='#f2f2f2' style={styles.goodsTouch} onPress={() => this.goodsDetail(item.id)}>
            <View style={styles.singleGoods}>
                <View style={styles.goodsImgView}>
                    <Image
                        source={{uri: item.img + '?imageView2/1/w/100/h/100'}}
                        style={styles.goodsImg}
                        resizeMode='contain'
                    />
                </View>
                <Text style={styles.goodsTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.goodsPriceView}>
                    <Text style={styles.goodsPrice}>¥{item.marketPrice}</Text>
                    <Text style={{
                        color: this.getColor(item.tradeType)
                    }}>{item.tradeName}</Text>
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

    async fetchData() {
        let params = {
            pageSize: this.state.pageSize,
            pageNo: 1,
            type: this.state.type
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteColor,
    },
    activityTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        width: screenWidth
    },
    goodsListView: {
        width: screenWidth,
        justifyContent: 'space-between'
    },
    imageLogo: {
        width: 18,
    },
    imageTitle: {
        width: 81,
        marginLeft: 10
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor
    },
    goodsWrapper: {
        width: screenWidth,
    },
    catImg: {
        width: screenWidth / 8,
        height: screenWidth / 8
    },
    catName: {
        marginTop: 10
    },
    goodsTouch: {
        marginBottom: 10,
        marginLeft: 10
    },
    singleGoods: {
        width: (screenWidth - 30) / 2,
        borderWidth: 1,
        borderColor: '#e3e3e3',

    },
    goodsImgView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (screenWidth - 30) / 2,
        height: 120

    },
    goodsImg: {
        width: 100,
        height: 100
    },
    goodsTitle: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    goodsPriceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    goodsPrice: {
        color: '#fd4a70',
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    }

});
