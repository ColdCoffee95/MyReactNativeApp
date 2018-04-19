/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

type Props = {};
import ActiveButton from '../../components/common/ActiveButton'
import Toast, {DURATION} from 'react-native-easy-toast';

export default class SecurityCheck extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            viewPhone: '',
            realPhone: '',
            mobileCode: '',
            imgCode: '',//输入的图片验证码
            codeImg: '',//验证码图片
            counting: false,
            enable: true,
            timerCount: 60,
            timerTitle: '获取验证码',
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <View style={styles.topMobilePhoneView}>
                        <Text style={styles.viewPhone}>{this.state.viewPhone}</Text>
                    </View>
                    <View style={styles.formCellView}>
                        <View style={styles.leftView}>
                            <Text style={{
                                marginLeft: 10,
                                lineHeight: 40,
                                height: 40,
                                width: 80
                            }}>图片验证码</Text>
                            <TextInput
                                style={{
                                    marginLeft: 10,
                                    height: 40,
                                    width: 150
                                }}
                                returnKeyType='done'
                                keyboardType='numeric'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({imgCode: text})}
                                placeholder='请输入图片验证码'>
                            </TextInput>
                        </View>
                        <TouchableOpacity onPress={() => this.getCodeImg()}>
                            <View style={styles.codeImgView}>
                                {
                                    this.state.codeImg && <Image
                                        resizeMode='contain'
                                        source={{uri: this.state.codeImg}}
                                        style={styles.codeImg}
                                    />
                                }

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formCellView}>
                        <View style={styles.leftView}>
                            <Text style={{
                                marginLeft: 10,
                                lineHeight: 40,
                                height: 40,
                                width: 80
                            }}>手机验证码</Text>
                            <TextInput
                                style={{
                                    marginLeft: 10,
                                    height: 40,
                                    width: 150
                                }}
                                returnKeyType='done'
                                keyboardType='numeric'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({mobileCode: text})}
                                placeholder='请输入手机验证码'>
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

                    <View style={styles.bottomBtnView}>
                        <ActiveButton clickBtn={() => this.nextStep()} text='下一步' style={styles.activeButton}>

                        </ActiveButton>
                    </View>
                    <Toast ref='toast' position='center'/>
                </View>
            </SafeAreaView>
        );
    }

    fetchData() {
        this.getViewPhone();
        this.getCodeImg();
    }

    async getViewPhone() {
        let userInfo = await HttpUtils.getUserInfo();
        let phone = userInfo.mobile;
        this.setState({realPhone: phone, viewPhone: `${phone.substr(0, 3)}****${phone.substr(7)}`});
    }

    async getCodeImg() {
        let loginStatus = await HttpUtils.getLoginState();
        const {token, memberId} = loginStatus;
        let codeImg = `${serverUrl}/message/getImgCode?memberId=${memberId}&random=${Math.random()}&token=${token}&platform=${platform}&version=${version}`;
        console.warn(codeImg)
        this.setState({codeImg: codeImg});
    }

    async nextStep() {
        let {realPhone, mobileCode,imgCode} = this.state;
        if (!realPhone || !mobileCode.trim() || !imgCode.trim()) {
            this.refs.toast.show('请填写完整', 500);
            return;
        }
        let isImgCode = await this.checkImgCode();
        if (!isImgCode) {
            this.refs.toast.show('图片验证码输入不正确', 300);
            return;
        }
        let params = {
            mobile: realPhone,
            code: mobileCode.trim(),
            type: 2
        };
        HttpUtils.get('/message/isMobileCode', params, data => {
            this.props.navigation.navigate('UpdatePwd');
        })
    }

    async buttonClick(enable) {
        if (!enable) {
            this.refs.toast.show('请稍后再试', 300);
            return;
        }
        if (!this.state.imgCode.trim()) {
            this.refs.toast.show('请输入图片验证码', 300);
            return;
        }
        let isImgCode = await this.checkImgCode();
        if (!isImgCode) {
            this.refs.toast.show('图片验证码输入不正确', 300);
            return;
        }
        this.getMessageCode();
    }

    checkImgCode() {
        return new Promise((resolve, reject) => {
            try {
                HttpUtils.get('/message/isImgCode', {code: this.state.imgCode, type: 1}, data => {
                    resolve(true)
                })
            } catch (e) {
                resolve(false)
            }

        })
    }

    async getMessageCode() {

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
            mobile: this.state.realPhone,
            type: 2//2是安全校验
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
    topMobilePhoneView: {
        height: 100,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewPhone: {
        fontSize: 20
    },
    codeImgView: {
        backgroundColor: whiteColor,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 5,
        marginRight: 10
    },
    codeImg: {
        width: 70,
        height: 26
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
