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
    ScrollView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveButton from '../../components/common/ActiveButton';
import Toast, {DURATION} from 'react-native-easy-toast';
import HttpUtils from "../../utils/http";

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
            isLoading: true
        }
    }

    componentDidMount() {
        this.state.tradeType = this.props.navigation.state.params.tradeType;
        this.state.cartList = this.props.navigation.state.params.cartList;
        this.fetchData();

    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        } else {
            let orderGoodsView = [];
            let totalNum = 0;
            let totalPrice = 0;
            this.state.cartList.map(value => {
                let emsPrice = value.emsPrice;
                totalNum += value.number;
                totalPrice += value.number * value.putPrice + parseInt(emsPrice);
                orderGoodsView.push(
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
            return <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                        this.jumpToSelectAddress()
                    }}>
                        <View style={styles.topInfoView}>
                            <View style={styles.topLeftView}>
                                <Icon name='map-marker' size={20} color="#999"></Icon>
                                {
                                    this.state.tradeType === 1 && Object.keys(this.state.address).length > 0 && <View>
                                        <Text style={{marginLeft: 10}}>收货人：{this.state.address.contacts}</Text>
                                        <Text style={{
                                            marginTop: 10,
                                            marginLeft: 10
                                        }}>收货地址：{this.state.address.totalAddress}</Text>
                                    </View>
                                }
                                {
                                    this.state.tradeType === 1 && Object.keys(this.state.address).length === 0 && <View>
                                        <Text style={{marginLeft: 10}}>请选择地址</Text>
                                    </View>
                                }
                                {
                                    this.state.tradeType !== 1 && Object.keys(this.state.address).length > 0 && <View>
                                        <Text style={{marginLeft: 10}}>联系方式：{this.state.address.mobile}</Text>
                                        <Text style={{
                                            marginTop: 10,
                                            marginLeft: 10
                                        }}>收货地址：{this.state.address.totalAddress}</Text>
                                    </View>
                                }
                                {
                                    this.state.tradeType !== 1 && Object.keys(this.state.address).length === 0 && <View>
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
                                    <Icon name="angle-right" size={20} color="#999"/>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <Toast ref='toast' position='center'></Toast>
                <View style={styles.bottomView}>
                    <View style={styles.bottomLeftView}>
                        <Text style={{marginLeft: 5}}>合计：¥{totalPrice.toFixed(2)}</Text>
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
        }
    }

    async fetchData() {//获取数据
        if (this.state.tradeType !== 1) {//不是一般贸易
            let defaultCertification = await this.getDefaultCertification();
            let defaultCrossAddress = await this.getDefaultCrossAddress();
            let addressData = await getAddressData();
            let dealedList = await getTotalAddress(addressData, [defaultCrossAddress]);
            this.setState({address: dealedList[0], certification: defaultCertification, isLoading: false});
        } else {
            let defaultAddress = await this.getDefaultAddress();
            let addressData = await getAddressData();
            let dealedList = await getTotalAddress(addressData, [defaultAddress]);
            this.setState({address: dealedList[0], isLoading: false});
        }
    }

    confirmOrder() {//提交订单
        const {couponId, cartList, tradeType, address, certification} = this.state;

        let params = {
            couponId: couponId,
            orderItemList: cartList
        };
        if (Object.keys(address).length === 0) {
            this.refs.toast.show('请选择地址', 300);
            return;
        }
        switch (tradeType) {
            case 1:
                params.orderDetail = {
                    address: address.totalAddress,
                    contacts: address.contacts,
                    mobile: address.contacts,
                };
                break;
            case 2:
                if (Object.keys(certification).length === 0) {
                    this.refs.toast.show('请选择实名认证', 300);
                    return;
                }
                params.orderDetail = {
                    address: address.totalAddress,
                    mobile: address.contacts,
                    contacts: certification.contacts,
                    idCard: certification.idCard,
                    idCardBgImg: certification.idCardBgImg,
                    idCardImg: certification.idCardImg,
                };
                break;
            case 3:
                if (Object.keys(certification).length === 0) {
                    this.refs.toast.show('请选择实名认证', 300);
                    return;
                }
                params.orderDetail = {
                    address: address.totalAddress,
                    mobile: address.contacts,
                    contacts: certification.contacts,
                    idCard: certification.idCard,
                    idCardBgImg: certification.idCardBgImg,
                    idCardImg: certification.idCardImg,
                };
                if (!params.orderDetail.idCardImg || !params.orderDetail.idCardBgImg) {
                    this.refs.toast.show('海外直邮的实名认证信息必须包含身份证正反面', 300);
                    return;
                }
                break;
        }
        HttpUtils.post('/order/createOrder', params, data => {
            this.props.navigation.navigate('SelectPayType', {orderId: data.data});
        })
    }

    jumpToSelectAddress() {//跳转到选择地址页面
        if (this.state.tradeType !== 1) {//跨境贸易
            this.props.navigation.navigate('SelectCrossAddress', {
                addressCallback: (address) => {
                    this.setState({address: address});
                }
            });
        } else {//一般贸易
            this.props.navigation.navigate('SelectAddress', {
                addressCallback: (address) => {
                    this.setState({address: address});
                }
            });
        }
    }

    jumpToSelectCoupon() {//跳转到选择优惠券页面

    }

    jumpToSelectCertification() {//跳转到选择实名认证页面
        this.props.navigation.navigate('SelectCertification', {
            addressCallback: (certification) => {
                this.setState({certification: certification});
            }
        });
    }

    getDefaultCertification() {//获取默认的实名认证信息
        return new Promise((resolve, reject) => {
            HttpUtils.get('/idCard/selectDefaultsIdCard', {}, data => {
                resolve(data.data)
            })
        })
    }

    getDefaultAddress() {//获取默认的地址信息
        return new Promise((resolve, reject) => {
            HttpUtils.get('/shippingAddress/defaultShippingAddressByMemberId', {}, data => {
                console.warn(data.data)
                resolve(data.data)
            })
        })
    }

    getDefaultCrossAddress() {//获取默认的跨境地址信息
        return new Promise((resolve, reject) => {
            HttpUtils.get('/idCardAddress/selectDefaultsIdCardAddress', {}, data => {
                console.warn(data.data)
                resolve(data.data)
            })
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
        flexDirection: 'row'
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