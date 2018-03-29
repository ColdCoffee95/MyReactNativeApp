import {Dimensions} from "react-native";
import HttpUtils from "./http";
import DeviceInfo from 'react-native-device-info'
global.cartTabList = [
    {
        id: 1,
        name: "一般贸易"
    },
    {
        id: 2,
        name: "保税区发货"
    },
    {
        id: 3,
        name: "海外直邮"
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
global.serverUrl = 'http://192.168.41.78:9010/api';
global.imgDomain = 'http://dianlijiheoss.metchange.com/';
global.version = DeviceInfo.getVersion();
global.platform = DeviceInfo.getSystemName();
