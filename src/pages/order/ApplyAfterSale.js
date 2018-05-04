/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    View
} from 'react-native';
import ActiveButton from '../../components/common/ActiveButton';
import UploadMultiImg from '../../components/common/UploadMultiImg';
import Text from '../../components/common/MyText';
import TextInput from '../../components/common/MyTextInput';
type Props = {};
export default class ApplyAfterSale extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            orderInfo: {},
            comment: '',
            orderAftersalesVoucherList: []
        }
    }

    componentDidMount() {
        this.setState({orderInfo: this.props.navigation.state.params.orderInfo, isLoading: false});
    }

    render() {
        if (this.state.isLoading) {
            return <View/>
        } else {
            const {orderInfo, orderTypes} = this.state;
            let goodsList = [];
            orderInfo.orderItemList.map(value => {
                goodsList.push(
                    <View style={styles.goodsView}>
                        <View style={styles.goodsImgView}>
                            <Image
                                source={{uri: value.goodsImg + '?imageMogr2/thumbnail/400x400'}}
                                resizeMode='contain'
                                style={styles.goodsImg}
                            />
                        </View>
                        <View style={styles.goodsInfoView}>
                            <Text style={styles.goodsTitle}
                                  numberOfLines={2}>{value.goodsTitle}</Text>
                            <View>
                                <Text style={styles.sku}>{value.sku}</Text>
                            </View>

                            <View style={styles.priceNumberView}>
                                <Text style={styles.priceText}>¥{value.putPrice}</Text>
                                <Text>×{value.number}</Text>
                            </View>
                        </View>
                    </View>
                )
            });
            return <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.itemView}>
                            <Text>退货商品</Text>
                        </View>
                        <View style={styles.goodsWrapper}>
                            {goodsList}
                        </View>
                        <View style={styles.itemView}>
                            <Text>申请原因</Text>
                        </View>
                        <View style={styles.sugMessageView}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({comment: text})}
                                maxLength={200}
                                returnKeyType='done'
                                multiline={true}
                                underlineColorAndroid='transparent'
                                placeholder='请输入申请原因(200字以内)'>
                            </TextInput>
                        </View>
                        <View style={styles.itemView}>
                            <Text>上传凭证</Text>

                        </View>
                        <UploadMultiImg
                            onChange={(imgs) => this.setState({orderAftersalesVoucherList: imgs})}>
                        </UploadMultiImg>
                    </ScrollView>

                    <View style={styles.bottomBtnView}>
                        <ActiveButton clickBtn={() => this.submit()} text='提交'
                                      style={styles.activeButton}></ActiveButton>
                    </View>
                </View>
            </SafeAreaView>
        }

    }


    submit() {
        const {orderInfo, comment, orderAftersalesVoucherList} = this.state;
        let params = {
            orderId: orderInfo.orderId,
            goodsInfo: orderInfo.orderItemList,
            comment: comment.trim(),
            orderAftersalesVoucherList: orderAftersalesVoucherList
        };
        if (!params.comment) {
            ToastUtil.show('请填写申请原因');
            return;
        }
        HttpUtils.post('/order/createOrderAftersales', params, data => {
            ToastUtil.show('申请成功，请等待处理');
            const {navigate, goBack, state} = this.props.navigation;
            state.params.goBack();
            goBack();
        })
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteColor,
        flex: 1,

    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        paddingBottom: 50
    },
    textInput: {
        width: screenWidth * 0.9,
        lineHeight: 20,
        padding: 5,
    },
    goodsWrapper: {
        backgroundColor: '#f8f8f8',
    },
    goodsView: {
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    sugMessageView: {
        alignItems: 'center',
        width: screenWidth - 20,
        height: 100,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        marginLeft: 10,
        marginRight: 10,
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
    itemView: {
        padding: 12
    },
    img: {
        width: 60,
        height: 60,
    },
    imgView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    imgWrapper: {
        marginLeft: 10,
    },
    bottomBtnView: {
        position: 'absolute',
        bottom: 0
    },
    activeButton: {
        backgroundColor: activeColor,
        alignItems: 'center',
        width: screenWidth,
        padding: 10,
    },
});
