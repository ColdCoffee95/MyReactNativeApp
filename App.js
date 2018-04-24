import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    BackHandler
} from 'react-native';
import {StackNavigator, NavigationActions} from "react-navigation";
import './src/utils/storage';
import './src/utils/globalVariables';
import './src/utils/globalFunctions';
import MainScreen from './src/pages/screens/MainScreen';
import LoginScreen from './src/pages/screens/LoginScreen';
import Register from './src/pages/user/Register';
import ForgetPwd from './src/pages/user/ForgetPwd';
import UpdatePwd from './src/pages/user/UpdatePwd';

import GoodsList from './src/pages/goods/GoodsList';
import GoodsDetail from './src/pages/goods/GoodsDetail';

import BrandSelection from './src/pages/activity/BrandSelection';
import DiaperCurrency from './src/pages/activity/DiaperCurrency';
import LimitedPurchase from './src/pages/activity/LimitedPurchase';
import MilkCurrency from './src/pages/activity/MilkCurrency';
import NewSale from './src/pages/activity/NewSale';

import Hotline from './src/pages/user/Hotline';
import Agreement from './src/pages/user/Agreement';
import Settings from './src/pages/user/Settings';
import Collect from './src/pages/user/Collect';
import FootPrint from './src/pages/user/FootPrint';
import Feedback from './src/pages/user/Feedback';
import Aboutus from './src/pages/user/Aboutus';
import SecurityCheck from './src/pages/user/SecurityCheck';
import ShopCertification from './src/pages/user/ShopCertification';
import ShopCertificationDetail from './src/pages/user/ShopCertificationDetail';

import ManageAddress from './src/pages/address/ManageAddress';
import AddAddress from './src/pages/address/AddAddress';
import EditAddress from './src/pages/address/EditAddress';
import SelectAddress from './src/pages/address/SelectAddress';
import ManageCrossAddress from './src/pages/address/ManageCrossAddress';
import AddCrossAddress from './src/pages/address/AddCrossAddress';
import EditCrossAddress from './src/pages/address/EditCrossAddress';
import SelectCrossAddress from './src/pages/address/SelectCrossAddress';


import ManageCertification from './src/pages/certification/ManageCertification';
import AddCertification from './src/pages/certification/AddCertification';
import SelectCertification from './src/pages/certification/SelectCertification';

import ConfirmOrder from './src/pages/order/ConfirmOrder'
import ViewLogistics from './src/pages/order/ViewLogistics'
import DeliveryDetail from './src/pages/order/DeliveryDetail'
import SelectPayType from './src/pages/order/SelectPayType'
import PaySuccess from './src/pages/order/PaySuccess'
import Order from './src/pages/order/Order'
import OrderDetail from './src/pages/order/OrderDetail'
import AfterSaleOrders from './src/pages/order/AfterSaleOrders'
import AfterSaleDetail from './src/pages/order/AfterSaleDetail'
import ApplyAfterSale from './src/pages/order/ApplyAfterSale'
import Comment from './src/pages/order/Comment'

