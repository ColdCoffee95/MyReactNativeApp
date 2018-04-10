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
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    AppState,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import ActiveButton from '../../components/common/ActiveButton';
import {observer} from 'mobx-react';
import {action, autorun} from 'mobx';
import selectPayTypeCountdown from '../../mobx/selectPayTypeCountdown'
import Alipay from 'react-native-yunpeng-alipay';
import * as WeChat from 'react-native-wechat';

WeChat.registerApp('wxb8f9e4f7b2576589');
type Props = {};
@observer
export default class SelectPayType extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
            order: {},
            isLoading: true,
            payType: 1,//1是支付宝，2是微信
            toggle: false,
            interval: null,
            currentAppState: AppState.currentState
        };
        this.data = new selectPayTypeCountdown()
    }

    componentDidMount() {
        this.state.orderId = this.props.navigation.state.params.orderId;
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));
        this.fetchData()
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        } else {
            let order = this.state.order;
            let goodsList = [];
            let totalNum = 0;
            order.orderItemList.map(value => {
                totalNum += value.number;
                goodsList.push(
                    <View style={styles.goodsItemView}>
                        <View style={styles.goodsImgView}>
                            <Image
                                source={{uri: value.goodsImg + '?imageView2/1/w/200/h/200'}}
                                resizeMode='contain'
                                style={styles.goodsImg}/>
                        </View>
                        <View style={styles.goodsInfoView}>
                            <Text style={styles.goodsTitle}
                                  numberOfLines={2}>{value.goodsTitle}</Text>
                            <View>
                                <Text style={styles.sku}>{value.sku}</Text>
                                <Text style={styles.ems}>运费:{value.emsPrice}</Text>
                            </View>
                            <View style={styles.priceNumberView}>
                                <Text style={styles.priceText}>{value.putPrice}</Text>
                                <Text>×{value.number}</Text>
                            </View>
                        </View>
                    </View>
                )
            });
            let firstGoods = goodsList[0];
            return <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.countdownView}>
                        <Text>支付剩余时间</Text>
                        <View style={styles.countdownTimeView}>
                            <Text style={styles.timeText}>{this.data.hours}</Text>
                            <Text>时</Text>
                            <Text style={styles.timeText}>{this.data.minutes}</Text>
                            <Text>分</Text>
                            <Text style={styles.timeText}>{this.data.seconds}</Text>
                            <Text>秒</Text>
                        </View>
                    </View>
                    <View>
                        {
                            this.state.toggle &&
                            goodsList
                        }
                        {
                            !this.state.toggle &&
                            firstGoods
                        }
                        <View style={styles.totalView}>
                            <Text>共{totalNum}件商品</Text>
                            <Text style={{marginLeft: 5, marginRight: 5}}>需支付¥{order.paymentPrice}</Text>
                            {
                                order.orderItemList.length > 1 &&
                                <TouchableOpacity onPress={() => this.setState({toggle: !this.state.toggle})}>
                                    {
                                        this.state.toggle &&
                                        (<Icon name="angle-up" size={20}></Icon>)
                                    }
                                    {
                                        !this.state.toggle &&
                                        (<Icon name="angle-down" size={20}></Icon>)
                                    }
                                </TouchableOpacity>
                            }


                        </View>
                    </View>
                    <View style={styles.payTypeWrapper}>
                        <View style={styles.selectTextView}>
                            <Text>选择支付方式</Text>
                        </View>
                        <View style={styles.payTypeView}>
                            <View style={styles.payTypeLeftView}>
                                <Image
                                    source={require('../../images/alipay.png')}
                                    resizeMode='contain'
                                    style={styles.alipayImg}
                                />
                                <Text style={styles.payTypeName}>支付宝支付</Text>
                            </View>
                            <TouchableHighlight onPress={() => this.setState({payType: 1})}
                                                underlayColor='#fff'>
                                <View>
                                    {
                                        this.state.payType === 1 ?
                                            (<Icon name="check-circle" size={20} color={activeColor}></Icon>) :
                                            (<Icon2 name="checkbox-blank-circle-outline" size={20}></Icon2>)
                                    }
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.payTypeView}>
                            <View style={styles.payTypeLeftView}>
                                <Image
                                    source={require('../../images/weixinpay.jpg')}
                                    resizeMode='contain'
                                    style={styles.weixinImg}
                                />
                                <Text style={styles.payTypeName}>微信支付</Text>
                            </View>
                            <TouchableHighlight onPress={() => this.setState({payType: 2})}
                                                underlayColor='#fff'>
                                <View>
                                    {
                                        this.state.payType === 2 ?
                                            (<Icon name="check-circle" size={20} color={activeColor}></Icon>) :
                                            (<Icon2 name="checkbox-blank-circle-outline" size={20}></Icon2>)
                                    }
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomView}>
                    <ActiveButton
                        text='确认支付'
                        style={styles.accountsBtn}
                        textStyle={styles.accountsBtnText}
                        clickBtn={() => {
                            this.pay()
                        }}>
                    </ActiveButton>
                </View>
            </View>
        }
    }

    fetchData() {
        HttpUtils.post('/order/viewOrderInfo', {orderId: this.state.orderId}, data => {
            if (!data.data) {
                return;
            }
            let order = data.data;
            this.data.replace(order.payRemainingTime);
            this.start();
            let goodsList = order.orderItemList;
            goodsList.map(value => {
                let sku = JSON.parse(value.goodsSku);
                let skuStr = "";
                for (let key in sku) {
                    skuStr += `${key}:${sku[key]},`;
                }
                skuStr = skuStr.substr(0, skuStr.length - 1);
                value.sku = skuStr;
            });
            this.setState({order: order, isLoading: false});
        })
    }

    pay() {
        if (this.state.payType === 1) {//支付宝支付
            this.aliPay();
        } else if (this.state.payType === 2) {//微信支付
            this.weixinPay();
        }
    }

    async aliPay() {
        let loginState = await HttpUtils.getLoginState();
        let alipayParams = await this.getAliPayParams(loginState);
        // let isInstalled = await WeChat.isWXAppInstalled();
        Alipay.pay(alipayParams).then(data => {
            console.warn(data);
            if (data[0].resultStatus == '9000') {
                this.props.navigation.navigate('PaySuccess', {type: 'alipay'});
            }
        }, function (err) {
            console.log(err);
        });
    }

    getAliPayParams(loginState) {
        return new Promise((resolve, reject) => {
            try {
                let params = {
                    memberId: loginState.memberId,
                    token: loginState.token,
                    orderId: this.state.orderId
                };
                HttpUtils.get('/pay/getAliPayAppSingOrderInfo', params, data => {
                    resolve(data.data);
                })
            } catch (e) {
                alert('系统出错，请稍后再试');
                resolve({})
            }

        })
    }

    _handleAppStateChange() {
        this.fetchData();
    }

    async weixinPay() {
        let loginState = await HttpUtils.getLoginState();
        let wxParams = await this.getWxParams(loginState);
        let isInstalled = await WeChat.isWXAppInstalled();
        if (!isInstalled) {
            alert('请先安装微信');
            return
        }
        try {
            let payResult = await WeChat.pay(wxParams);
            if (payResult.errCode === 0) {
                this.props.navigation.navigate('PaySuccess', {type: 'weixin'});
            } else if (payResult.errCode === -1) {
                console.warn(payResult.errStr);
                alert('支付失败,如果您已经支付,请联系客服');
            }
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.warn(e.stack);
            } else {
                throw e;
            }
        }

    }

    getWxParams(loginState) {
        return new Promise((resolve, reject) => {
            try {
                let params = {
                    memberId: loginState.memberId,
                    token: loginState.token,
                    orderId: this.state.orderId
                };
                HttpUtils.get('/pay/wxPayApp', params, data => {
                    let dealParams = {
                        partnerId: data.data.partnerid, // merchant id
                        prepayId: data.data.prepayid, // prepay id
                        nonceStr: data.data.noncestr, // nonce
                        timeStamp: data.data.timestamp, // timestamp
                        package: data.data.package,
                        sign: data.data.sign // signed string
                    };
                    resolve(dealParams);
                })
            } catch (e) {
                alert('系统出错，请稍后再试');
                resolve({})
            }

        })
    }

    @action
    start() {
        if (this.state.interval) {
            clearInterval(this.state.interval)
        }
        this.state.interval = setInterval(() => {
            this.data.time--;
            if (this.data.time <= 0) {
                clearInterval(this.state.interval)
                Alert.alert(null, '订单支付超时，请重新下单',
                    [
                        {
                            text: '确定', onPress: () => {
                                this.props.navigation.navigate('OrderList', {type: -1})
                            }
                        }
                    ],
                    {cancelable: false});
            }
        }, 1000)
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,

    },
    scrollView: {},
    countdownView: {
        alignItems: 'center',
        padding: 20

    },
    countdownTimeView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20

    },
    timeText: {
        backgroundColor: '#000',
        color: whiteColor,
        padding: 5,
        marginRight: 5
    },
    goodsItemView: {
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        backgroundColor: whiteColor,
        paddingTop: 15,
        paddingBottom: 15,
        height: 120,
        borderBottomColor: borderColor,
        borderBottomWidth: 1
    },
    goodsImgView: {
        width: screenWidth * 0.3,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goodsImg: {
        width: 100,
        height: 100
    },
    sku: {
        color: '#ababab'
    },
    ems: {
        color: '#ababab'
    },
    goodsInfoView: {
        justifyContent: 'space-between',
        width: screenWidth * 0.7,
        paddingLeft: 10,
        paddingRight: 10,
        height: 100
    },
    goodsTitle: {},
    priceNumberView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceText: {
        color: activeColor
    },
    alipayImg: {
        width: 50,
        height: 50
    },
    weixinImg: {
        width: 50,
        height: 50
    },
    totalView: {
        backgroundColor: whiteColor,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 12
    },
    payTypeWrapper: {
        backgroundColor: whiteColor,
        marginTop: 10
    },
    selectTextView: {
        padding: 10,
        justifyContent: 'center'
    },
    payTypeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: borderColor
    },
    payTypeLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    payTypeName: {
        marginLeft: 5
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        height: 46,
    },
    accountsBtn: {
        backgroundColor: activeColor,
        alignItems: 'center',
        width: screenWidth,
        height: 46,
        justifyContent: 'center'
    },
    accountsBtnText: {
        fontSize: 16,
        color: whiteColor
    },
});
