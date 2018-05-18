/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight,
    View
} from 'react-native';
type Props = {};
export default class PlatformPlate extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.activityTitle}>
                    <Image style={styles.imageLogo} resizeMode='contain' source={require('../../images/ptlogo.png')}/>
                    <Image style={styles.imageTitle} resizeMode='contain' source={require('../../images/ptword.png')}/>
                </View>
                <View style={styles.topTwoActivity}>
                    <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.milkCurrency()}>
                        <View>
                            <Image style={styles.topImg} resizeMode='contain'
                                   source={require('../../images/plat1.png')}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.diaperCurrency()}>
                        <View>
                            <Image style={styles.topImg} resizeMode='contain'
                                   source={require('../../images/plat2.png')}/>
                        </View>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight style={styles.lastThreeTouch} underlayColor='#f2f2f2' onPress={() => this.limitedPurchase()}>
                    <View>
                        <Image style={styles.lastActivityImg} resizeMode='contain'
                               source={require('../../images/plat3.png')}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.lastThreeTouch} underlayColor='#f2f2f2' onPress={() => this.brandSelection()}>
                    <View>
                        <Image style={styles.lastActivityImg} resizeMode='contain'
                               source={require('../../images/plat4.png')}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.lastThreeTouch} underlayColor='#f2f2f2' onPress={() => this.newSale()}>
                    <View>
                        <Image style={styles.lastActivityImg} resizeMode='contain'
                               source={require('../../images/plat5.png')}/>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    milkCurrency() {//跳转到奶粉通货
        this.props.navigation.navigate('MilkCurrency');
    }

    diaperCurrency() {//跳转到尿不湿通货
        this.props.navigation.navigate('DiaperCurrency');
    }

    limitedPurchase() {//跳转到限时抢购
        this.props.navigation.navigate('LimitedPurchase');
    }

    brandSelection() {//跳转到品牌精选
        this.props.navigation.navigate('BrandSelection');
    }

    newSale() {//跳转到新品特卖
        this.props.navigation.navigate('NewSale');
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    activityTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row'
    },
    imageLogo: {
        width: 18,
    },
    imageTitle: {
        width: 81,
        marginLeft: 10
    },
    topTwoActivity: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    topImg: {
        width: (screenWidth - 5) / 2,
        height: ((screenWidth - 5) / 2) * 260 / 375
    },
    lastThreeTouch:{
        marginTop: 5,

    },
    lastActivityImg: {
        width: screenWidth,
        height: 260 * screenWidth / 750
    }

});
