import {Dimensions} from "react-native";
import HttpUtils from "./http";
import DeviceInfo from 'react-native-device-info'
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
global.version = '1.3.2';
global.hotline = '0571-28218551';
// global.serverUrl = 'http://192.168.41.78:9010/api';
global.serverUrl = 'http://api.metchange.com/api';

global.imgDomain = 'http://dianlijiheoss.metchange.com/';
global.version = DeviceInfo.getVersion();
global.platform = DeviceInfo.getSystemName();
