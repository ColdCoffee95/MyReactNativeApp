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
    Image,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveButton from '../../components/common/ActiveButton';
import Text from '../../components/common/MyText';

type Props = {};

export default class ConfirmOrder extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            tradeType: 1,
            certification: {},
            address: {},
            cartList: [],
            couponId: '',
            coupon: {},
            isLoading: true,
            realCut: 0
        }
    }

    componentDidMount() {
        this.state.tradeType = this.props.navigation.state.params.tradeType;
        this.state.cartList = this.props.navigation.state.params.cartList;
        this.props.navigation.setParams({confirmBack: this.confirmBack.bind(this)});
        this.fetchData();
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerLeft: <TouchableOpacity onPress={() => navigation.state.params.confirmBack()}>
            <View style={{paddingLeft: 15}}>
                <Icon name='angle-left' size={40} color='black'></Icon>
            </View>
        </TouchableOpacity>
    });

    render() {
        if (this.state.isLoading) {
            return <View/>
        } else {
            let orderGoodsView = [];
            let totalNum = 0;
            let totalPrice = 0;

            this.state.cartList.map(value => {
                let emsPrice = value.emsPrice || 0;
                totalNum += value.number;
                totalPrice += value.number * value.putPrice + parseInt(emsPrice);
                let sku = JSON.parse(value.goodsSku);
                let skuStr = "";
                for (let key in sku) {
                    skuStr += `${key}:${sku[key]},`;
                }
                skuStr = skuStr.substr(0, skuStr.length - 1);
                value.sku = skuStr;
                orderGoodsView.push(
                    <View style={styles.goodsItemView}>
                        <View style={styles.goodsImgView}>
                            <Image
                                source={{uri: value.goodsImg + '?imageMogr2/thumbnail/200x200'}}
                                resizeMode='contain'
                                style={styles.goodsImg}/>
                        </View>
                        <View style={styles.goodsInfoView}>
                            <Text style={styles.goodsTitle}
                                  numberOfLines={2}>{value.goodsTitle}</Text>
                            <View>
                                <Text style={styles.sku}>{value.sku}</Text>
                                <Text style={styles.ems}>运费:¥{value.emsPrice || 0.00}</Text>
                            </View>
                            <View style={styles.priceNumberView}>
                                <Text style={styles.priceText}>¥{value.putPrice}</Text>
                                <Text>×{value.number}</Text>
                            </View>
                        </View>
                    </View>
                )
            });
            return <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                            this.jumpToSelectAddress()
                        }}>
                            <View style={styles.topInfoView}>
                                <View style={styles.topLeftView}>
                                    <Icon name='map-marker' size={20} color="#999"></Icon>
                                    {
                                        this.state.tradeType === 1 && Object.keys(this.state.address).length > 0 &&
                                        <View>
                                            <Text style={{marginLeft: 10}}>收货人：{this.state.address.contacts}</Text>
                                            <Text style={{
                                                marginTop: 10,
                                                marginLeft: 10
                                            }}>收货地址：{this.state.address.totalAddress}</Text>
                                        </View>
                                    }
                                    {
                                        this.state.tradeType === 1 && Object.keys(this.state.address).length === 0 &&
                                        <View>
                                            <Text style={{marginLeft: 10}}>请选择地址</Text>
                                        </View>
                                    }
                                    {
                                        this.state.tradeType !== 1 && Object.keys(this.state.address).length > 0 &&
                                        <View>
                                            <Text style={{marginLeft: 10}}>联系方式：{this.state.address.mobile}</Text>
                                            <Text style={{
                                                marginTop: 10,
                                                marginLeft: 10
                                            }}>收货地址：{this.state.address.totalAddress}</Text>
                                        </View>
                                    }
                                    {
                                        this.state.tradeType !== 1 && Object.keys(this.state.address).length === 0 &&
                                        <View>
                                            <Text style={{marginLeft: 10}}>请选择地址</Text>
                                        </View>
                                    }
                                </View>

                                <View>
                                    <Icon name="angle-right" size={20} color="#999"/>
                                </View>
                            </View>
                        </TouchableHighlight>
                        {
                            this.state.tradeType !== 1 && Object.keys(this.state.certification).length > 0 &&
                            <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                                this.jumpToSelectCertification()
                            }}>
                                <View style={styles.certificationView}>
                                    <View style={styles.certificationLeftView}>
                                        <Icon name='map-marker' size={20} color={whiteColor}></Icon>
                                        <View>
                                            <Text
                                                style={{marginLeft: 10}}>收货人：{this.state.certification.contacts} {this.state.certification.idCard}</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <Icon name='angle-right' size={20} color="#999"></Icon>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        }
                        {
                            this.state.tradeType !== 1 && Object.keys(this.state.certification).length === 0 &&
                            <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                                this.jumpToSelectCertification()
                            }}>
                                <View style={styles.certificationView}>
                                    <View style={styles.certificationLeftView}>
                                        <Icon name='map-marker' size={20} color={whiteColor}></Icon>
                                        <View>
                                            <Text
                                                style={{marginLeft: 10}}>请选择实名认证</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <Icon name='angle-right' size={20} color="#999"></Icon>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        }
                        <View style={styles.orderGoodsView}>
                            {orderGoodsView}
                            <View style={styles.cellView}>
                                <View style={styles.leftCell}>

                                </View>
                                <View style={styles.rightCell}>
                                    <Text>共{totalNum}件商品</Text>
                                    <Text>合计：¥{totalPrice.toFixed(2)}</Text>
                                </View>
                            </View>
                            <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                                this.jumpToSelectCoupon()
                            }}>
                                <View style={styles.cellView}>
                                    <Text style={styles.leftCell}>优惠券</Text>
                                    <View style={styles.rightCell}>
                                        {
                                            this.state.realCut > 0 &&
                                            <Text
                                                style={{
                                                    color: activeColor,
                                                    marginRight: 10
                                                }}>-¥{this.state.realCut}</Text>
                                        }

                                        <Icon name="angle-right" size={20} color="#999"/>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomView}>
                        <View style={styles.bottomLeftView}>
                            <Text
                                style={{marginLeft: 5}}>合计：¥{totalPrice - this.state.realCut > 0 ? (totalPrice - this.state.realCut).toFixed(2) : 0.01}</Text>
                        </View>
                        <View style={styles.bottomRightView}>
                            <ActiveButton
                                text={`提交订单`}
                                style={styles.accountsBtn}
                                textStyle={styles.accountsBtnText}
                                clickBtn={() => {
                                    this.confirmOrder()
                                }}>
                            </ActiveButton>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        }
    }

    confirmBack() {//是否确认离开
        const {navigate, goBack, state} = this.props.navigation;
        state.params.goBack();
        goBack();
    }

    async fetchData() {//获取数据
        if (this.state.tradeType !== 1) {//不是一般贸易
            let defaultCertification = await this.getDefaultCertification();
            let defaultCrossAddress = await this.getDefaultCrossAddress();
            if (defaultCrossAddress) {
                let addressData = await getAddressData();
                let dealedList = await getTotalAddress(addressData, [defaultCrossAddress]);
                this.setState({address: dealedList[0], certification: defaultCertification, isLoading: false});
            } else {
                this.setState({address: {}, certification: defaultCertification, isLoading: false});
            }

        } else {
            let defaultAddress = await this.getDefaultAddress();
            if (defaultAddress) {
                let addressData = await getAddressData();
                let dealedList = await getTotalAddress(addressData, [defaultAddress]);
                this.setState({address: dealedList[0], isLoading: false});
            } else {
                this.setState({address: {}, isLoading: false});
            }

        }
    }

    confirmOrder() {//提交订单
        const {couponId, cartList, tradeType, address, certification} = this.state;

        let params = {
            couponId: couponId,
            orderItemList: cartList
        };
        if (Object.keys(address).length === 0) {
            ToastUtil.show('请选择地址');
            return;
        }
        switch (tradeType) {
            case 1:
                params.orderDetail = {
                    address: address.totalAddress,
                    contacts: address.contacts,
                    mobile: address.mobile,
                };
                break;
            case 2:
                if (Object.keys(certification).length === 0) {
                    ToastUtil.show('请选择实名认证');
                    return;
                }
                params.orderDetail = {
                    address: address.totalAddress,
                    mobile: address.mobile,
                    contacts: certification.contacts,
                    idCard: certification.idCard,
                    idCardBgImg: certification.idCardBgImg,
                    idCardImg: certification.idCardImg,
                };
                break;
            case 3:
                if (Object.keys(certification).length === 0) {
                    ToastUtil.show('请选择实名认证');
                    return;
                }
                params.orderDetail = {
                    address: address.totalAddress,
                    mobile: address.mobile,
                    contacts: certification.contacts,
                    idCard: certification.idCard,
                    idCardBgImg: certification.idCardBgImg,
                    idCardImg: certification.idCardImg,
                };
                if (!params.orderDetail.idCardImg || !params.orderDetail.idCardBgImg) {
                    ToastUtil.show('海外直邮的实名认证信息必须包含身份证正反面');
                    return;
                }
                break;
        }
        HttpUtils.post('/order/createOrder', params, data => {
            this.props.navigation.replace('SelectPayType', {
                orderId: data.data,
                goBack: this.props.navigation.state.params.goBack
            });
        })
    }

    jumpToSelectAddress() {//跳转到选择地址页面
        if (this.state.tradeType !== 1) {//跨境贸易
            this.props.navigation.navigate('SelectCrossAddress', {
                callback: (address) => {
                    this.setState({address: address});
                }
            });
        } else {//一般贸易
            this.props.navigation.navigate('SelectAddress', {
                callback: (address) => {
                    this.setState({address: address});
                }
            });
        }
    }

    jumpToSelectCoupon() {//跳转到选择优惠券页面
        const {cartList} = this.state;
        this.props.navigation.navigate('SelectCoupon', {
            cartList: cartList,
            callback: (coupon) => {
                let params = {
                    couponId: coupon.id,
                    orderItemList: cartList
                };
                HttpUtils.post('/order/doComputeCouponPrice', params, data => {
                    console.warn(data.data)
                    if (data.data) {
                        this.setState({realCut: data.data})
                    } else {
                        this.setState({realCut: 0})
                    }
                });
                this.setState({coupon: coupon, couponId: coupon.id});
            }
        });
    }

    jumpToSelectCertification() {//跳转到选择实名认证页面
        this.props.navigation.navigate('SelectCertification', {
            callback: (certification) => {
                this.setState({certification: certification});
            }
        });
    }

    getDefaultCertification() {//获取默认的实名认证信息
        return new Promise((resolve, reject) => {
            try {
                HttpUtils.get('/idCard/selectDefaultsIdCard', {}, data => {
                    let defaultInfo = data.data || {};
                    resolve(defaultInfo)
                })
            } catch (e) {
                resolve({})
            }

        })
    }

    getDefaultAddress() {//获取默认的地址信息
        return new Promise((resolve, reject) => {
            try {
                HttpUtils.get('/shippingAddress/defaultShippingAddressByMemberId', {}, data => {
                    resolve(data.data)
                })
            } catch (e) {
                resolve({})
            }

        })
    }

    getDefaultCrossAddress() {//获取默认的跨境地址信息
        return new Promise((resolve, reject) => {
            try {
                HttpUtils.get('/idCardAddress/selectDefaultsIdCardAddress', {}, data => {
                    resolve(data.data)
                })
            } catch (e) {
                resolve({})
            }

        })
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
    },
    scrollView: {
        paddingBottom: 60
    },
    topInfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: whiteColor,
        alignItems: 'center',
        padding: 12
    },
    topLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    certificationView: {
        marginTop: 10,
        backgroundColor: whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12
    },
    certificationLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderGoodsView: {},
    cellView: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: whiteColor,
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: borderColor,
    },
    leftCell: {},
    rightCell: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    goodsItemView: {
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        backgroundColor: whiteColor,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        height: 120
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
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        height: 46,
        backgroundColor: whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    bottomRightView: {},
    accountsBtn: {
        backgroundColor: activeColor,
        alignItems: 'center',
        width: screenWidth * 0.3,
        height: 46,
        justifyContent: 'center'
    },
    accountsBtnText: {
        fontSize: 16,
        color: whiteColor
    },
});
