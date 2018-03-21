/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Linking,
    View
} from 'react-native';

type Props = {};

export default class Settings extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cellView}>
                    <Text style={styles.leftCell}>账号</Text>
                    <View style={styles.rightCell}>
                        <Text style={styles.rightCellText}>查看所有订单</Text>
                    </View>
                </View>
                <View style={styles.cellView}>
                    <Text style={styles.leftCell}>手机</Text>
                    <View style={styles.rightCell}>
                        <Text style={styles.rightCellText}>查看所有订单</Text>
                    </View>
                </View>
                <View style={styles.cellView}>
                    <Text style={styles.leftCell}>修改密码</Text>
                    <View style={styles.rightCell}>
                        <Text style={styles.rightCellText}>查看所有订单</Text>
                    </View>
                </View>
                <View style={styles.cellView}>
                    <Text style={styles.leftCell}>资质信息</Text>
                    <View style={styles.rightCell}>
                        <Text style={styles.rightCellText}>查看所有订单</Text>
                    </View>
                </View>
                <View style={styles.cellView2}>
                    <Text style={styles.leftCell}>关于我们</Text>
                    <View style={styles.rightCell}>
                        <Text style={styles.rightCellText}>查看所有订单</Text>
                    </View>
                </View>
                <View style={styles.cellView}>
                    <Text style={styles.leftCell}>退出当前账号</Text>
                    <View style={styles.rightCell}>
                        <Text style={styles.rightCellText}>查看所有订单</Text>
                    </View>
                </View>
            </View>
        );
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
        marginTop:10,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    leftCell: {},
    rightCell: {},
    rightCellText: {
        color: '#999'
    },
});