import CouponList from './src/pages/coupon/CouponList'
import SelectCoupon from './src/pages/coupon/SelectCoupon'
const styles = StyleSheet.create({
    headerStyles: {
        backgroundColor: whiteColor
    },
    headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1
    }
});
export default SimpleApp = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    Main: {screen: MainScreen},
    Register: {
        screen: Register,
        navigationOptions: {
            title: '注册',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerTitleStyle: styles.headerTitleStyle,
            headerBackTitle: null,
            headerRight: <View/>
        }
    },
    ForgetPwd: {
        screen: ForgetPwd,
        navigationOptions: {
            title: '忘记密码',
            headerStyle: styles.headerStyles,
            headerTitleStyle: styles.headerTitleStyle,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>
        }
    },
    UpdatePwd: {
        screen: UpdatePwd,
        navigationOptions: {
            title: '修改密码',
            headerStyle: styles.headerStyles,
            headerTitleStyle: styles.headerTitleStyle,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>
        }
    },
    Agreement: {
        screen: Agreement,
        navigationOptions: {
            title: '店力集盒平台服务协议',
            headerStyle: styles.headerStyles,
            headerTitleStyle: styles.headerTitleStyle,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>
        }
    },
    Collect: {
        screen: Collect,
        navigationOptions: {
            title: '我的收藏',
            headerStyle: styles.headerStyles,
            headerTitleStyle: styles.headerTitleStyle,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>
        }
    },
    FootPrint: {
        screen: FootPrint,
        navigationOptions: {
            title: '我的足迹',
            headerStyle: styles.headerStyles,
            headerTitleStyle: styles.headerTitleStyle,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>
        }
    },
    Hotline: {
        screen: Hotline,
        navigationOptions: {
            title: '客服热线',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: '设置',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: {
            title: '意见反馈',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    Aboutus: {
        screen: Aboutus,
        navigationOptions: {
            title: '关于店力集盒',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    ShopCertification: {
        screen: ShopCertification,
        navigationOptions: {
            title: '店铺认证',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    ShopCertificationDetail: {
        screen: ShopCertificationDetail,
        navigationOptions: {
            title: '店铺信息',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    SecurityCheck: {
        screen: SecurityCheck,
        navigationOptions: {
            title: '安全校验',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    ManageAddress: {
        screen: ManageAddress,
        navigationOptions: {
            title: '大贸地址管理',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    ManageCrossAddress: {
        screen: ManageCrossAddress,
        navigationOptions: {
            title: '跨境地址管理',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    AddAddress: {
        screen: AddAddress,
        navigationOptions: {
            title: '添加大贸地址',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },

    },
    EditAddress: {
        screen: EditAddress,
        navigationOptions: {
            title: '修改大贸地址',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },

    },
    SelectAddress: {
        screen: SelectAddress,
        navigationOptions: {
            title: '选择地址',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerTitleStyle: styles.headerTitleStyle,
        },

    },
    SelectCrossAddress: {
        screen: SelectCrossAddress,
        navigationOptions: {
            title: '选择跨境地址',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    AddCrossAddress: {
        screen: AddCrossAddress,
        navigationOptions: {
            title: '添加跨境地址',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },

    },
    EditCrossAddress: {
        screen: EditCrossAddress,
        navigationOptions: {
            title: '修改跨境地址',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },

    },
    ManageCertification: {
        screen: ManageCertification,
        navigationOptions: {
            title: '实名认证管理',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        }
    },
    AddCertification: {
        screen: AddCertification,
        navigationOptions: {
            title: '添加实名认证',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    SelectCertification: {
        screen: SelectCertification,
        navigationOptions: {
            title: '选择实名认证',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    GoodsList: {
        screen: GoodsList,
        navigationOptions: {
            title: '商品列表',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    GoodsDetail: {
        screen: GoodsDetail,
        navigationOptions: {
            title: '商品详情',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },

    BrandSelection: {
        screen: BrandSelection,
        navigationOptions: {
            title: '品牌精选',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    DiaperCurrency: {
        screen: DiaperCurrency,
        navigationOptions: {
            title: '尿不湿通货',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    LimitedPurchase: {
        screen: LimitedPurchase,
        navigationOptions: {
            title: '限量秒杀',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    MilkCurrency: {
        screen: MilkCurrency,
        navigationOptions: {
            title: '奶粉通货',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    NewSale: {
        screen: NewSale,
        navigationOptions: {
            title: '新品特卖',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    ConfirmOrder: {
        screen: ConfirmOrder,
        navigationOptions: {
            title: '确认订单',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    ViewLogistics: {
        screen: ViewLogistics,
        navigationOptions: {
            title: '查看物流',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    DeliveryDetail: {
        screen: DeliveryDetail,
        navigationOptions: {
            title: '物流详情',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    Comment: {
        screen: Comment,
        navigationOptions: {
            title: '评价',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    SelectPayType: {
        screen: SelectPayType,
        navigationOptions: {
            title: '选择支付方式',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    PaySuccess: {
        screen: PaySuccess,
        navigationOptions: {
            title: '支付成功',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    Order: {
        screen: Order,
        navigationOptions: {
            title: '订单列表',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    OrderDetail: {
        screen: OrderDetail,
        navigationOptions: {
            title: '订单详情',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    AfterSaleOrders: {
        screen: AfterSaleOrders,
        navigationOptions: {
            title: '我的售后',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    AfterSaleDetail: {
        screen: AfterSaleDetail,
        navigationOptions: {
            title: '售后详情',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    ApplyAfterSale: {
        screen: ApplyAfterSale,
        navigationOptions: {
            title: '申请售后',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    CouponList: {
        screen: CouponList,
        navigationOptions: {
            title: '优惠券',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
    SelectCoupon: {
        screen: SelectCoupon,
        navigationOptions: {
            title: '选择优惠券',
            headerStyle: styles.headerStyles,
            headerTintColor: 'black',
            headerBackTitle: null,
            headerRight: <View/>,
            headerTitleStyle: styles.headerTitleStyle,
        },
    },
});
//主要是这一步
const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;
    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
};

//这是第二步
SimpleApp.router.getStateForAction = navigateOnce(SimpleApp.router.getStateForAction);