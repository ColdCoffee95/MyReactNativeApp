/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    Alert,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            return <ActivityIndicator/>;
        } else {
            return (
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


                    <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {this.updatePwd()
                    }}>
                        <View style={styles.cellView}>
                            <Text style={styles.leftCell}>修改密码</Text>
                            <View style={styles.rightCell}>
                                <Icon name="angle-right" size={20} color="#999"/>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#f2f2f2' onPress={() => {
                    }}>
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
            );
        }

    }

    fetchData() {
        HttpUtils.get('/member/selectStoreMemberById', {}, data => {
            this.setState({userInfo: data.data, isLoading: false});
        })
    }

    aboutus() {//关于我们
        this.props.navigation.navigate('Aboutus');
    }
    updatePwd(){//修改密码
        this.props.navigation.navigate('Security');
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
        let value = authList.find(n => n.id == this.state.userInfo.authentication)
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
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    cellView2: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: whiteColor,
        padding: 15,
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
