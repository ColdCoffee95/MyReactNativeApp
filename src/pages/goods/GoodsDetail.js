import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    Keyboard,
    Modal,
} from 'react-native';
import AutoHeightWebview from 'react-native-autoheight-webview';
import Swiper from 'react-native-swiper';
import ActiveButton from '../../components/common/ActiveButton';
import ImageViewer from 'react-native-image-zoom-viewer';
import PopupDialog, {SlideAnimation} from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import Counter from '../../components/common/Counter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast, {DURATION} from 'react-native-easy-toast';
import HttpUtils from "../../utils/http";

type Props = {};
export default class GoodsDetail extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            goodsDetail: {},
            isLoading: true,
            bigModalShow: false,
            popoverVisible: false,
            buyNum: 0,
            currentSku: {},
            buyType: 1//1是加入进货单，2是立即抢购
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({toCart: this.jumpToCart.bind(this), collect: this.collect.bind(this)});
        this.fetchData(this.props.navigation.state.params.id);
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight: (
            <View style={styles.headerRightView}>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.state.params.collect()}>
                    <View>
                        <Icon name='heart' size={20} color='black'></Icon>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.state.params.toCart()}>
                    <View>
                        <Icon name='shopping-cart' size={20} color='black'></Icon>
                    </View>
                </TouchableOpacity>
            </View>)
    });

    render() {
        if (this.state.isLoading) {
            return <View style={styles.loadingContainer}>
                <ActivityIndicator></ActivityIndicator>
            </View>
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
            let basicAttrView = <View></View>;//基本属性view
            let basicAttr = [];
            // detail.goodsExtend.annex.map(value => {
            //     basicAttr.push(
            //         <View style={styles.basicAttrView}>
            //             <Text style={styles.basicAttrName}>{value.name}</Text>
            //             <Text style={styles.basicAttrValue}>{value.value}</Text>
            //         </View>
            //     )
            // });
            if (basicAttr.length > 0) {
                basicAttrView = (<View>
                    <Text style={styles.goodsSpecText}>商品规格</Text>
                    {basicAttr}
                </View>);
            }

            let goodsContentView = <View></View>;
            if (detail.goodsExtend && detail.goodsExtend.content) {
                let htmlContent = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>${detail.goodsExtend.content}</body></html>`;
                goodsContentView = <View>
                    <Text style={styles.goodsDescText}>商品描述</Text>
                    <View style={styles.goodsDescHtmlView}>
                        <AutoHeightWebview
                            source={{html: htmlContent}}
                            customStyle={`
                                          img {
                                            width:100%;
                                            vertical-align:top
                                          }
                                        `}
                        />
                    </View>
                </View>
            }
            let specView = [];

            detail.spec.map(s => {
                let specValue = [];
                s.specValue.map(p => {
                    specValue.push(
                        <TouchableHighlight style={styles.specValueTouch} underlayColor='#f2f2f2'
                                            onPress={() => this.changeSpec(s.specName, p)}>
                            <View
                                key={(index) => index}
                                style={JSON.parse(this.state.currentSku)[s.specName] == p ? styles.activeSku : styles.negativeSku}>
                                <Text
                                    style={JSON.parse(this.state.currentSku)[s.specName] == p ? styles.activeSkuText : styles.negativeSkuText}>{p}</Text>
                            </View>
                        </TouchableHighlight>
                    )
                });
                specView.push(
                    <View key={(index) => index} style={styles.specView}>
                        <Text>{s.specName}</Text>
                        <View style={styles.skuView}>
                            {specValue}
                        </View>
                    </View>
                )
            });
            specView.push(
                <View style={styles.numView}>
                    <Text>数量(库存剩余：{detail.nowSku.count})</Text>
                    <View style={styles.counterView}>
                        <Counter
                            onChangeNum={(num) => this.setState({buyNum: num})}
                            value={detail.nowSku.mustBuyNum || 1}
                            max={detail.nowSku.count}
                            min={detail.nowSku.mustBuyNum || 1}
                            steps={detail.nowSku.mustBuyNum || 1}
                            sellout={detail.nowSku.count === 0 || detail.nowSku.count < detail.nowSku.mustBuyNum}
                            toast={this.refs.toast}>

                        </Counter>
                    </View>
                </View>
            );

            return (
                <View style={styles.container}>
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
                                    <Text style={{color: this.getColor(detail.tradeType)}}>{detail.tradeName}</Text>
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
                            {basicAttrView}
                            {goodsContentView}
                        </View>

                    </ScrollView>
                    <View style={styles.bottomView}>
                        <ActiveButton
                            style={styles.addToCartBtn}
                            textStyle={styles.addToCartText}
                            text="加入进货单"
                            clickBtn={() => this.showPopup(1)}>
                        </ActiveButton>
                        <ActiveButton
                            style={styles.buyNowBtn}
                            textStyle={styles.buyNowText}
                            text="立即抢购"
                            clickBtn={() => this.showPopup(2)}>
                        </ActiveButton>
                    </View>

                    <PopupDialog
                        ref={(popupDialog) => {
                            this.popupDialog = popupDialog;
                        }}
                        dialogStyle={{borderRadius: 0, height: screenHeight * 0.7, position: 'absolute', bottom: 65}}
                        dialogAnimation={slideAnimation}
                        onDismissed={() => Keyboard.dismiss()}
                    >
                        <View style={styles.dialogWrapper}>
                            <View style={styles.popupHeader}>
                                <View style={styles.popupPriceImg}>
                                    <View style={styles.popupImgWrapper}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.popupImg}
                                            source={{uri: detail.nowSku.img + '?imageView2/1/w/80/h/80'}}/>

                                    </View>
                                    <View style={styles.popupPrice}>
                                        <Text style={styles.popupMarketPrice}>¥{detail.nowSku.marketPrice}</Text>
                                        <Text>运费：¥{detail.nowSku.emsPrice}</Text>
                                    </View>
                                </View>
                                <TouchableHighlight underlayColor='#fff' onPress={() => this.closePopover()}>
                                    <Icon size={16} name='times-circle'></Icon>
                                </TouchableHighlight>
                            </View>
                            <KeyboardAwareScrollView
                                contentContainerStyle={styles.popupScrollView}
                                keyboardDismissMode='on-drag'
                                showsVerticalScrollIndicator={true}>
                                {specView}
                            </KeyboardAwareScrollView>
                            <ActiveButton
                                style={detail.nowSku.count > 0 ? styles.popupSureActive : styles.popupSureNegative}
                                textStyle={styles.popupSureText}
                                text="确定"
                                clickBtn={() => this.sureAdd()}>
                            </ActiveButton>
                        </View>

                    </PopupDialog>

                    <Toast ref='toast' position='top'></Toast>

                </View>


            );
        }

    }

    lookBigBanner() {
        this.setState({bigModalShow: true});
    }

    jumpToCart() {
        this.props.navigation.navigate('Cart', {type: this.state.goodsDetail.tradeType});
    }

    collect() {//收藏
        console.warn(this.state.goodsDetail.nowSku)
    }

    changeSpec(specName, specValue) {
        //改变规格
        let detail = this.state.goodsDetail;
        let currentSku = JSON.parse(this.state.currentSku);
        currentSku[specName] = specValue;
        this.state.currentSku = JSON.stringify(currentSku);
        detail.skus.map(value => {
            if (JSON.stringify(value.sku) == this.state.currentSku) {
                this.fetchData(value.id);
            }
        });
    }

    sureAdd() {//点击确定
        if (this.state.buyType === 1) {
            this.addToCart();
        } else {
            this.currentBuy();
        }
    }

    getValidationState() {
        return new Promise((resolve, reject) => {
            storage.load({key: 'userInfo'}).then(res => {
                resolve(res.authentication);
            }).catch(e => {
                if (e.name == 'NotFoundError') {
                    resolve(0)
                }
            })
        })
    }

    async addToCart() {//添加到进货单
        let validationState = await this.getValidationState();
        if (validationState != 1) {
            this.refs.toast.show('审核通过前不允许下单！', 500);
            return;
        }

        let detail = this.state.goodsDetail;
        let nowSku = detail.nowSku;
        if (nowSku.count === 0) {
            this.refs.toast.show('该商品库存不足，无法下单！', 500);
            return;
        }
        let params = {
            goodsImg: nowSku.img,
            goodsSku: JSON.stringify(nowSku.sku),
            goodsSkuId: nowSku.id,
            goodsTitle: nowSku.title,
            number: this.state.buyNum,
            putPrice: nowSku.marketPrice,
            sellerId: detail.brandId,
            sellerName: detail.brandName,
            tradeName: nowSku.tradeName,
            tradeType: nowSku.tradeType,
            categoryId: detail.catId,
            categoryName: detail.catName
        };
        HttpUtils.post('/shoppingCart/putGoodsInCart', params, data => {
            this.refs.toast.show('加入进货单成功', 500);
            this.closePopover();
        })
    }

    async currentBuy() {//立即抢购
        let validationState = await this.getValidationState();
        if (validationState != 1) {
            this.refs.toast.show('审核通过前不允许下单！', 500);
            return;
        }

        let detail = this.state.goodsDetail;
        let nowSku = detail.nowSku;
        if (nowSku.count === 0) {
            this.refs.toast.show('该商品库存不足，无法下单！', 500);
            return;
        }
        let params = {
            goodsImg: nowSku.img,
            goodsSku: JSON.stringify(nowSku.sku),
            goodsSkuId: nowSku.id,
            goodsTitle: nowSku.title,
            number: this.state.buyNum,
            putPrice: nowSku.marketPrice,
            sellerId: detail.brandId,
            sellerName: detail.brandName,
            tradeName: nowSku.tradeName,
            tradeType: nowSku.tradeType,
            categoryId: detail.catId,
            categoryName: detail.catName
        };
        HttpUtils.post('/shoppingCart/putGoodsInCart', params, data => {
            this.closePopover();
            params.cartId = data.data;
            this.props.navigation.navigate('ConfirmOrder', {cartList: [params], tradeType: nowSku.tradeType});
        })
    }

    showPopup(type) {//显示popup
        this.popupDialog.show(() => {
            this.state.buyType = type;
        });
    }

    closePopover() {
        this.popupDialog.dismiss(() => {
        });
    }

    getColor(type) {
        let color = '#78E285';
        cartTabList.map(value => {
            if (value.id === type) {
                color = value.color;
            }
        });
        return color;
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
            console.warn(detail);
            console.warn(detail.goodsExtend.imgs);
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
            this.state.currentSku = JSON.stringify(detail.nowSku.sku);
            console.warn('detail', this.state.goodsDetail)
            this.setState({isLoading: false})
        })
    }


}
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    headerRightView: {
        flexDirection: 'row'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogWrapper: {
        width: screenWidth,
        height: screenHeight * 0.7,
        justifyContent: 'space-between',
    },
    numView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    specView: {
        marginTop: 10,
    },
    counterView: {},
    popupScrollView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    popupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        height: 70,
    },
    popupPriceImg: {
        flexDirection: 'row',
    },
    popupImgWrapper: {
        borderColor: borderColor,
        borderWidth: 1,
        padding: 10,
        position: 'absolute',
        backgroundColor: whiteColor,
        top: -30
    },
    popupImg: {
        width: 60,
        height: 60
    },
    popupMarketPrice: {
        color: activeColor
    },
    popupPrice: {
        position: 'absolute',
        left: 100
    },
    popupSureActive: {
        width: screenWidth,
        backgroundColor: activeColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    popupSureNegative: {
        width: screenWidth,
        backgroundColor: 'darkgray',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    skuView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    specValueTouch: {
        marginTop: 10,
        marginLeft: 10
    },
    activeSku: {
        backgroundColor: activeColor,
        borderWidth: 1,
        borderColor: borderColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,

    },
    activeSkuText: {
        color: whiteColor
    },
    negativeSku: {
        backgroundColor: whiteColor,
        borderWidth: 1,
        borderColor: borderColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
    },
    negativeSkuText: {
        color: '#494949'
    },
    popupSureText: {
        color: whiteColor
    },
    popupBottomView: {
        position: 'absolute',
        width: screenWidth,
        height: 40,
        backgroundColor: '#000',
        bottom: 0,
        left: 0,
        right: 0,
    },
    scrollView: {
        backgroundColor: whiteColor,

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
    goodsSimpleView: {
        paddingLeft: 15,
        paddingRight: 15
    },

    titleText: {
        color: '#444',
        fontWeight: 'bold'
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
        backgroundColor: '#f7f7f7',
        paddingLeft: 5,
        paddingRight: 5
    },
    basicAttrView: {
        flexDirection: 'row'
    },
    basicAttrName: {
        width: 100,
        color: '#ababab'
    },
    basicAttrValue: {
        marginLeft: 20
    },
    goodsExtendView: {
        marginTop: 15
    },
    goodsDescText: {
        color: '#444',
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingRight: 15
    },
    goodsDescHtmlView: {
        marginTop: 10
    },
    goodsSpecText: {
        color: '#444',
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingRight: 15
    },
    goodsSpecView: {
        marginTop: 10
    },

    addToCartBtn: {
        width: screenWidth / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor,
        borderTopColor: borderColor,
        borderTopWidth: 1,
        height: 40
    },
    buyNowBtn: {
        width: screenWidth / 2,
        backgroundColor: activeColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
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
        height: 40,
        backgroundColor: whiteColor,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row'
    }
});