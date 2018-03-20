import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from '../Home';
import CategoryPage from '../Category';
import CartPage from '../Cart';
import MinePage from '../Mine';


const mainPage = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            //默认参数
            title:'首页',
            tabBarLabel: '首页',
            headerLeft:null,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={
                        require('../../images/homeun.png')
                    }
                    style={[styles.icon, {tintColor: tintColor}]}// {tintColor: tintColor} 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            }
        }
    },
    Category: {
        screen: CategoryPage,
        navigationOptions: {
            title:'分类',
            tabBarLabel: '分类',
            headerLeft:null,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={
                        require('../../images/catun.png')
                    }
                    style={[styles.icon, {tintColor: tintColor}]}// {tintColor: tintColor} 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            }
        }
    },
    Cart: {
        screen: CartPage,
        navigationOptions: {
            title:'进货单',
            tabBarLabel: '进货单',
            headerLeft:null,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={
                        require('../../images/cartun.png')
                    }
                    style={[styles.icon, {tintColor: tintColor}]}// {tintColor: tintColor} 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            }
        }
    },
    Mine: {
        screen: MinePage,
        //以下参数也可放置在MinePage.js页面
        navigationOptions: {
            tabBarLabel: '我的',
            header:null,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={
                        require('../../images/myun.png')
                    }
                    style={[styles.icon, {tintColor: tintColor}]}// {tintColor: tintColor} 选中的图片和文字颜色
                />
            ),

        }
    },
}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#fd4a70', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            height: 56
        },
        labelStyle: {
            fontSize: 12, // 文字大小,
            marginBottom: 6,
        },
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20
    }
});
module.exports = mainPage;