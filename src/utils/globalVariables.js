import {Dimensions} from "react-native";
import HttpUtils from "./http";

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
global.screenWidth = Dimensions.get('window').width;
global.screenHeight = Dimensions.get('window').height;
global.HttpUtils = HttpUtils;