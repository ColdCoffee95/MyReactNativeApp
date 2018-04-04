/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Button,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    RefreshControl,
    TouchableOpacity,
    View
} from 'react-native';
import HttpUtils from "../utils/http";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import ActiveButton from '../components/common/ActiveButton';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

type Props = {};

export default class Cart extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            tradeType: 1,
            isRefreshing: false,
            isLoading: true,
            isEditing: false,
            cartList: []
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight: (
            <View style={styles.headerRightView}>
                <TouchableHighlight style={{marginRight: 10}} underlayColor='#f2f2f2'
                                    onPress={() => navigation.state.params.editCart()}>
                    <View>
                        <Text>{this.isEditing}</Text>
                    </View>
                </TouchableHighlight>
            </View>)
    });

    componentDidMount() {
        this.props.navigation.setParams({editCart: this.editCart.bind(this)});
        this.fetchData()
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        } else {
            let cartList = [];
            if (this.state.cartList.length > 0) {
                cartList = <SwipeListView
                    useFlatList
                    rightOpenValue={-60}
                    data={this.state.cartList}
                    disableRightSwipe={true}
                    stopRightSwipe={-150}
                    previewRowKey={'12adf'}
                    closeOnRowBeginSwipe={true}
                    closeOnRowPress={true}
                    closeOnScroll={true}
                    keyExtractor={(item) => item.goodsSkuId}
                    renderHiddenItem={(rowData, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity
                                onPress={_ => {
                                    this.closeRow(rowMap, rowData.item.goodsSkuId);
                                    // this.deleteGoods(rowData.item.goodsSkuId)
                                }}>
                                <View style={styles.deleteGoodsView}>
                                    <Text style={styles.deleteGoods}>删除</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    )}
                    renderItem={(data, rowMap) => (
                        <View style={styles.cartItemView}>
                            <TouchableHighlight underlayColor='#fff'
                                                style={styles.iconTouch}
                                                onPress={() => this.clickIcon(data.index)}>
                                <View>
                                    {
                                        data.item.itemSelect === 1 ?
                                            (<Icon name="check-circle" size={20} color={activeColor}></Icon>) :
                                            (<Icon2 name="checkbox-blank-circle-outline" size={20}></Icon2>)
                                    }
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor='#f2f2f2'
                                                style={styles.goodsTouch}
                                                onPress={() => this.toGoodsDetail(data.item.goodsSkuId)}>
                                <View style={styles.cartGoodsView}>
                                    <View style={styles.cartGoodsImgView}>
                                        <Image
                                            source={{uri: data.item.goodsImg + '?imageView2/1/w/200/h/200'}}
                                            resizeMode='contain'
                                            style={styles.cartGoodsImg}
                                        />
                                    </View>
                                    <View style={styles.cartGoodsInfoView}>
                                        <Text style={styles.cartGoodsTitle}
                                              numberOfLines={2}>{data.item.goodsTitle}</Text>
                                        <View>
                                            <Text style={styles.cartSku}>{data.item.sku}</Text>
                                            <Text style={styles.cartEms}>运费:{data.item.emsPrice}</Text>
                                        </View>
                                        <View style={styles.priceNumberView}>
                                            <Text style={styles.priceText}>¥{data.item.putPrice}</Text>
                                            <Text>×{data.item.number}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )}>
                </SwipeListView>;
            } else {
                cartList = <View style={styles.noGoodsView}>
                    <Image
                        style={styles.noGoodsImg}
                        source={require('../images/cart.png')}
                        resizeMode='contain'
                    />
                    <Text style={styles.cartTextTop}>进货单空空如也～</Text>
                    <Text style={styles.cartTextNext}>最热门的商品正在等着您呢</Text>
                    <ActiveButton clickBtn={() => this.backToHome()} text='逛一逛'
                                  style={styles.activeButton}></ActiveButton>
                </View>
            }

            return (
                <View style={styles.container}>
                    {/*<RefreshControl*/}
                    {/*refreshing={this.state.isRefreshing}*/}
                    {/*onRefresh={this._onRefresh.bind(this)}*/}
                    {/*title="加载中..."*/}
                    {/*progressBackgroundColor="#ffff00">*/}

                    {/*</RefreshControl>*/}
                    <View style={styles.tabView}>
                        <TouchableHighlight
                            onPress={() => this.changeTab(1)}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.tradeType === 1 ? styles.activeTab : styles.negativeTab}>一般贸易</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.changeTab(2)}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.tradeType === 2 ? styles.activeTab : styles.negativeTab}>保税区发货</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.changeTab(3)}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.tradeType === 3 ? styles.activeTab : styles.negativeTab}>海外直邮</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {cartList}
                </View>
            );
        }
    }
    editCart() {
        let editing = !this.state.isEditing;
        this.setState({isEditing: editing});
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.fetchData();
    }

    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    clickIcon(index) {//点击图标
        this.state.cartList[index].itemSelect = this.state.cartList[index].itemSelect === 1 ? 0 : 1;
        this.setState({cartList: this.state.cartList});
    }

    deleteGoods(id) {//删掉购物车中某个商品
        let params = {deleteGoodsSkuIds: [id]};
        HttpUtils.post('/shoppingCart/deleteShoppingCartItem', params, data => {
            this.fetchData();
        })
    }

    toGoodsDetail(id) {
        this.props.navigation.navigate('GoodsDetail', {id: id});
    }

    changeTab(index) {
        this.state.tradeType = index;
        this.fetchData();
    }

    backToHome() {
        this.props.navigation.navigate('Home')
    }

    fetchData() {
        let params = {
            tradeType: this.state.tradeType
        };
        HttpUtils.get('/shoppingCart/viewShoppingCart', params, data => {
            let cartList = data.data;
            cartList.map(value => {
                let sku = JSON.parse(value.goodsSku);
                let skuStr = "";
                for (let key in sku) {
                    skuStr += `${key}:${sku[key]},`;
                }
                skuStr = skuStr.substr(0, skuStr.length - 1);
                value.sku = skuStr;
            });
            this.setState({isLoading: false, cartList: cartList, isRefreshing: false});
            console.warn(cartList)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    rowBack: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    deleteGoodsView: {
        backgroundColor: activeColor,
        width: 60,
        height: screenWidth * 0.25 + 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteGoods: {
        color: whiteColor
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
        width: screenWidth / 3,
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
    noGoodsView: {
        alignItems: 'center',
        backgroundColor: whiteColor,
        width: screenWidth,
        paddingBottom: 10
    },
    noGoodsImg: {
        width: screenWidth * 0.6,
        height: screenWidth * 0.6 * 322 / 524,
        marginTop: 30
    },
    cartTextTop: {
        marginTop: 30,
        fontSize: 14
    },
    cartTextNext: {
        marginTop: 10,
        fontSize: 12
    },
    activeButton: {
        backgroundColor: activeColor,
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 5
    },
    cartItemView: {
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        backgroundColor: whiteColor,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    cartGoodsImgView: {
        width: screenWidth * 0.25,
        height: screenWidth * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: borderColor
    },
    cartGoodsImg: {
        width: 80,
        height: 80
    },
    iconTouch: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    goodsTouch: {
        flex: 0.9
    },
    cartGoodsView: {
        flexDirection: 'row'
    },
    cartGoodsInfoView: {
        justifyContent: 'space-between',
        width: screenWidth * 0.65,
        paddingLeft: 10,
        paddingRight: 10
    },
    cartGoodsTitle: {},
    priceNumberView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceText: {
        color: activeColor
    },
    cartSku: {
        color: '#ababab'
    },
    cartEms: {
        color: '#ababab'
    }
});
