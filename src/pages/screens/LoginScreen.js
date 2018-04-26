import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    BackHandler,
    View
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import CryptoJS from 'crypto-js'
type Props = {};

export default class LoginScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {loginId: '', pwd: '', havaToken: true, agree: true}
    }

    componentDidMount() {

        this.checkToken();
    }
    backButtonPress(){
        const nav = this.props.navigation;
        console.warn('nav',nav)
        const routerName = nav.state.routeName;
        if (routers.length > 1) {
            const top = routers[routers.length - 1];
            if (top.ignoreBack || top.component.ignoreBack){
                // 路由或组件上决定这个界面忽略back键
                return true;
            }
            const handleBack = top.handleBack || top.component.handleBack;
            if (handleBack) {
                // 路由或组件上决定这个界面自行处理back键
                return handleBack();
            }
            // 默认行为： 退出当前界面。
            nav.pop();
            return true;
        }
        return false;
        if (this.lastBackPressed && this.lastBackPressed + 500 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastUtil.show('再按一次退出应用');
        return true;
    }
    async checkToken() {
        let loginState = await HttpUtils.getLoginState();
        let params = {memberId: loginState.memberId, token: loginState.token};
        fetch(serverUrl + '/login/checkToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.code === 10000) {
                    this.toMain();
                } else {
                    this.setState({havaToken: false});
                }
            })
            .catch((error) => {
                console.error("error = " + error)
            });
    }

    render() {
        if (!this.state.havaToken) {
            return (
                <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                    <View style={styles.container}>
                        <Image
                            source={require('../../images/logo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.version}>
                            {version}
                        </Text>

                        <View style={styles.inputView}>

                            <View style={styles.userNameView}>
                                <Icon name='user' size={20} color={activeColor}></Icon>
                                <TextInput
                                    style={styles.phone}
                                    // autoFocus={true}
                                    placeholder="请输入手机号"
                                    onChangeText={(text) => this.setState({loginId: text})}
                                    keyboardType={'numeric'}
                                    returnKeyType='done'
                                    returnKeyLabel='确定'
                                    maxLength={11}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                            <View style={styles.passwordView}>
                                <Icon name='lock' size={20} color={activeColor}></Icon>
                                <TextInput
                                    style={styles.password}
                                    placeholder="请输入密码"
                                    returnKeyType='done'
                                    returnKeyLabel='确定'
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({pwd: text})}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        </View>

                        <View style={styles.agreeForgetView}>
                            <View style={styles.agreeView}>
                                <TouchableOpacity
                                    onPress={() => this.setState({agree: !this.state.agree})}>
                                    <View style={styles.defaultView}>
                                        {
                                            !this.state.agree ?
                                                (<Icon2 name="checkbox-blank-circle-outline" size={12}
                                                        color={activeColor}></Icon2>) :
                                                (<Icon2 name="checkbox-marked-circle" size={12}
                                                        color={activeColor}></Icon2>)
                                        }
                                    </View>
                                </TouchableOpacity>
                                <Text style={{color: '#aeaeae', marginLeft: 2, fontSize: 10}}>我已经阅读并同意</Text>
                                <TouchableOpacity onPress={() => this.agreement()}>
                                    <View>
                                        <Text style={{color: activeColor, fontSize: 10}}>《店力集盒平台服务协议》</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPwd')}>
                                <View>
                                    <Text>忘记密码?</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.login()}>
                            <View style={styles.loginBtn}>
                                <Text style={styles.loginBtnText}>登录</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.register()}>
                            <View style={styles.registerBtn}>
                                <Text style={styles.registerBtnText}>申请入驻</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.bottomView}>
                            <Text style={{color: '#bebebe', fontSize: 12}}>Designed by MetChange</Text>
                        </View>
                    </View>
                </SafeAreaView>

            );
        } else {
            return <View/>
        }
    }

    register() {
        if (!this.state.agree) {
            Alert.alert(null, '请先阅读并同意平台协议再注册！');
            return;
        }
        this.props.navigation.navigate('Register')
    }

    login() {
        if (!this.state.agree) {
            Alert.alert(null, '请先阅读并同意平台协议再登录！');
            return;
        }
        let loginId = this.state.loginId.trim();
        let pwd = this.state.pwd.trim();
        if(!loginId || !pwd){
            Alert.alert(null, '请输入完整！');
            return;
        }
        let params = {
            loginId: loginId,
            pwd: CryptoJS.MD5(pwd).toString()
        };
        HttpUtils.post('/login/doLogin', params, data => {

            storage.save({
                key: 'loginState',
                data: {
                    token: data.data.token,
                    memberId: data.data.memberId
                }
            });
            HttpUtils.get('/member/selectStoreMemberById', {}, data => {
                storage.save({
                    key: 'userInfo',
                    data: data.data
                });
                this.toMain()
            });
        })
    }

    agreement() {
        this.props.navigation.navigate('Agreement');
    }

    toMain() {
        jumpAndClear(this.props.navigation, 'Main')
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    bottomView: {
        position: 'absolute',
        bottom: 20,

    },
    agreeForgetView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: screenWidth * 0.85,
    },
    popupScrollView: {
        width: screenWidth * 0.85,
        borderColor: borderColor,
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor:'blue',
        height:50
    },
    inputView: {
        width: screenWidth * 0.85,
        borderColor: borderColor,
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 10
    },
    agreeView: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 10
    },
    registerBtn: {
        width: screenWidth * 0.85,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor,
        borderWidth: 2,
        borderColor: '#ececec',
        borderRadius: 50,
        marginTop: 10,
    },
    registerBtnText: {
        fontSize: 14,
        color: 'black'
    },
    loginBtn: {
        width: screenWidth * 0.85,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: activeColor,
        borderRadius: 50,
        marginTop: 10,
    },
    loginBtnText: {
        fontSize: 16,
        color: whiteColor
    },
    userNameView: {
        height: 50,
        width: screenWidth * 0.85,
        alignItems: 'center',
        borderBottomColor: borderColor,
        borderBottomWidth: 2,
        flexDirection: 'row',
        paddingLeft: 20
    },
    passwordView: {
        height: 50,
        width: screenWidth * 0.85,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
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
        width: 200,
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
        height: 50,
        paddingLeft: 10,
        fontSize: 14
    },
    password: {
        width: 200,
        height: 50,
        paddingLeft: 10,
    },
});