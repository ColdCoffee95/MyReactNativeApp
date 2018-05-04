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
    SafeAreaView
} from 'react-native';
import Text from '../../components/common/MyText';
export default class FootPrint extends Component<Props> {
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
            return <View/>
        } else {
            goodsList = <FlatList
                data={this.state.goodsList}
                extraData={this.state}
                renderItem={this._renderItem}
                numColumns={2}
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
                        source={require('../../images/noFootPrint.png')}
                    />
                    <Text>您还没浏览过任何商品，马上去逛一逛吧</Text>
                </View>}
            />
            return <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>

                    <View style={styles.goodsListView}>
                        {goodsList}
                    </View>
                </View>
            </SafeAreaView>
        }

    }

    _renderItem = ({item}) => (
        <TouchableHighlight underlayColor='#f2f2f2' style={styles.goodsTouch} onPress={() => this.goodsDetail(item.id)}>
            <View style={styles.singleGoods}>
                <View style={styles.goodsImgView}>
                    <Image
                        source={{uri: item.img + '?imageMogr2/thumbnail/400x400'}}
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

    fetchData() {
        storage.load({key: 'footPrintGoods'}).then(res => {
            this.setState({
                goodsList: res,
                isLoading: false,
            });
        }).catch(e => {
            if (e.name == 'NotFoundError') {
                this.setState({
                    goodsList: [],
                    isLoading: false,
                });
            }
        })
        // let params = {
        //     pageSize: this.state.pageSize,
        //     pageNo: 1,
        //     type: this.state.type
        // };
        // HttpUtils.post('/goods/catBrandGoodsList', params, data => {
        //     if (data.data.isLastPage) {
        //         this.setState({
        //             allLoadCompleted: true,
        //         });
        //     }
        //     this.setState({
        //         goodsList: data.data.list,
        //         isLoading: false,
        //     });
        // })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteColor,
        flex: 1
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
        marginTop: 10
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
    }

});
