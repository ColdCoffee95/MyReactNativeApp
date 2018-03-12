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
import HttpUtils from '../../utils/http'
import CryptoJS from 'crypto-js'
type Props = {};

export default class LoginScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {loginId: '', pwd: ''}
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../images/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.version}>
                    v1.2.2
                </Text>
                <TextInput
                    style={styles.phone}
                    // autoFocus={true}
                    placeholder="请输入手机号"
                    onChangeText={(text) => this.setState({loginId: text})}
                    keyboardType={'numeric'}
                    maxLength={11}
                    value="15957103422"
                />
                <TextInput
                    style={styles.password}
                    placeholder="请输入密码"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({pwd: text})}
                    value="a123456"
                />
                <Button
                    onPress={() => this.login()}
                    title="登录"
                    color="#ff6a68"
                />
                <View style={styles.registerForgetView}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="申请入驻"
                        color="#ff6a68"
                    />
                    <Button
                        onPress={() => this.props.navigation.navigate('ForgetPwd')}
                        title="忘记密码"
                        color="#ff6a68"
                    />
                </View>


                
            </View>
        );
    }

    login() {
        let params = {
            loginId: this.state.loginId,
            pwd: CryptoJS.MD5(this.state.pwd).toString()
        };
        HttpUtils.post('/login/doLogin', params, data => {
            this.props.navigation.navigate('Main')
        })
    }
}
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
        marginTop: 80,
        width: 100,
        height: 100,
    },
    registerForgetView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:200,
        marginTop: 10,
    },
    register: {
        color: '#fd4a70'
    },
    forget: {
        color: '#fd4a70',
    },
    phone: {
        width: 200,
        height:40,
        marginTop: 20,
        borderWidth:1,
        paddingLeft:10,
        borderColor:'#ededed'
    },
    password: {
        width: 200,
        height:40,
        marginTop: 10,
        marginBottom: 10,
        borderWidth:1,
        paddingLeft:10,
        borderColor:'#ededed'
        
        
    },
});