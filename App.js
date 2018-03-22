import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {StackNavigator} from "react-navigation";
import './src/utils/storage';
import './src/utils/globalVariables';
import MainScreen from './src/pages/screens/MainScreen';
import LoginScreen from './src/pages/screens/LoginScreen';
import RegisterScreen from './src/pages/screens/RegisterScreen';
import ForgetPwdScreen from './src/pages/screens/ForgetPwdScreen';

import Hotline from './src/pages/user/Hotline';
import Settings from './src/pages/user/Settings';
import Feedback from './src/pages/user/Feedback';

import ManageAddress from './src/pages/address/ManageAddress';
import AddAddress from './src/pages/address/AddAddress';
const styles = StyleSheet.create({
    headerStyles: {
        backgroundColor: '#fd4a70'
    },
    headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        color:'#000'
    }
});

const SimpleApp = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
           header:null
        }
    },
    Main: {screen: MainScreen},
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            title: '注册',
            headerStyle: styles.headerStyles,
            headerTintColor: '#fff',
            headerTitleStyle:styles.headerTitleStyle,
            headerRight:<View />,
            headerBackTitle:null,
        }
    },
    ForgetPwd: {
        screen: ForgetPwdScreen,
        navigationOptions: {
            title: '忘记密码',
            headerStyle: styles.headerStyles,
            headerTitleStyle:styles.headerTitleStyle,
            headerTintColor: '#fff',
            headerBackTitle:null
        }
    },
    Hotline:{
        screen: Hotline,
        navigationOptions: {
            title: '客服热线',
            headerStyle: styles.headerStyles,
            headerTintColor: '#fff',
            headerBackTitle:null
        }
    },
    Settings:{
        screen: Settings,
        navigationOptions: {
            title: '设置',
            headerStyle: styles.headerStyles,
            headerTintColor: '#fff',
            headerBackTitle:null
        }
    },
    Feedback:{
        screen: Feedback,
        navigationOptions: {
            title: '意见反馈',
            headerStyle: styles.headerStyles,
            headerTintColor: '#fff',
            headerBackTitle:null
        }
    },
    ManageAddress:{
        screen: ManageAddress,
        navigationOptions: {
            title: '大贸地址管理',
            headerStyle: styles.headerStyles,
            headerTintColor: '#fff',
            headerBackTitle:null
        }
    },
    AddAddress:{
        screen: AddAddress,
        navigationOptions: {
            title: '添加大贸地址',
            headerStyle: styles.headerStyles,
            headerTintColor: '#fff',
            headerBackTitle:null
        },

    },

});
module.exports = SimpleApp;