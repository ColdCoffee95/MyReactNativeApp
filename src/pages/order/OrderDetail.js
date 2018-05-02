/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    Alert,
    ScrollView,
    SafeAreaView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveButton from '../../components/common/ActiveButton';

type Props = {};
export default class OrderDetail extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            orderId: '',
            orderInfo: {},
            orderTypes: [
                {
                    id: 1,
                    name: '订单待付款'
                },
                {
                    id: 2,
                    name: '订单已发货'
                },
                {
                    id: 3,
                    name: '买家已付款'
                },
                {
                    id: 4,
                    name: '交易成功，快去评价吧'
                },
                {
                    id: 5,
                    name: '交易成功'
                },
                {
                    id: 6,
                    name: '订单已取消'
                },
                {
                    id: 7,
                    name: '订单退款中'
                },
            ]
        }
    }

    componentDidMount() {
        this.state.orderId = this.props.navigation.state.params.id;
        this.fetchData()
    }

    render() {
        if (this.state.isLoading) {
            return <View/>
        } else {
            const {orderInfo, orderTypes} = this.state;
            let goodsList = [];
            orderInfo.orderItemList.map(value => {
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
                            <View>
                                <Text style={styles.sku}>{value.sku}</Text>
                            </View>

                            <View style={styles.priceNumberView}>
                                <Text style={styles.priceText}>¥{value.putPrice}</Text>
                                <Text>×{value.number}</Text>
                            </View>
                        </View>
                    </View>
                )
            });
            let orderTypeName = orderStatusList.find(value => orderInfo.orderStatus === value.id).name;
            return <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <ScrollView>
                        <View>

                        </View>
                        <View style={styles.topInfoView}>
                            <View style={styles.topLeftView}>
                                <Icon name='map-marker' size={20} color="#999"></Icon>
                                <View style={styles.topRightView}>
                                    <View style={styles.topContacts}>
                                        <Text style={{marginLeft: 10}}>收货人：{orderInfo.orderDetail.contacts}</Text>
                                        <Text>{orderInfo.orderDetail.mobile}</Text>
                                    </View>
                                    <Text style={{
                                        marginTop: 10,
                                        marginLeft: 10
                                    }}>收货地址：{orderInfo.orderDetail.address}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.orderWrapper}>
                            {/*yMMddHHmmss*/}
                            <View style={styles.orderTopView}>
                                <Text>{dateFormat(orderInfo.createTime)}</Text>
                                <Text>{orderTypeName}</Text>
                            </View>
                            <View style={styles.goodsWrapper}>
                                {goodsList}
                            </View>
                            <View style={styles.paymentPrice}>
                                <Text style={{marginRight: 10}}>订单总额：¥{orderInfo.totalPrice}</Text>
                                <Text>运费：¥{orderInfo.transportationFee}</Text>
                            </View>
                            <View style={styles.paymentPrice}>
                                <Text style={{color: activeColor}}>支付金额：¥{orderInfo.paymentPrice}</Text>
                            </View>
                        </View>
                        <View style={styles.orderInfoWrapper}>
                            <Text>订单状态：{orderTypeName}</Text>
                            <Text style={styles.orderInfoText}>订单编号：{orderInfo.orderNumber}</Text>
                            <Text style={styles.orderInfoText}>下单时间：{dateFormat(orderInfo.createTime)}</Text>
                            {
                                !!orderInfo.updateTime &&
                                <Text style={styles.orderInfoText}>发货时间：{dateFormat(orderInfo.updateTime)}</Text>
                            }

                        </View>
                    </ScrollView>

                    {
                        orderInfo.orderStatus == 1 &&
                        <View style={styles.btnView}>
                            <ActiveButton clickBtn={() => this.jumpToPay(orderInfo.orderId)} text='去支付'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                            <ActiveButton clickBtn={() => this.cancelOrder(orderInfo.orderId)} text='取消订单'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                        </View>
                    }
                    {
                        orderInfo.orderStatus == 2 &&
                        <View style={styles.btnView}>
                            <ActiveButton clickBtn={() => this.getDeliveryInfo(orderInfo.orderId)} text='查看物流'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                            <ActiveButton clickBtn={() => this.confirmReceipt(orderInfo.orderId)} text='确认收货'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                            <ActiveButton clickBtn={() => this.applyAfterSale(orderInfo)} text='申请退款'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                        </View>
                    }
                    {
                        orderInfo.orderStatus == 3 &&
                        <View style={styles.btnView}>
                            <ActiveButton clickBtn={() => this.expediteDelivery(orderInfo.orderId)} text='催发货'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                            <ActiveButton clickBtn={() => this.applyAfterSale(orderInfo)} text='申请退款'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                        </View>
                    }
                    {
                        orderInfo.orderStatus == 4 &&
                        <View style={styles.btnView}>
                            <ActiveButton clickBtn={() => this.getDeliveryInfo(orderInfo.orderId)} text='查看物流'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                            <ActiveButton clickBtn={() => this.comment(orderInfo.orderId)} text='评价'
                                          style={styles.activeButton} textStyle={{color: activeColor}}>

                            </ActiveButton>
                            <ActiveButton clickBtn={() => this.applyAfterSale(orderInfo)} text='申请售后'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                        </View>
                    }
                    {
                        orderInfo.orderStatus == 5 &&
                        <View style={styles.btnView}>
                            <ActiveButton clickBtn={() => this.getDeliveryInfo(orderInfo.orderId)} text='查看物流'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                            <ActiveButton clickBtn={() => this.applyAfterSale(orderInfo)} text='申请售后'
                                          textStyle={{color: 'black'}}
                                          style={styles.commonButton}>

                            </ActiveButton>
                        </View>
                    }
                </View>
            </SafeAreaView>
        }

    }


    fetchData() {
        let params = {
            orderId: this.state.orderId
        };
        HttpUtils.post('/order/viewOrderInfo', params, data => {
            console.warn(data.data)
            this.setState({
                orderInfo: data.data,
                isLoading: false,
            });
        })
    }

    jumpToPay(orderId) {//去支付
        this.props.navigation.navigate('SelectPayType', {orderId: orderId});
    }

    applyAfterSale(orderInfo) {//申请退货退款
        this.props.navigation.navigate('ApplyAfterSale', {
            orderInfo: orderInfo,
            goBack: () => this.fetchData()
        });
    }

    cancelOrder(orderId) {//取消订单
        Alert.alert(null, '确认取消该订单？',
            [
                {
                    text: "确定", onPress: () => {
                        HttpUtils.post('/order/manuallyCancelOrder', {orderId: orderId}, data => {
                            ToastUtil.show('操作成功');
                            this.fetchData();
                        })
                    }
                },
                {
                    text: "取消", onPress: () => {
                    }
                },
            ],
            {cancelable: false}
        )
    }

    getDeliveryInfo(orderId) {//查看物流
        this.props.navigation.navigate('ViewLogistics', {orderId: orderId});
    }

    confirmReceipt(orderId) {//确认收货
        Alert.alert(null, '确认收到货了吗？',
            [
                {
                    text: "确认", onPress: () => {
                        HttpUtils.post('/order/confirmReceive', {orderId: orderId}, data => {
                            ToastUtil.show('操作成功');
                            this.fetchData();
                        })
                    }
                },
                {
                    text: "取消", onPress: () => {
                    }
                },
            ],
            {cancelable: false}
        )
    }

    expediteDelivery() {
        Alert.alert(null, '操作成功,已提醒商家尽快发货')
    }

    comment(orderId) {
        this.props.navigation.navigate('Comment', {
            orderId: orderId,
            goBack: () => this.fetchData()
        });
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topInfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: whiteColor,
        alignItems: 'center',
        padding: 12
    },
    orderWrapper: {
        marginTop: 10,
        backgroundColor: whiteColor
    },
    orderInfoWrapper: {
        marginTop: 10,
        backgroundColor: whiteColor,
        padding: 10
    },
    orderInfoText: {
        marginTop: 10
    },
    topLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth
    },
    topRightView: {
        width: screenWidth * 0.9
    },
    topContacts: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    paymentPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: screenWidth,
        padding: 12,
        backgroundColor: whiteColor,
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

    btnView: {
        position: 'absolute',
        bottom: 0,
        height: 46,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: screenWidth,
        backgroundColor: whiteColor,
    },
    commonButton: {
        backgroundColor: whiteColor,
        marginRight: 10,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: borderColor
    },
    activeButton: {
        backgroundColor: whiteColor,
        marginRight: 10,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: activeColor
    }
});
