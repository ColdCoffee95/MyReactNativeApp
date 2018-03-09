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
type Props = {};

export default class RegisterScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {code: '', pwd: '', mobile: '', pwdAgain: ''}
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.phone}
                    // autoFocus={true}
                    placeholder="请输入手机号码"
                    onChangeText={(text) => this.setState({mobile: text})}
                    keyboardType={'numeric'}
                    maxLength={11}
                />
                <View style={styles.messageInputView}>
                    <TextInput
                        style={styles.code}
                        placeholder="请输入验证码"
                        onChangeText={(text) => this.setState({code: text})}
                        keyboardType={'numeric'}
                        maxLength={6}
                    />
                    <Button title="获取验证码"></Button>
                </View>
                <TextInput
                    style={styles.password}
                    placeholder="请设置登录密码"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({pwd: text})}
                />
                <TextInput
                    style={styles.password}
                    placeholder="请确认密码"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({pwdAgain: text})}
                />
                <Button
                    onPress={() => this.login()}
                    title="注册"
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    version: {
        marginTop: 20
    },
    messageInputView: {
        flexDirection: 'row',
        justifyContent:'flex-start'
    },
    logo: {
        marginTop: 40,
        width: 100,
        height: 100,
    },
    code:{
        width: 150,
    },
    phone: {
        width: 300,
        marginTop: 20
    },
    password: {
        width: 300
    },
});
