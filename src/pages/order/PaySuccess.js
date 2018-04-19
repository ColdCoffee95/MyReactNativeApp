/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    View
} from 'react-native';
import ActiveButton from '../../components/common/ActiveButton';
import LoadingView from '../../components/common/LoadingView';

type Props = {};
export default class PaySuccess extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            type: '',//weixin,alipay
        };
    }

    componentDidMount() {
        this.state.type = this.props.navigation.state.params.type;
        this.setState({isLoading: false});
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView/>
        } else {
            return <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <View style={styles.imgView}>
                        {
                            this.state.type === 'weixin' && <Image
                                resizeMode='contain'
                                style={styles.img}
                                source={require('../../images/weixinSuccess.jpg')}/>
                        }
                        {
                            this.state.type === 'alipay' && <Image
                                resizeMode='contain'
                                style={styles.img}
                                source={require('../../images/aliSuccess.jpg')}/>
                        }
                        <Text style={styles.successText}>支付成功</Text>
                    </View>
                    <View style={styles.btnView}>
                        <ActiveButton
                            text='返回订单列表'
                            style={this.state.type === 'weixin' ? styles.wxBackOrderBtn : styles.alBackOrderBtn}
                            textStyle={styles.accountsBtnText}
                            clickBtn={() => {
                                this.backToOrder()
                            }}>

                        </ActiveButton>
                        <ActiveButton
                            text='返回首页'
                            style={styles.backHomeBtn}
                            textStyle={styles.backHomeText}
                            clickBtn={() => {
                                this.backToHome()
                            }}>

                        </ActiveButton>
                    </View>
                </View>
            </SafeAreaView>
        }
    }

    backToOrder() {
        jumpAndClear(this.props.navigation, 'Order');
    }

    backToHome() {
        jumpAndClear(this.props.navigation, 'Main');
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteColor,
        flex: 1,

    },
    imgView: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    img: {
        width: 100,
        height: 100
    },
    successText: {
        marginTop: 30,
        fontSize: 20
    },
    btnView: {
        alignItems: 'center'
    },
    alBackOrderBtn: {
        backgroundColor: '#56abe4',
        alignItems: 'center',
        width: screenWidth * 0.9,
        padding: 10,
        borderRadius: 5
    },
    wxBackOrderBtn: {
        backgroundColor: '#1fb922',
        alignItems: 'center',
        width: screenWidth * 0.9,
        padding: 10,
        borderRadius: 5
    },
    accountsBtnText: {
        color: whiteColor
    },
    backHomeBtn: {
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        width: screenWidth * 0.9,
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    backHomeText: {
        color: 'black'
    }
});
