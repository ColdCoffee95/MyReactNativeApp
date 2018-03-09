import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Style,
} from 'react-native';
import {StackNavigator} from "react-navigation";

import MainScreen from './src/pages/screens/MainScreen';
import LoginScreen from './src/pages/screens/LoginScreen';
import RegisterScreen from './src/pages/screens/RegisterScreen';

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
    headerStyles: {
        backgroundColor: '#fd4a70'
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
            headerTintColor: '#fff'
        }
    }
});
module.exports = SimpleApp;