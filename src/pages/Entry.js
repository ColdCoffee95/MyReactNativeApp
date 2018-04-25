import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    BackHandler
} from 'react-native';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import Home from './Home';
import Category from './Category';
import Cart from './cart/Cart';
import Mine from './Mine';

import GoodsList from './goods/GoodsList';
import GoodsDetail from './goods/GoodsDetail';

import Register from './user/Register';
import ForgetPwd from './user/ForgetPwd';
import UpdatePwd from './user/UpdatePwd';
import Hotline from './user/Hotline';
import Agreement from './user/Agreement';
import Settings from './user/Settings';
import Collect from './user/Collect';
import FootPrint from './user/FootPrint';
import Feedback from './user/Feedback';
import Aboutus from './user/Aboutus';
import SecurityCheck from './user/SecurityCheck';
import ShopCertification from './user/ShopCertification';
import ShopCertificationDetail from './user/ShopCertificationDetail';

import BrandSelection from './activity/BrandSelection';
import DiaperCurrency from './activity/DiaperCurrency';
import LimitedPurchase from './activity/LimitedPurchase';
import MilkCurrency from './activity/MilkCurrency';
import NewSale from './activity/NewSale';

import ManageAddress from './address/ManageAddress';
import AddAddress from './address/AddAddress';
import EditAddress from './address/EditAddress';
import SelectAddress from './address/SelectAddress';
import ManageCrossAddress from './address/ManageCrossAddress';
import AddCrossAddress from './address/AddCrossAddress';
import EditCrossAddress from './address/EditCrossAddress';
import SelectCrossAddress from './address/SelectCrossAddress';

import ManageCertification from './certification/ManageCertification';
import AddCertification from './certification/AddCertification';
import SelectCertification from './certification/SelectCertification';

import ConfirmOrder from './order/ConfirmOrder'
import ViewLogistics from './order/ViewLogistics'
import DeliveryDetail from './order/DeliveryDetail'
import SelectPayType from './order/SelectPayType'
import PaySuccess from './order/PaySuccess'
import Order from './order/Order'
import OrderDetail from './order/OrderDetail'
import AfterSaleOrders from './order/AfterSaleOrders'
import AfterSaleDetail from './order/AfterSaleDetail'
import ApplyAfterSale from './order/ApplyAfterSale'
import Comment from './order/Comment'

import CouponList from './coupon/CouponList'
import SelectCoupon from './coupon/SelectCoupon'
const onBackPress = () => {
    if (Actions.state.index !== 0) {
        return false
    }
    Actions.pop()
    return true
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20
    },
    tabBar: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerStyles: {
        backgroundColor: whiteColor,
        justifyContent: 'center'
    },
    headerTitleStyle: {
        alignSelf: 'center',
    },
    iconText: {
        fontSize: 12
    }
});
class TabBar extends Component {
    constructor(props) {
        super(props);
        this.data = {
            home: {
                title: "首页",
                icon: 'home',
            },
            category: {
                title: "分类",
                icon: 'microsoft',
            },
            cart: {
                title: "进货单",
                icon: 'cart',
            },
            mine: {
                title: "我的",
                icon: 'account-outline',
            }
        }
    }

