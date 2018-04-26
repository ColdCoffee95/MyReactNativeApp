/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View
} from 'react-native';

type Props = {};
import CryptoJS from 'crypto-js'
import FormCell from '../../components/common/FormCell'
import ActiveButton from '../../components/common/ActiveButton'

export default class UpdatePwd extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            oldPwd: '',
            newPwd: '',
            newPwdAgain: ''
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <FormCell
                        title='原密码'
                        placeholder='请输入原密码'
                        onChange={text => this.setState({oldPwd: text})}
                        autoFocus={true}>
                    </FormCell>
                    <FormCell
                        title='新密码'
                        placeholder='请设置新密码'
                        secureTextEntry={true}
                        onChange={text => this.setState({newPwd: text})}>
                    </FormCell>
                    <FormCell
                        title='确认密码'
                        placeholder='请再次输入新密码'
                        secureTextEntry={true}
                        onChange={text => this.setState({newPwdAgain: text})}>
                    </FormCell>
                    <View style={styles.bottomBtnView}>
                        <ActiveButton clickBtn={() => this.updatePwd()} text='确认修改' style={styles.activeButton}>

                        </ActiveButton>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    updatePwd() {
        let {oldPwd, newPwd, newPwdAgain} = this.state;
        if (!oldPwd.trim() || !newPwd.trim() || !newPwdAgain.trim()) {
            ToastUtil.show('请填写完整');
            return;
        }
        if (newPwd !== newPwdAgain) {
            ToastUtil.show('两次新密码输入不一致');
            return;
        }
        if (!validPwd(newPwd)) {
            ToastUtil.show('密码必须是6-20位不含空格,且必须包含英文或数字');
            return;
        }
        let params = {
            oldPwd: CryptoJS.MD5(oldPwd.trim()).toString(),
            newPwd: CryptoJS.MD5(newPwd.trim()).toString(),
        };
        HttpUtils.post('/member/updateMemberPwd', params, data => {
            ToastUtil.show('修改成功');
            this.props.navigation.navigate('Mine')
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
