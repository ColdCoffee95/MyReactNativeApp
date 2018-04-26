/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveButton from '../../components/common/ActiveButton';

type Props = {};

export default class SelectCoupon extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            couponList: {},
            couponType: 1,
            ableSize: 0,
            disableSize: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        let list = null;
        const {canUseNum, couponType, couponList, ableSize, disableSize} = this.state;
        let listView = null;
        if (!this.state.isLoading) {
            if (couponType === 1) {
                list = couponList.able.ableList;
            } else {
                list = couponList.disable.disableList;
            }
            let otherList = [];
            list.map(value => {
                let cutType = cutTypes.find(type => type.value == value.amountRuleType).name;
                otherList.push(
                    <View style={styles.couponWrapper}>
                        <TouchableOpacity onPress={() => this.useCoupon(value)}>
                            <View style={styles.backImgView}>
                                {
                                    value.couponType === 'all' && couponType !== 4 && <Image
                                        resizeMode='contain'
                                        style={styles.backImg}
                                        source={require('../../images/commonCoupon.png')}
                                    />
                                }
                                {
                                    value.couponType !== 'all' && couponType !== 4 && <Image
                                        resizeMode='contain'
                                        style={styles.backImg}
                                        source={require('../../images/assignCoupon.png')}
                                    />
                                }
                                {
                                    couponType === 4 && <Image
                                        resizeMode='contain'
                                        style={styles.backImg}
                                        source={require('../../images/expire.png')}
                                    />
                                }
                                <View style={styles.couponView}>
                                    <View style={styles.couponLeftView}>
                                        <View style={styles.couponLeftAmount}>
                                            <Text style={{color: whiteColor, fontSize: 16}}>¥</Text>
                                            <Text
                                                style={{
                                                    color: whiteColor,
                                                    fontSize: 30
                                                }}>{value.amountRuleTotal}</Text>
                                            {
                                                value.amountRuleType === 'discount' &&
                                                <Text style={{color: whiteColor, fontSize: 16}}>最高</Text>
                                            }
                                        </View>
                                        {
                                            value.amountRuleType === 'full-cut' &&
                                            <View style={styles.couponLeftLimit}>
                                                <Text numberOfLines={1} style={{
                                                    color: whiteColor,
                                                    fontSize: 14
                                                }}>满{value.amount}可用</Text>
                                            </View>
                                        }
                                        {
                                            value.amountRuleType !== 'full-cut' &&
                                            <View style={styles.couponLeftLimit}>
                                                <Text numberOfLines={1} style={{
                                                    color: whiteColor,
                                                    fontSize: 14
                                                }}>不限金额</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.couponInfoView}>
                                        <View style={styles.couponInfoTop}>
                                            {
                                                couponType !== 4 && <Text style={styles.cutType}>{cutType}</Text>
                                            }
                                            {
                                                couponType === 4 && <Text style={styles.cutTypeExpire}>{cutType}</Text>
                                            }
                                            <Text style={styles.couponName}>{value.couponName}</Text>
                                        </View>
                                        <Text style={{color: '#ababab', fontSize: 12}}>{value.amountRuleName}</Text>
                                        {
                                            value.dateRuleType === 'fixed-days' &&
                                            <Text style={{color: '#ababab', fontSize: 12}}>
                                                有效时间：领取后{value.days}天内
                                            </Text>
                                        }
                                        {
                                            value.dateRuleType === 'time-interval' &&
                                            <Text style={{color: '#ababab', fontSize: 12}}>
                                                有效时间：{dateFormat(value.startTime)}~{dateFormat(value.endTime)}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>


                        {
                            value.couponType === 'all' && <View style={styles.couponLimitView}>
                                <Text>全分类商品适用</Text>
                            </View>
                        }
                        {
                            value.couponType !== 'all' && <TouchableOpacity onPress={() => {
                                value.toggle = !value.toggle;

                                this.setState({couponList: couponList});

                            }}>
                                <View style={styles.couponLimitView}>
                                    <View style={styles.limitTopView}>
                                        <Text>以下指定分类商品适用</Text>
                                        {
                                            !value.toggle && <Icon name='angle-down' size={20}></Icon>
                                        }
                                        {
                                            value.toggle && <Icon name='angle-up' size={20}></Icon>
                                        }
                                    </View>
                                    {
                                        value.toggle && <View style={styles.limitBottomView}>
                                            {
                                                value.brandRuleName && <Text>品牌：{value.brandRuleName}</Text>
                                            }
                                            {
                                                value.couponCategoryNames &&
                                                <Text>分类：{value.couponCategoryNames}</Text>
                                            }
                                        </View>
                                    }

                                </View>
                            </TouchableOpacity>
                        }

                    </View>
                )
            });
            listView = otherList;
        }
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.tabView}>
                        <TouchableOpacity
                            onPress={() => this.changeTab(1)}>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.couponType === 1 ? styles.activeTab : styles.negativeTab}>可用优惠券({ableSize})</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.changeTab(2)}>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.couponType === 2 ? styles.activeTab : styles.negativeTab}>不可用优惠券({disableSize})</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        !this.state.isLoading && <ScrollView contentContainerStyle={styles.scrollView}>
                            {listView}
                        </ScrollView>
                    }
                    <View style={styles.bottomView}>
                        <ActiveButton
                            text='不使用优惠券'
                            style={styles.accountsBtn}
                            textStyle={styles.accountsBtnText}
                            clickBtn={() => {
                                this.notUse()
                            }}>
                        </ActiveButton>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    async fetchData() {
        this.getCouponList();
    }

    getCouponList() {//获取可领取优惠券列表
        this.setState({isLoading: true});
        console.warn(this.props.navigation.state.params.cartList)
        HttpUtils.post('/memberCouponInfo/selectCanUseCouponListByGoodsList', {goodsList: this.props.navigation.state.params.cartList}, data => {
            let list = data.data;
            list.able.ableList.map(value => {
                value.toggle = false;
            });
            list.disable.disableList.map(value => {
                value.toggle = false;
            });
            this.setState({
                couponList: list,
                isLoading: false,
                ableSize: list.able.ableSize,
                disableSize: list.disable.disableSize
            });
        })
    }

    notUse() {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.callback({});
        goBack();
    }

    changeTab(id) {
        this.setState({couponType: id});
    }

    useCoupon(coupon) {
        const {couponList} = this.state;
        let able = couponList.able.ableList.find(value => value.id === coupon.id);
        if (able) {
            const {navigate, goBack, state} = this.props.navigation;
            state.params.callback(coupon);
            goBack();
        } else {
            ToastUtil.show('该优惠券不符合使用条件');
        }
    }

    couponGoBack() {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.goBack();
        goBack();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    couponWrapper: {
        width: screenWidth * 0.9,
        marginTop: 10,
    },
    couponName: {
        fontSize: 12
    },
    cutType: {
        backgroundColor: activeColor,
        color: whiteColor,
        marginRight: 10,
        padding: 4
    },
    cutTypeExpire: {
        backgroundColor: '#ababab',
        color: whiteColor,
        marginRight: 10,
        padding: 4
    },
    listWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    couponInfoTop: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    couponInfoView: {
        width: 0.6 * screenWidth * 0.9,
        height: 120 * screenWidth * 0.9 / 374,
        justifyContent: 'space-between',
        padding: 15

    },
    couponLeftView: {
        width: 0.3 * screenWidth * 0.9,
        height: 120 * screenWidth * 0.9 / 374,
        alignItems: 'center',
        justifyContent: 'center',
    },
    couponLeftAmount: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    couponLeftLimit: {
        marginTop: 20,
        alignItems: 'center'
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        height: 46,
        backgroundColor: whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    accountsBtn: {
        backgroundColor: whiteColor,
        alignItems: 'center',
        width: screenWidth,
        height: 46,
        justifyContent: 'center'
    },
    accountsBtnText: {
        fontSize: 16,
        color: 'black'
    },
    backImg: {
        width: screenWidth * 0.9,
        height: 120 * screenWidth * 0.9 / 374,
        position: 'absolute',
        top: 0,
        left: 0
    },
    limitTopView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    limitBottomView: {
        marginTop: 10,
        justifyContent: 'center'
    },
    couponView: {
        flexDirection: 'row'
    },
    backImgView: {
        width: screenWidth * 0.9,
        height: 120 * screenWidth * 0.9 / 374
    },
    couponLimitView: {
        backgroundColor: whiteColor,
        padding: 12,
        width: screenWidth * 0.9,
    },
    scrollView: {
        paddingBottom: 40,
        alignItems: 'center',
        justifyContent: 'center'
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
        width: screenWidth / 2,
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

});
