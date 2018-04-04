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
    View
} from 'react-native';
import HttpUtils from "../utils/http";
import ActiveButton from '../components/common/ActiveButton';

type Props = {};

export default class Cart extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            tradeType: 1,
            isRefreshing: false,
            isLoading: true,
            cartList: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        } else {
            let cartList = [];
            if (this.state.cartList.length > 0) {
                this.state.cartList.map(value => {
                    cartList.push(
                        <View key={value.id}>

                        </View>
                    )
                });
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
                <ScrollView contentContainerStyle={styles.container}>
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        title="加载中..."
                        progressBackgroundColor="#ffff00">

                    </RefreshControl>
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
                </ScrollView>
            );
        }
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.fetchData();
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
        console.warn('fetching')
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
        backgroundColor: whiteColor,
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
        alignItems: 'center'
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
    }
});
