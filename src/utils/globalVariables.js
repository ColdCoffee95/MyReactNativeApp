import {Dimensions} from "react-native";
import HttpUtils from "./http";
import DeviceInfo from 'react-native-device-info'
global.cutTypes = [
    {
        name: '满减',
        value: 'full-cut'
    },
    {
        name: '立减',
        value: 'minus'
    },
    {
        name: '折扣',
        value: 'discount'
    },
];
global.afterTypes = [
    {
        id: 0,
        name: '售后中'
    },
    {
        id: 1,
        name: '售后中'
    },
    {
        id: 2,
        name: '已完成'
    },
];
global.cartTabList = [
    {
        id: 1,
        name: "一般贸易",
        color: '#78E285'
    },
    {
        id: 2,
        name: "保税区发货",
        color: '#C685FF'
    },
    {
        id: 3,
        name: "海外直邮",
        color: '#78E285'
    }
];
global.orderStatusList = [
    {
        id: 1,
        name: "待支付"
    },
    {
        id: 2,
        name: "待收货"
    },
    {
        id: 3,
        name: "待发货"
    },
    {
        id: 4,
        name: "待评价"
    },
    {
        id: 5,
        name: "已完成"
    },
    {
        id: 6,
        name: "已关闭"
    },
    {
        id: 7,
        name: "退款中"
    }
];
global.authList = [
    {
        id: 0,
        name: "未认证",
    },
    {
        id: 1,
        name: "已认证",
    },
    {
        id: 2,
        name: "待审核",
    },
    {
        id: -1,
        name: "认证驳回",
    }
];
global.activeColor = '#fd4a70';
global.whiteColor = '#fff';
global.borderColor = '#e9e9e9';
global.screenWidth = Dimensions.get('window').width;
global.screenHeight = Dimensions.get('window').height;
global.HttpUtils = HttpUtils;
global.hotline = '0571-28218551';
// global.serverUrl = 'http://192.168.41.78:9010/api';
global.serverUrl = 'http://api.metchange.com/api';

global.imgDomain = 'http://dianlijiheoss.metchange.com/';
global.version = DeviceInfo.getVersion();
global.platform = DeviceInfo.getSystemName();
