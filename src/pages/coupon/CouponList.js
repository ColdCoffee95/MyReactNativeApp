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
    Image,
    SafeAreaView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';
import LoadingView from '../../components/common/LoadingView';

type Props = {};

export default class CouponList extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            canReceiveCouponList: [],
            couponList: [],
            couponType: 1,
            canUseNum: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        let list = null;
        const {canUseNum, couponType, canReceiveCouponList, couponList} = this.state;
        if (!this.state.isLoading) {
            if (couponType === 1) {
                let canReceiveList = [];
                canReceiveCouponList.map(value => {
                    let cutType = cutTypes.find(type => type.value == value.couponAmountRule.type).name;
                    canReceiveList.push(
                        <View style={styles.couponWrapper}>
                            <View style={styles.backImgView}>
                                {
                                    value.type === 'all' && <Image
                                        resizeMode='contain'
                                        style={styles.backImg}
                                        source={require('../../images/commonCoupon.png')}
                                    />
                                }
                                {
                                    value.type !== 'all' && <Image
                                        resizeMode='contain'
                                        style={styles.backImg}
                                        source={require('../../images/assignCoupon.png')}
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
                                                }}>{value.couponAmountRule.total}</Text>
                                            {
                                                value.couponAmountRule.type === 'discount' &&
                                                <Text style={{color: whiteColor, fontSize: 16}}>最高</Text>
                                            }
                                        </View>
                                        {
                                            value.couponAmountRule.type === 'full-cut' &&
                                            <View style={styles.couponLeftLimit}>
                                                <Text numberOfLines={1} style={{
                                                    color: whiteColor,
                                                    fontSize: 14
                                                }}>满{value.couponAmountRule.amount}可用</Text>
                                            </View>
                                        }
                                        {
                                            value.couponAmountRule.type !== 'full-cut' &&
                                            <View style={styles.couponLeftLimit}>
                                                <Text style={{color: whiteColor, fontSize: 16}}>不限金额</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.couponInfoView}>
                                        <View style={styles.couponInfoTop}>
                                            <Text style={styles.cutType}>{cutType}</Text>
                                            <Text style={styles.couponName}>{value.name}</Text>
                                        </View>
                                        <Text style={{
                                            color: '#ababab',
                                            fontSize: 12
                                        }}>{value.couponAmountRule.name}</Text>
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
                                    <TouchableOpacity onPress={() => this.receiveCoupon(value.id)}>
                                        <View style={styles.couponRightView}>
                                            <Text style={styles.couponRightText}>点击领取</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            {
                                value.type === 'all' && <View style={styles.couponLimitView}>
                                    <Text>全分类商品适用</Text>
                                </View>
                            }
                            {
                                value.type !== 'all' && <TouchableOpacity onPress={() => {
                                    value.toggle = !value.toggle;
                                    this.setState({canReceiveCouponList: canReceiveCouponList});
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
                                                    value.couponCategoryRule &&
                                                    <Text>分类：{value.couponCategoryRule.categoryNames}</Text>
                                                }
                                            </View>
                                        }

                                    </View>
                                </TouchableOpacity>
                            }

                        </View>
                    )
                });
                list = canReceiveList;
            } else {
                let otherList = [];
                couponList.map(value => {
                    let cutType = cutTypes.find(type => type.value == value.amountRuleType).name;
                    otherList.push(
                        <View style={styles.couponWrapper}>
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
                                                <Text style={{color: whiteColor, fontSize: 16}}>不限金额</Text>
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
                                    {
                                        couponType === 2 && <TouchableOpacity onPress={() => this.goUse(value.id)}>
                                            <View style={styles.couponRightView}>
                                                <Text style={styles.couponRightText}>去使用</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                    {
                                        couponType === 3 && <View style={styles.couponRightView}>
                                            <Text style={styles.couponRightTextDisable}>已使用</Text>
                                        </View>

                                    }
                                    {
                                        couponType === 4 && <View style={styles.couponRightView}>
                                            <Text style={styles.couponRightTextDisable}>已过期</Text>
                                        </View>
                                    }

                                </View>
                            </View>

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
                list = otherList;
            }


        }
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.tabView}>
                        <TouchableOpacity
                            onPress={() => this.changeTab(1)}>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.couponType === 1 ? styles.activeTab : styles.negativeTab}>可领取</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.changeTab(2)}>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.couponType === 2 ? styles.activeTab : styles.negativeTab}>未使用({canUseNum})</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.changeTab(3)}>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.couponType === 3 ? styles.activeTab : styles.negativeTab}>已使用</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.changeTab(4)}>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.couponType === 4 ? styles.activeTab : styles.negativeTab}>已过期</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.isLoading && <LoadingView/>
                    }
                    {
                        !this.state.isLoading && <ScrollView contentContainerStyle={styles.scrollView}>
                            {list}
                        </ScrollView>
                    }

                    <Toast ref='toast' position='center'></Toast>
                </View>
            </SafeAreaView>
        );
    }

    async fetchData() {
        this.getCanReceiveCouponList();
        this.getCanUseNum();
    }

    getCanReceiveCouponList() {//获取可领取优惠券列表
        this.setState({isLoading: true});
        HttpUtils.get('/memberCouponInfo/selectCanReceiveCouponList', {}, data => {
            let list = data.data;
            list.map(value => {
                value.toggle = false;
            });
            this.setState({canReceiveCouponList: list, isLoading: false});
        })
    }

    goUse(id) {
        let params = {brandIds: [], secondIds: []};
        let coupon = this.state.couponList.find(value => value.id === id);
        if (coupon.brandRuleId) {
            params.brandIds = [coupon.brandRuleId];
        }
        if (coupon.couponCategoryIds) {
            params.secondIds = coupon.couponCategoryIds.split(',');
        }
        this.props.navigation.navigate('GoodsList', params);
    }

    getCanUseNum() {
        HttpUtils.post('/memberCouponInfo/selectCanUseMemberCouponListSize', {}, data => {
            this.setState({canUseNum: data.data});
        })
    }

    receiveCoupon(id) {
        HttpUtils.get('/memberCouponInfo/doReceiveCouponById', {couponId: id}, data => {
            this.refs.toast.show('领取成功', 10, () => {
                this.fetchData()
            })
        })
    }

    getMemberCouponList(params) {
        this.setState({isLoading: true});
        HttpUtils.post('/memberCouponInfo/selectMemeberCouponList', params, data => {
            let list = data.data;
            list.map(value => {
                value.toggle = false;
            });
            console.warn(list)
            this.setState({couponList: list, isLoading: false});
        })
    }

    changeTab(id) {
        this.state.couponType = id;
        switch (id) {
            case 1://可领取
                this.getCanReceiveCouponList();
                break;
            case 2://未使用
                this.getMemberCouponList({expire: 1, status: 0});
                break;
            case 3://已使用
                this.getMemberCouponList({status: 1});
                break;
            case 4://已过期
                this.getMemberCouponList({expire: -1, status: 0});
                break;
        }
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
    cutType: {
        backgroundColor: activeColor,
        color: whiteColor,
        marginRight: 4,
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
    couponName: {
        fontSize: 12
    },
    couponInfoTop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 0.6 * screenWidth * 0.9,
        overflow: 'hidden'
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
    couponRightView: {
        width: 0.1 * screenWidth * 0.9,
        height: 120 * screenWidth * 0.9 / 374,
        alignItems: 'center',
        justifyContent: 'center',
    },
    couponRightText: {
        width: 20,
        lineHeight: 20,
        color: activeColor,
    },
    couponRightTextDisable: {
        width: 20,
        lineHeight: 20,
        color: '#999',
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
        borderTopColor: borderColor,
        borderTopWidth: 1
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
        width: screenWidth / 4,
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
