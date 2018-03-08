/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Image,
    Text,
    TextInput,
    View
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation'
import IndexPage from './IndexPage'
import HttpUtils from '../utils/http'
type Props = {};

export default class Login extends Component<Props> {
    static navigationOptions = {
        title:'login'
    }
    constructor(props) {
        super(props);
        this.state = {loginId: '', pwd: ''}
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('./src/images/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.version}>
                    v1.2.2
                </Text>
                <TextInput
                    style={styles.phone}
                    autoFocus={true}
                    placeholder="请输入手机号"
                    onChangeText={(text) => this.setState({loginId: text})}
                    keyboardType={'numeric'}
                    maxLength={11}
                />
                <TextInput
                    style={styles.password}
                    placeholder="请输入密码"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({pwd: text})}
                />
                <Button
                    onPress={() => this.login()}
                    title="登录"
                    color="#ff6a68"
                />
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
const SimpleApp = StackNavigator({
    Login: {screen: Login},
    IndexPage: {screen: IndexPage}
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    version: {
        marginTop: 20
    },
    logo: {
        marginTop: 40,
        width: 100,
        height: 100,
    },

    phone: {
        width: 200,
        marginTop: 20
    },
    password: {
        width: 200
    },
});
