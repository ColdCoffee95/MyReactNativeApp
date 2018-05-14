/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Linking,
    SafeAreaView,
    View
} from 'react-native';
import Text from '../../components/common/MyText';
import MyIcon from 'react-native-vector-icons/MyIcon';
type Props = {};

export default class Hotline extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <View style={styles.hotlineTopView}>
                        <View style={styles.hotlineLeftView}>
                            <MyIcon name="kefux" color={activeColor} size={30}/>
                            <Text style={styles.leftText}>联系客服</Text>
                        </View>
                        <View style={styles.hotlineRightView}>
                            <View style={styles.rightPhoneView}>
                                <Text style={styles.rightTextFirst}>觇智客服热线</Text>
                                <Text style={styles.rightTextSecond}>{hotline}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.callPhone()}>
                                <View style={styles.rightCallView}>
                                    <MyIcon name="callx" color='#76B900' size={24}/>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.middleBackground}>
                    </View>
                    <View>
                        <Text style={styles.bottomText}>咨询商品或对店力集盒有任何疑问或不满请随时拨打客服热线。</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    callPhone() {
        return Linking.openURL('tel:' + hotline)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    hotlineTopView: {
        width: screenWidth,
        height: 80,
        flexDirection: 'row',
    },
    leftText: {
        marginTop: 10
    },
    middleBackground: {
        width: screenWidth,
        height: 10,
        backgroundColor: '#f2f2f2'
    },
    hotlineLeftView: {
        width: screenWidth / 5,
        borderRightWidth: 1,
        borderRightColor: borderColor,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hotlineRightView: {
        flexDirection: 'row',
        width: screenWidth * 4 / 5,
        height: 80,
    },
    rightTextFirst: {
        fontSize: 14
    },
    rightTextSecond: {
        fontSize: 16,
        marginTop:5
    },
    rightPhoneView: {
        width: screenWidth * 12 / 20,
        paddingLeft: 10,
        height: 80,
        justifyContent: 'center'
    },
    rightCallView: {
        width: screenWidth * 4 / 20,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomText: {
        color: '#999',
        fontSize: 12,
        marginTop: 5
    }
});
