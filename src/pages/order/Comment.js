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
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    View,
    Image,
    Alert
} from 'react-native';
import UploadMultiImg from '../../components/common/UploadMultiImg'
import ActiveButton from '../../components/common/ActiveButton'
import Toast, {DURATION} from 'react-native-easy-toast';
import HttpUtils from "../../utils/http";

type Props = {};

export default class Feedback extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            revNice: 0,//配送速度1-5
            logNice: 0,//服务速度1-5
            goodsStar: 0,//商品质量1-5
            userStar: 1,//用户评级123好一般差
            userMessage: '',
            orderId: props.navigation.state.params.orderId,
            isLoading: true,
            orderInfo: {}
        };
    }

    static navigationOptions = ({navigation, screenProps}) => ({

        headerRight: <View style={styles.headerRightView}>
            <TouchableOpacity style={{marginRight: 10}}
                              onPress={() => navigation.state.params.submit()}>
                <View>
                    <Text style={{color: 'black'}}>发布</Text>
                </View>
            </TouchableOpacity>
        </View>
    });

    componentDidMount() {
        this.props.navigation.setParams({submit: this.submit.bind(this)});
        this.fetchData();
    }

    render() {
        const {orderInfo, isLoading, userStar} = this.state;
        if (isLoading) {
            return <ActivityIndicator/>
        } else {
            let goodsView = [];
            let goodsList = orderInfo.orderItemList;
            goodsList.map(value => {
                goodsView.push(
                    <View style={styles.goodsView}>
                        <View style={styles.goodsImgView}>
                            <Image
                                source={{uri: value.goodsImg + '?imageView2/1/w/200/h/200'}}
                                resizeMode='contain'
                                style={styles.goodsImg}
                            />
                        </View>
                        <View style={styles.goodsInfoView}>
                            <Text style={styles.goodsTitle}
                                  numberOfLines={2}>{value.goodsTitle}</Text>
                            <View style={styles.priceNumberView}>
                                <Text style={styles.priceText}>¥{value.putPrice}</Text>
                                <Text>×{value.number}</Text>
                            </View>
                        </View>
                    </View>
                )
            })
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    {goodsView}
                    <View style={styles.tabView}>
                        <TouchableHighlight
                            onPress={() => this.setState({userStar: 1})}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text
                                    style={userStar === 1 ? styles.activeTab : styles.negativeTab}>好评</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.setState({userStar: 2})}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text
                                    style={userStar === 2 ? styles.activeTab : styles.negativeTab}>一般</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.setState({userStar: 3})}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text
                                    style={userStar === 3 ? styles.activeTab : styles.negativeTab}>差评</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.firstContainer}>
                        <View style={styles.sugMessageView}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({userMessage: text})}
                                maxLength={140}
                                multiline={true}
                                underlineColorAndroid='transparent'
                                placeholder='货物满足您的期待吗？说说你的使用心得，分享给想买的他们吧(140字以内)'>
                            </TextInput>
                        </View>
                    </View>

                    <Toast ref='toast' position='center'></Toast>
                </ScrollView>
            );
        }

    }

    submit() {
        let {revNice, logNice, goodsStar, userStar, userMessage, orderId} = this.state;
        let params = {
            revNice: revNice,
            logNice: logNice,
            goodsStar: goodsStar,
            userStar: userStar,
            userMessage: userMessage,
            orderId: orderId
        };
        HttpUtils.post('/reviews/revgoods', params, data => {
            this.refs.toast.show('评价成功!', 300, () => {
                const {navigate, goBack, state} = this.props.navigation;
                state.params.goBack();
                goBack();
            });
        })
    }

    fetchData() {
        HttpUtils.post('/order/viewOrderInfo', {orderId: this.state.orderId}, data => {
            let orderInfo = data.data;
            let goodsList = orderInfo.orderItemList;
            goodsList.map(value => {
                let sku = JSON.parse(value.goodsSku);
                let skuStr = '';
                for (let key in sku) {
                    skuStr += `${key}:${sku[key]},`
                }
                skuStr = skuStr.substr(0, skuStr.length - 1);
                value.sku = skuStr;
                this.setState({orderInfo: orderInfo, isLoading: false});
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    btnContainer: {
        alignItems: 'center',
        width: screenWidth,
        height: 100
    },
    tabView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: screenWidth,
        backgroundColor: whiteColor,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    singleTab: {
        width: screenWidth / 3,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        color: activeColor
    },
    negativeTab: {
        color: '#444'
    },
    problemTitle: {
        padding: 15
    },
    firstContainer: {
        backgroundColor: whiteColor
    },
    underlineStyle: {
        backgroundColor: activeColor
    },
    problemWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    activeProblemView: {
        backgroundColor: activeColor,
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    activeProblemText: {
        color: whiteColor,
        fontSize: 12
    },
    problemView: {
        backgroundColor: '#f2f2f2',
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    problemText: {
        color: '#000',
        fontSize: 12
    },
    sugMessageView: {
        marginTop: 20,
        alignItems: 'center',
        width: screenWidth - 20,
        height: 100,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        margin: 10,
    },
    textInput: {
        width: screenWidth * 0.9,
        lineHeight: 20,
        padding: 5
    },
    submitView: {
        backgroundColor: activeColor,
        marginTop: 20,
        alignItems: 'center',
        width: screenWidth * 0.6,
        padding: 10,
        borderRadius: 5
    },
    submitText: {
        color: whiteColor
    },
    consult: {
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        marginBottom: 20
    },
    activeButton: {
        backgroundColor: activeColor,
        marginTop: 20,
        alignItems: 'center',
        width: screenWidth * 0.6,
        padding: 10,
        borderRadius: 5
    },
    hotlineView: {
        borderWidth: 1,
        borderColor: borderColor,
        padding: 10,
        width: screenWidth - 40,
        alignItems: 'center'
    },
    goodsView: {
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: borderColor,
        borderBottomWidth: 1
    },
    goodsImgView: {
        width: screenWidth * 0.25,
        height: screenWidth * 0.25,
        marginLeft: screenWidth * 0.05,
        borderWidth: 1,
        borderColor: borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    goodsImg: {
        width: 80,
        height: 80
    },
    goodsInfoView: {
        justifyContent: 'space-between',
        height: screenWidth * 0.25,
        width: screenWidth * 0.7,
        paddingLeft: 10,
        paddingRight: 10
    },
    goodsTitle: {},
    priceNumberView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceText: {
        color: activeColor
    },
    sku: {
        color: '#ababab'
    },
    ems: {
        color: '#ababab'
    },
});
