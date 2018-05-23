/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    SafeAreaView,
    Alert,
    View
} from 'react-native';
import ProgressBar from 'react-native-progress/Circle';
import codePush from 'react-native-code-push';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../../components/common/MyText';
import ModalBox from 'react-native-modalbox';
type Props = {};

export default class Settings extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            codePushProgress: 0,
            isOpen: false,
            userInfo: {}
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.state.isLoading) {
            return <View/>
        } else {
            return (
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.container}>
                        <ModalBox
                            isOpen={this.state.isOpen}
                            style={styles.modalBox}
                            position="center"
                            backdropPressToClose={false}
                            swipeToClose={false}
                            backButtonClose={false}
                            coverScreen={true}
                            animationDuration={0}
                        >
                            <ProgressBar
                                showsText={true}
                                progress={this.state.codePushProgress}
                                size={50}/>
                        </ModalBox>

                        <View style={styles.cellView}>
                            <Text style={styles.leftCell}>账号</Text>
                            <View style={styles.rightCell}>
                                <Text style={styles.rightCellText}>{this.state.userInfo.loginId}</Text>
                            </View>
                        </View>
                        <View style={styles.cellView}>
                            <Text style={styles.leftCell}>手机</Text>
                            <View style={styles.rightCell}>
                                <Text style={styles.rightCellText}>{this.state.userInfo.mobile}</Text>
                            </View>
                        </View>


                        <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                            this.updatePwd()
                        }}>
                            <View style={styles.cellView}>
                                <Text style={styles.leftCell}>修改密码</Text>
                                <View style={styles.rightCell}>
                                    <Icon name="angle-right" size={20} color="#999"/>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.shopCertificationDetail()}>
                            <View style={styles.cellView}>
                                <Text style={styles.leftCell}>资质信息</Text>
                                <View style={styles.rightCell}>
                                    <Text style={styles.rightCellText}>{this.getAuthInfo()}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.checkForUpdate()}>
                            <View style={styles.cellView}>
                                <Text style={styles.leftCell}>检查更新</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                            this.aboutus()
                        }}>
                            <View style={styles.cellView2}>
                                <Text style={styles.leftCell}>关于我们</Text>
                                <View style={styles.rightCell}>
                                    <Icon name="angle-right" size={20} color="#999"/>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                            this.logout()
                        }}>
                            <View style={styles.cellView}>
                                <Text style={styles.leftCell}>退出当前账号</Text>
                                <View style={styles.rightCell}>
                                    <Icon name="angle-right" size={20} color="#999"/>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView>
            );
        }

    }

    fetchData() {
        HttpUtils.get('/member/selectStoreMemberById', {}, data => {
            storage.save({
                key: 'userInfo',
                data: data.data
            });
            this.setState({userInfo: data.data, isLoading: false});
        })
    }

    aboutus() {//关于我们
        this.props.navigation.navigate('Aboutus');
    }

    updatePwd() {//修改密码
        this.props.navigation.navigate('SecurityCheck');
    }

    async shopCertificationDetail() {//店铺详情
        let userInfo = this.state.userInfo;
        let auth = userInfo.authentication;
        if (auth === 0 || auth === -1) {
            this.props.navigation.navigate('ShopCertification');
        } else {
            this.props.navigation.navigate('ShopCertificationDetail');
        }

    }

    checkForUpdate() {
        ToastUtil.show('检查更新中...');
        codePush.checkForUpdate(deploymentKey).then((update) => {
            if (!update) {
                Alert.alert("提示", "当前已经是最新版本！", [
                    {
                        text: "Ok", onPress: () => {
                        console.log("点了OK");
                    }
                    }
                ]);
            } else {
                codePush.sync({
                        deploymentKey: deploymentKey,
                        updateDialog: {
                            optionalIgnoreButtonLabel: '稍后',
                            optionalInstallButtonLabel: '立即更新',
                            optionalUpdateMessage: '有新版本了，是否更新？',
                            title: '更新提示'
                        },
                        installMode: codePush.InstallMode.IMMEDIATE,

                    },
                    (status) => {

                        switch (status) {
                            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                                break;
                            case codePush.SyncStatus.AWAITING_USER_ACTION:
                                break;
                            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                                if (!this.state.isOpen) {
                                    this.setState({isOpen: true});
                                }
                                break;
                            case codePush.SyncStatus.INSTALLING_UPDATE:
                                ToastUtil.show('安装中...');
                                break;
                            case codePush.SyncStatus.UP_TO_DATE:
                                break;
                            case codePush.SyncStatus.UPDATE_IGNORED:
                                break;
                            case codePush.SyncStatus.UPDATE_INSTALLED:
                                break;
                            case codePush.SyncStatus.SYNC_IN_PROGRESS:
                                break;
                            case codePush.SyncStatus.UNKNOWN_ERROR:
                                this.setState({isOpen: false});
                                Alert.alert(null, '遇到未知错误，安装失败');
                                break;
                        }
                    },
                    (progress) => {
                        this.setState({codePushProgress: progress.receivedBytes / progress.totalBytes})
                        if (progress.receivedBytes / progress.totalBytes === 1) {
                            this.setState({isOpen: false});
                        }
                    }
                );
            }
        })
    }

    logout() {
        Alert.alert(null, '是否确定退出登录？',
            [
                {
                    text: "确定", onPress: () => {
                    storage.remove({key: 'loginState'});
                    storage.remove({key: 'userInfo'});
                    storage.remove({key: 'addressData'});
                    jumpAndClear(this.props.navigation, 'Login')
                }
                },
                {
                    text: "取消", onPress: () => {
                }
                },
            ],
            {cancelable: false}
        )
    }

    getAuthInfo() {
        let value = authList.find(n => n.id == this.state.userInfo.authentication);
        return value.name;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    cellView: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: whiteColor,
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    cellView2: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: whiteColor,
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    modalBox: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    leftCell: {},
    rightCell: {},
    rightCellText: {
        color: '#999'
    },
});
