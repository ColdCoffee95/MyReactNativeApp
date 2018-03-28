/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    Text,
    Modal,
    WebView
} from 'react-native';
import MyHTMLView from '../../components/common/HTMLView';
import Swiper from 'react-native-swiper'
import ActiveButton from '../../components/common/ActiveButton'
import ImageViewer from 'react-native-image-zoom-viewer';
type Props = {};
export default class GoodsDetail extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {goodsDetail: {}, isLoading: true, bigModalShow: false}
    }

    componentDidMount() {
        this.fetchData(this.props.navigation.state.params.id);
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        } else {
            let detail = this.state.goodsDetail;
            let swiperList = [];
            detail.nowImgs.map(value => {
                swiperList.push(
                    <TouchableHighlight underlayColor='#fff' onPress={() => this.lookBigBanner()}>
                        <View style={styles.slide} key={value.url}>
                            <Image
                                style={styles.banner}
                                resizeMode='contain'
                                source={{uri: value.url + '?imageView2/1/w/200/h/200'}}
                            />
                        </View>
                    </TouchableHighlight>
                )
            });
            let tradeNameText = null;
            switch (detail.tradeType) {
                case 1:
                    tradeNameText = <Text style={{color: '#78E285'}}>一般贸易</Text>;
                    break;
                case 2:
                    tradeNameText = <Text style={{color: '#C685FF'}}>保税区发货</Text>;
                    break;
                case 3:
                    tradeNameText = <Text style={{color: '#6086DE'}}>海外直邮</Text>;
                    break;
                default:
                    tradeNameText = <Text style={{color: '#78E285'}}>一般贸易</Text>;
                    break;
            }
            const htmlContent = `<html><head><style>img{width:100%;vertical-align:top}</style></head><body>${detail.goodsExtend.content}</body></html>`;
            return (
                <View contentContainerStyle={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <Swiper style={styles.swiper} width={screenWidth} height={screenWidth}>
                            {swiperList}
                        </Swiper>
                        <Modal visible={this.state.bigModalShow} transparent={true}>
                            <ImageViewer
                                imageUrls={detail.nowImgs}
                                saveToLocalByLongPress={true}
                                onClick={() => this.setState({bigModalShow: false})}
                                enableImageZoom={false}/>
                        </Modal>
                        <View style={styles.goodsSimpleView}>
                            <View>
                                <Text style={styles.titleText}>{detail.nowSku.title}</Text>
                            </View>
                            <View style={styles.buyInfoView}>
                                <View style={styles.tradeNameView}>
                                    {tradeNameText}
                                </View>
                                <View style={styles.shu}>
                                    <Text>|</Text>
                                </View>
                                <View>
                                    <Text>起订量:{detail.nowSku.mustBuyNum ? detail.nowSku.mustBuyNum : 1}</Text>
                                </View>
                            </View>
                            <View style={styles.priceView}>
                                <Text style={styles.priceLogo}>¥</Text>
                                <Text style={styles.price}>{detail.nowSku.marketPrice}</Text>
                            </View>
                        </View>
                        <View style={styles.goodsExtendView}>
                            <View>
                                <Text style={styles.goodsDescText}>商品描述</Text>
                                <View style={styles.goodsDescHtmlView}>
                                    {/*<MyHTMLView*/}
                                        {/*content={htmlContent}*/}
                                        {/*stylesheet={htmlStyles}*/}
                                    {/*/>*/}
                                    <WebView
                                        style={{
                                            backgroundColor: whiteColor,
                                            width:screenWidth,
                                            height:1000,
                                        }}
                                        scalesPageToFit={true}
                                        scrollEnabled={true}
                                        domStorageEnabled={true}
                                        source={{html:htmlContent}}
                                    />
                                </View>

                            </View>
                            <View style={styles.goodsSpecView}>
                                <Text>商品规格</Text>
                            </View>
                        </View>
                    </ScrollView>
                    {/*<View style={styles.bottomView}>*/}
                    {/*<ActiveButton*/}
                    {/*style={styles.addToCartBtn}*/}
                    {/*textStyle={styles.addToCartText}*/}
                    {/*text="加入进货单"*/}
                    {/*clickBtn={() => this.addToCart()}>*/}
                    {/*</ActiveButton>*/}
                    {/*<ActiveButton*/}
                    {/*style={styles.buyNowBtn}*/}
                    {/*textStyle={styles.buyNowText}*/}
                    {/*text="立即抢购"*/}
                    {/*clickBtn={() => this.props.buyNow({*/}
                    {/*firstId: this.state.currentFirstId,*/}
                    {/*secondIds: this.state.currentSecondIds*/}
                    {/*})}>*/}
                    {/*</ActiveButton>*/}
                    {/*</View>*/}
                </View>


            );
        }

    }

    lookBigBanner() {
        this.setState({bigModalShow: true});
    }

    addToCart() {

    }

    buyNow() {

    }

    fetchData(id) {
        HttpUtils.post('/goods/allGoodsInfo', {skuId: id}, data => {
            let detail = data.data;
            detail.skus = JSON.parse(detail.skus);
            detail.skus.map(value => {
                value.sku = JSON.parse(value.sku);
                if (value.id === id) {
                    detail.nowSku = value
                }
            });
            detail.spec = JSON.parse(detail.spec);
            detail.goodsExtend.annex = JSON.parse(detail.goodsExtend.annex);

            detail.goodsExtend.imgs = JSON.parse(detail.goodsExtend.imgs);
            detail.nowImgs = [];
            detail.nowImgs.push({url: detail.nowSku.img});
            detail.goodsExtend.imgs.map(value => {
                detail.nowImgs.push({url: value.url})
            });
            detail.totalSkus = [];//所有可用sku
            let specArr = [];
            detail.skus.map((value, i) => {
                detail.totalSkus.push(value.sku);
                if (i == 0) {
                    for (let j in detail.totalSkus[0]) {
                        specArr.push({specName: j, specValue: []});
                    }
                }
            });
            specArr.map(value => {
                detail.totalSkus.map(val => {
                    if (value.specValue.indexOf(val[value.specName]) === -1) {
                        value.specValue.push(val[value.specName]);
                    }
                });
            });
            detail.spec = specArr;
            this.state.goodsDetail = detail;
            console.warn('detail', this.state.goodsDetail)
            this.setState({isLoading: false})
        })
    }


}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,

    },
    scrollView: {
        backgroundColor: whiteColor,
        // paddingLeft:15,
        // paddingRight:15
    },
    swiper: {
        backgroundColor: whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide: {
        width: screenWidth,
        height: screenWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    banner: {
        width: screenWidth / 1.5,
        height: screenWidth / 1.5,
    },
    goodsSimpleView: {},

    titleText: {
        color:'#444',
        fontWeight:'bold'
    },
    buyInfoView: {
        flexDirection: 'row',
        marginTop: 5
    },
    priceView: {
        flexDirection: 'row',
        marginTop: 5,
        paddingBottom: 15,
        borderBottomColor: borderColor,
        borderBottomWidth: 1
    },
    priceLogo: {
        color: activeColor,
        alignSelf: 'flex-end'
    },
    price: {
        color: activeColor,
        fontSize: 20,
        marginLeft: 4
    },
    shu: {
        marginLeft: 5,
        marginRight: 5
    },
    tradeNameView: {
        backgroundColor: '#f7f7f7'
    },

    goodsExtendView: {
        marginTop: 15
    },
    goodsDescText:{
        color:'#444',
        fontWeight:'bold'
    },
    goodsDescHtmlView:{
      marginTop:10
    },

    addToCartBtn: {
        width: screenWidth / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor,
        borderTopColor: borderColor,
        borderTopWidth: 1,
        height: 30
    },
    buyNowBtn: {
        width: screenWidth / 2,
        backgroundColor: activeColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
    addToCartText: {
        color: activeColor
    },
    buyNowText: {
        color: whiteColor
    },
    bottomView: {
        position: 'absolute',
        width: screenWidth,
        height: 10,
        backgroundColor: '#000',
        bottom: 0,
        left: 0,

        flexDirection: 'row'
    }
});
