/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    View
} from 'react-native';

type Props = {};
import CryptoJS from 'crypto-js'
import FormCell from '../../components/common/FormCell'
import ActiveButton from '../../components/common/ActiveButton'
import Toast, {DURATION} from 'react-native-easy-toast';

export default class Register extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            pwd: '',
            mobile: '',
            pwdAgain: '',
            counting: false,
            enable: true,
            timerCount: 60,
            timerTitle: '获取验证码',
        }
    }

    render() {

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <FormCell
                        title='手机号'
                        placeholder='请输入手机号码'
                        onChange={text => this.setState({mobile: text})}
                        keyboardType='numeric'
                        maxLength={11}
                        autoFocus={true}>
                    </FormCell>
                    <View style={styles.formCellView}>
                        <View style={styles.leftView}>
                            <Text style={{
                                marginLeft: 10,
                                lineHeight: 40,
                                height: 40,
                                width: 60
                            }}>验证码</Text>
                            <TextInput
                                style={{
                                    marginLeft: 10,
                                    height: 40,
                                    width: 150
                                }}
                                returnKeyType='done'
                                keyboardType='numeric'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({code: text})}
                                placeholder='请输入验证码'>
                            </TextInput>
                        </View>
                        <TouchableOpacity activeOpacity={this.state.counting ? 1 : 0.8}
                                          onPress={() => this.buttonClick(this.state.enable)}>
                            {
                                this.state.timerTitle === '获取验证码' && <View style={styles.buttonStyle}>
                                    <Text
                                        style={styles.textStyle}>获取验证码</Text>
                                </View>

                            }
                            {
                                this.state.timerTitle !== '获取验证码' && <View style={styles.buttonStyleUnable}>
                                    <Text
                                        style={styles.textStyleUnable}>{this.state.timerCount}秒后重试</Text>
                                </View>

                            }
                        </TouchableOpacity>
                    </View>
                    <FormCell
                        title='设置密码'
                        placeholder='请设置登录密码'
                        secureTextEntry={true}
                        onChange={text => this.setState({pwd: text})}>
                    </FormCell>
                    <FormCell
                        title='确认密码'
                        placeholder='请再次输入登录密码'
                        secureTextEntry={true}
                        onChange={text => this.setState({pwdAgain: text})}>
                    </FormCell>
                    <View style={styles.bottomBtnView}>
                        <ActiveButton clickBtn={() => this.register()} text='注册' style={styles.activeButton}>

                        </ActiveButton>
                    </View>
                    <Toast ref='toast' position='center'/>
                </View>
            </SafeAreaView>
        );
    }

    register() {
        let {mobile, pwd, pwdAgain, code} = this.state;
        if (!mobile.trim() || !pwd.trim() || !pwdAgain.trim() || !code.trim()) {
            this.refs.toast.show('请填写完整', 500);
            return;
        }
        if (pwd !== pwdAgain) {
            this.refs.toast.show('两次密码输入不一致', 500);
            return;
        }
        if (!validPwd(pwd)) {
            this.refs.toast.show('密码必须是6-20位不含空格,且必须包含英文或数字', 500);
            return;
        }
        let params = {
            mobile: mobile.trim(),
            pwd: CryptoJS.MD5(pwd.trim()).toString(),
            code: code.trim()
        };
        HttpUtils.post('/member/register', params, data => {
            Alert.alert(null, '注册成功!认证店铺信息后可以下单，是否现在认证店铺?？',
                [
                    {
                        text: "去认证", onPress: () => {
                            this.props.navigation.navigate('ShopCertification', {
                                memberId: data.data.memberId,
                                type: 1
                            });
                        }
                    },
                    {
                        text: "去登录", onPress: () => {
                            jumpAndClear(this.props.navigation, 'Login')
                        }
                    },
                ],
                {cancelable: false}
            )
        })
    }

    checkMobile() {
        return new Promise((resolve, reject) => {
            try {
                HttpUtils.get('/member/checkMobile', {mobile: this.state.mobile}, data => {
                    resolve(true);
                })
            } catch (e) {
                resolve(false)
            }

        })
    }

    async buttonClick(enable) {
        if (!enable) {
            this.refs.toast.show('请稍后再试', 300);
            return;
        }
        let mobileAble = await this.checkMobile();
        if (!mobileAble) {
            this.refs.toast.show('该手机号已被使用', 300);
            return;
        }
        this.getMessageCode();
    }

    getMessageCode() {
        this.setState({enable: false, timerTitle: ''});
        const messageCount = setInterval(() => {

            this.state.timerCount--;
            this.setState({timerCount: this.state.timerCount});
            if (this.state.timerCount === 0) {
                clearInterval(messageCount);
                this.setState({enable: true, timerTitle: "获取验证码"});
            }
        }, 1000);
        let params = {
            mobile: this.state.mobile,
            type: 1
        };
        HttpUtils.post('/message/getMobileMessage', params, data => {
            this.refs.toast.show('发送成功');
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    formCellView: {
        width: screenWidth,
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellTitle: {},
    cellInput: {
        marginLeft: 10
    },
    buttonStyle: {
        backgroundColor: activeColor,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 5,
        marginRight: 10
    },
    buttonStyleUnable: {
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 5,
        marginRight: 10
    },
    textStyle: {
        color: whiteColor
    },
    textStyleUnable: {
        color: '#333'
    }
});