    render() {
        console.warn(this.props)
        let param = this.data[this.props.navigation.state.key];
        let tabStyle = this.props.focused ? {color: activeColor} : {color: '#ccc'};
        return <View style={styles.tabBar}>
            <Icon name={param.icon} size={24} color={tabStyle.color}>

            </Icon>
            <Text style={[tabStyle, styles.iconText]}>{param.title}</Text>
        </View>
    }
}
export default class Entry extends Component {
    render() {
        return <Router backAndroidHandler={onBackPress}>
            <Scene key="root">
                <Scene key="login" component={LoginScreen} hideNavBar>

                </Scene>
                <Tabs
                    key="tabs"
                    tabs={true}
                    init={true}
                    lazy={true}
                    tabBarPosition="bottom"
                    hideNavBar
                    swipeEnabled={false}
                    animationEnabled={false}
                    activeTintColor={activeColor}
                    inactiveTintColor='#444'
                    showLabel={false}
                    icon={TabBar}>

                    <Scene key="home" component={Home} title="首页">
                    </Scene>
                    <Scene key="category" component={Category}>
                    </Scene>
                    <Scene key="cart" component={Cart}>
                    </Scene>
                    <Scene key="mine" component={Mine} hideNavBar>
                    </Scene>
                </Tabs>

                <Scene
                    key="goodsList"
                    component={GoodsList}
                    title="商品列表"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="goodsDetail"
                    component={GoodsDetail}
                    title="商品详情"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>

                <Scene
                    key="register"
                    component={Register}
                    title="注册"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="forgetPwd"
                    component={ForgetPwd}
                    title="忘记密码"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="updatePwd"
                    component={UpdatePwd}
                    title="修改密码"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="hotline"
                    component={Hotline}
                    title="客服热线"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="agreement"
                    component={Agreement}
                    title="店力集盒平台服务协议"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="settings"
                    component={Settings}
                    title="设置"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="collect"
                    component={Collect}
                    title="我的收藏"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="footPrint"
                    component={FootPrint}
                    title="我的足迹"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="feedback"
                    component={Feedback}
                    title="意见反馈"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="aboutus"
                    component={Aboutus}
                    title="关于我们"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="securityCheck"
                    component={SecurityCheck}
                    title="安全校验"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="shopCertification"
                    component={ShopCertification}
                    title="店铺认证"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="shopCertificationDetail"
                    component={ShopCertificationDetail}
                    title="店铺信息"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>

                <Scene
                    key="brandSelection"
                    component={BrandSelection}
                    title="品牌精选"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="diaperCurrency"
                    component={DiaperCurrency}
                    title="尿不湿通货"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="limitedPurchase"
                    component={LimitedPurchase}
                    title="限量秒杀"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="milkCurrency"
                    component={MilkCurrency}
                    title="奶粉通货"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="newSale"
                    component={NewSale}
                    title="新品特卖"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>

                <Scene
                    key="manageAddress"
                    component={ManageAddress}
                    title="大贸地址管理"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="addAddress"
                    component={AddAddress}
                    title="添加大贸地址"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="editAddress"
                    component={EditAddress}
                    title="修改大贸地址"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="selectAddress"
                    component={SelectAddress}
                    title="选择大贸地址"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="manageCrossAddress"
                    component={ManageCrossAddress}
                    title="跨境地址管理"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="addCrossAddress"
                    component={AddCrossAddress}
                    title="添加跨境地址"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="editCrossAddress"
                    component={EditCrossAddress}
                    title="修改跨境地址"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="selectCrossAddress"
                    component={SelectCrossAddress}
                    title="选择跨境地址"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>

                <Scene
                    key="manageCertification"
                    component={ManageCertification}
                    title="实名认证管理"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="addCertification"
                    component={AddCertification}
                    title="添加实名认证"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="selectCertification"
                    component={SelectCertification}
                    title="选择实名认证"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>

                <Scene
                    key="confirmOrder"
                    component={ConfirmOrder}
                    title="确认订单"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="viewLogistics"
                    component={ViewLogistics}
                    title="查看物流"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="deliveryDetail"
                    component={DeliveryDetail}
                    title="物流详情"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>

                <Scene
                    key="selectPayType"
                    component={SelectPayType}
                    title="选择支付方式"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="paySuccess"
                    component={PaySuccess}
                    title="支付成功"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="order"
                    component={Order}
                    title="订单列表"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="orderDetail"
                    component={OrderDetail}
                    title="订单详情"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="afterSaleOrders"
                    component={AfterSaleOrders}
                    title="我的售后"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="afterSaleDetail"
                    component={AfterSaleDetail}
                    title="售后详情"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>

                <Scene
                    key="applyAfterSale"
                    component={ApplyAfterSale}
                    title="申请售后"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="comment"
                    component={Comment}
                    title="评价"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>

                <Scene
                    key="couponList"
                    component={CouponList}
                    title="优惠券"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
                <Scene
                    key="selectCoupon"
                    component={SelectCoupon}
                    title="选择优惠券"
                    titleStyle={styles.headerTitleStyle}
                    renderRightButton={() => (<View/>)}>
                </Scene>
            </Scene>
        </Router>
    }
}