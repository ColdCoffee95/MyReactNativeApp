/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Button,
    Image,
    Text,
    TextInput,
    View
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'
type Props = {};

export default class Cart extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {loginId: '', pwd: ''}
    }

    render() {
        let arr = [];
        cartTabList.map(value => {
            arr.push(
                <View tabLabel={value.name}>{value.name}</View>
            )
        });
        return (
            <View style={styles.container}>
                <View style={styles.cartList}>
                    <ScrollableTabView
                        style={{marginTop: 10,marginBottom:0}}
                        tabBarActiveTextColor={activeColor}
                        tabBarUnderlineStyle={styles.underlineStyle}
                        initialPage={0}>
                        {arr}
                    </ScrollableTabView>
                </View>
            </View>
        );
    }

    login() {
        let params = {
            loginId: this.state.loginId,
            pwd: this.state.pwd
        };
        HttpUtils.post('/login/doLogin', params, data => {
            this.props.navigator.navigate('IndexPage')
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    cartList: {},
    underlineStyle:{
        height:0,
        width:0
    }
});
