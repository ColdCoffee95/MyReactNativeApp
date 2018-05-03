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
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../../components/common/MyText';
type Props = {};

export default class Settings extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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

    logout() {
        Alert.alert(null, '是否确定退出登录？',
            [
                {
                    text: "确定", onPress: () => {
                        storage.remove({key: 'loginState'});
                        storage.remove({key: 'userInfo'});
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
    leftCell: {},
    rightCell: {},
    rightCellText: {
        color: '#999'
    },
});
