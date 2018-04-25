import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
import Counter from '../../components/common/Counter';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {observer} from 'mobx-react/native';
import {action, autorun, observe} from 'mobx';
import Toast, {DURATION} from 'react-native-easy-toast';

@observer
export default class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.itemData = this.props.itemData;
        this.data = this.props.data;
    }

    render() {
        return <View style={styles.cartItemView}>
            <TouchableHighlight underlayColor='#fff'
                                style={styles.iconTouch}
                                onPress={() => this.selectPress(this.itemData.goodsSkuId)}>
                <View>
                    {
                        this.itemData.itemSelect === 1 ?
                            (<Icon name="check-circle" size={20} color={activeColor}></Icon>) :
                            (<Icon2 name="checkbox-blank-circle-outline" size={20}></Icon2>)
                    }
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor='#f2f2f2'
                                style={styles.goodsTouch}
                                onPress={() => this.toGoodsDetail(this.itemData.goodsSkuId)}>
                <View style={styles.cartGoodsView}>
                    <View style={styles.cartGoodsImgView}>
                        <Image
                            source={{uri: this.itemData.goodsImg + '?imageView2/1/w/200/h/200'}}
                            resizeMode='contain'
                            style={styles.cartGoodsImg}
                        />
                    </View>
                    <View style={styles.cartGoodsInfoView}>
                        <Text style={styles.cartGoodsTitle}
                              numberOfLines={2}>{this.itemData.goodsTitle}</Text>
                        <View style={styles.skuView}>
                            <Text numberOfLines={2} style={styles.cartSku}>{this.itemData.sku}</Text>
                            <Text style={styles.cartEms}>运费:¥{this.itemData.emsPrice}</Text>
                        </View>

                        <View style={styles.priceNumberView}>
                            <Text style={styles.priceText}>¥{this.itemData.putPrice}</Text>
                            {
                                this.props.navigation.state.params && this.props.navigation.state.params.isEditing &&
                                <View style={styles.counterView}>
                                    <Counter
                                        onChangeNum={(num) => this.changeNumber(this.itemData.goodsSkuId,num)}
                                        value={this.itemData.number}
                                        max={this.itemData.count}
                                        min={this.itemData.mustBuyNum || 1}
                                        steps={this.itemData.mustBuyNum || 1}
                                        sellout={this.itemData.count === 0 || this.itemData.count < this.itemData.mustBuyNum}
                                        toast={this.refs.toast}>
                                    </Counter>
                                </View>
                            }
                            {
                                this.props.navigation.state.params && !this.props.navigation.state.params.isEditing &&
                                <Text>×{this.itemData.number}</Text>
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
            <Toast ref='toast' position='center'></Toast>
        </View>
    }

    toGoodsDetail(id) {
        this.props.navigation.navigate('GoodsDetail', {id: id});
    }
    @action
    changeNumber = (id,number)=>{
        this.props.data.changeNumber(id,number);
    };

    @action
    selectPress = (id) => {
        this.props.data.itemPress(id);
    };
}
const styles = StyleSheet.create({

    cartItemView: {
        flexDirection: 'row',
        width: screenWidth,
        alignItems: 'center',
        backgroundColor: whiteColor,
        marginBottom: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    cartGoodsImgView: {
        width: screenWidth * 0.25,
        height: screenWidth * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: borderColor
    },
    counterView:{
        alignItems:'center',
        justifyContent:'center',
    },
    cartGoodsImg: {
        width: screenWidth * 0.25,
        height: screenWidth * 0.25
    },
    iconTouch: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    goodsTouch: {
        flex: 0.9
    },
    cartGoodsView: {
        flexDirection: 'row'
    },
    cartGoodsInfoView: {
        justifyContent: 'space-between',
        width: screenWidth * 0.65,
        paddingLeft: 10,
        paddingRight: 10
    },
    cartGoodsTitle: {
    },
    priceNumberView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    priceText: {
        color: activeColor
    },
    skuView:{
    },
    cartSku: {
        color: '#ababab',
        fontSize:12
    },
    cartEms: {
        color: '#ababab',
        fontSize:12
    }
});