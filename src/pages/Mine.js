/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Foundation';
import UploadOneImg from '../components/common/UploadOneImg'
import Text from '../components/common/MyText';
import Icon2 from 'react-native-vector-icons/MyIcon';
type Props = {};
export default class Mine extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userInfo: {},
            isRefreshing: false,
            isVisible: true,
            orderTypeList: [
                {
                    id: 1,
                    name: "待付款",
                    img: require('../images/order1.png')
                },
                {
                    id: 3,
                    name: "待发货",
                    img: require('../images/order2.png')
                },
                {
                    id: 2,
                    name: "待收货",
                    img: require('../images/order3.png')
                },
                {
                    id: 4,
                    name: "待评价",
                    img: require('../images/order4.png')
                },
                {
                    id: 99,
                    name: "退货/售后",
                    img: require('../images/order5.png')
                }
            ],
            toolList: [
                {
                    id: 1,
                    name: "客服热线",
                    img: require('../images/hotline.png')
                },
                {
                    id: 2,
                    name: "我的设置",
                    img: require('../images/settings.png')
                },
                // {
                //     id: 3,
                //     name: "会员中心",
                //     img: require('../images/memberCenter.png')
                // },
                {
                    id: 4,
                    name: "意见反馈",
                    img: require('../images/feedback.png')
                },
                {
                    id: 5,
                    name: "大贸地址",
                    img: require('../images/bigTradeAddress.png')
                },
                {
                    id: 6,
                    name: "跨境地址",
                    img: require('../images/crossBorderAddress.png')
                },
                {
                    id: 7,
                    name: "实名认证",
                    img: require('../images/certification.png')
                },
                {
                    id: 8,
                    name: "优惠券",
                    img: require('../images/coupon.png')
                }
            ]
        }
    }

    componentDidMount() {
        this.getUserInfo()
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        tabBarOnPress: (scene, jumpToIndex) => {
            navigation.navigate(scene.scene.route.key);
            if (navigation.state.params && navigation.state.params.getUserInfo) {
                navigation.state.params.getUserInfo();
            }
        },
    });

    render() {
        let orderTypeList = [];
        this.state.orderTypeList.map(value => {
            orderTypeList.push(
                <TouchableOpacity onPress={() => this.jumpToOrder(value.id)} key={value.id}>
                    <View style={styles.orderItemView}>
                        <Image
                            style={styles.orderImg}
                            resizeMode='contain'
                            source={value.img}
                        />
                        <Text style={styles.orderName}>{value.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
        let toolList = [];
        this.state.toolList.map(value => {
            toolList.push(
                <TouchableOpacity
                    style={styles.toolItemTouch}
                    onPress={() => this.jumpToTools(value.id)}
                    key={value.id}>
                    <View style={styles.toolItemView}>

                        <Image
                            style={styles.toolImg}
                            resizeMode='contain'
                            source={value.img}
                        />
                        <Text style={styles.toolName}>{value.name}</Text>
                    </View>

                </TouchableOpacity>
            )
        });
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.container}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    title="加载中..."
                                    progressBackgroundColor="#ffff00">

                                </RefreshControl>
                            }>
                    {/*<Loading isVisible={this.state.isVisible} size={50} type={'CircleFlip'} color={'orange'}/>*/}

                    <View style={styles.mineHeader}>
                        <View style={styles.mineHeaderActive}>

                        </View>
                        <View style={styles.mineHeaderBackground}>

                        </View>

                        <View style={styles.userView}>
                            <Text style={styles.memberName}>{this.state.userInfo.memberName}</Text>
                            <View style={styles.collectView}>
                                <TouchableOpacity onPress={() => this.toCollect()}>
                                    <View style={styles.childView}>
                                        <Icon2 name="jiarugouwucheiconx" size={30} color={activeColor}/>
                                        <Icon1 name='heart' size={30} color={activeColor}></Icon1>
                                        <Text>收藏</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.toFootPrint()}>
                                    <View style={styles.childView}>
                                        <Icon1 name='foot' size={30} color={activeColor}></Icon1>
                                        <Text>足迹</Text>
                                    </View>
                                </TouchableOpacity>


                            </View>
                        </View>
                        <View style={styles.avatarView}>
                            {
                                this.state.userInfo.memberId && <UploadOneImg
                                    style={styles.avatar}
                                    onChange={img => this.updateAvatar(img)}
                                    img={this.state.userInfo.avatar || 'http://dianlijiheoss.metchange.com/161516865146_.pic.jpg'}>
                                </UploadOneImg>
                            }

                        </View>
                    </View>
                    <View style={styles.cellView}>
                        <Text style={styles.leftCell}>我的订单</Text>
                        <TouchableOpacity onPress={() => this.jumpToOrder(-1)}>
                            <View style={styles.rightCell}>
                                <Text style={styles.rightCellText}>查看所有订单</Text>
                                <Icon name="angle-right" size={20} color="#999"/>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.orderView}>
                        {orderTypeList}
                    </View>
                    <View style={styles.cellView}>
                        <Text style={styles.leftCell}>必备工具</Text>
                    </View>
                    <View style={styles.toolView}>
                        {toolList}
                    </View>
                </ScrollView>
            </SafeAreaView>

        );

    }


    async getUserInfo() {
        HttpUtils.get('/member/selectStoreMemberById', {}, data => {
            console.warn(data.data)
            this.setState({userInfo: data.data, isLoading: false, isRefreshing: false});
            this.props.navigation.setParams({
                getUserInfo: this.getUserInfo.bind(this)
            });
        })
    }


    _onRefresh() {
        this.setState({isRefreshing: true});
        this.getUserInfo();
    }

    toCollect() {
        this.props.navigation.navigate('Collect');
    }

    toFootPrint() {
        this.props.navigation.navigate('FootPrint');
    }

    async updateAvatar(img) {
        let userInfo = await HttpUtils.getUserInfo();
        let params = {
            avatar: img,
            memberId: userInfo.memberId
        };
        HttpUtils.post('/member/updateMemberAvatar', params, data => {
            storage.save({
                key: 'userInfo',
                data: data.data.member
            });
        })
    }

    jumpToTools(id) {
        switch (id) {
            case 1://客服热线
                this.props.navigation.navigate('Hotline');
                break;
            case 2://我的设置
                this.props.navigation.navigate('Settings');
                break;
            case 3://会员中心
                ToastUtil.show('此功能暂未开放，敬请期待!');
                break;
            case 4://意见反馈
                this.props.navigation.navigate('Feedback');
                break;
            case 5://大贸地址
                this.props.navigation.navigate('ManageAddress', {
                    goBack: () => {
                    }
                });
                break;
            case 6://跨境地址
                this.props.navigation.navigate('ManageCrossAddress', {
                    goBack: () => {
                    }
                });
                break;
            case 7://实名认证
                this.props.navigation.navigate('ManageCertification', {
                    goBack: () => {
                    }
                });
                break;
            case 8://优惠券
                this.props.navigation.navigate('CouponList');
                break;
        }
    }

    jumpToOrder(id) {
        if (id == 99) {
            this.props.navigation.navigate('AfterSaleOrders', {type: id});
        } else {
            this.props.navigation.navigate('Order', {type: id});
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    mineHeader: {},
    mineHeaderActive: {
        width: screenWidth,
        height: 90,
        backgroundColor: activeColor,
    },
    mineHeaderBackground: {
        width: screenWidth,
        height: 90,
        backgroundColor: '#f2f2f2',
    },
    collectView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 0.3 * screenWidth,
        marginTop: 20
    },
    childView: {
        alignItems: 'center'
    },
    avatarView: {
        position: 'absolute',
        top: 25,
        left: screenWidth * 0.1,
        backgroundColor: whiteColor,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: activeColor,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    avatar: {
        width: 50,
        height: 50,

    },
    userView: {
        position: 'absolute',
        alignItems: 'center',
        top: 40,
        margin: 10,
        borderRadius: 5,
        height: 120,
        width: screenWidth - 20,
        backgroundColor: whiteColor
    },
    memberName: {
        marginLeft: 90,
        marginTop: 10,
        alignSelf: 'flex-start'
    },
    cellView: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: whiteColor,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    leftCell: {
        justifyContent: 'center'
    },
    rightCell: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightCellText: {
        color: '#999',
        marginRight: 5
    },
    orderView: {
        width: screenWidth,
        flexDirection: 'row',
        backgroundColor: whiteColor,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    orderItemView: {
        width: screenWidth / 5,
        alignItems: 'center'
    },
    orderImg: {
        width: 20,
        height: 20,
        marginBottom: 6
    },
    orderName: {
        fontSize: 12
    },
    toolView: {
        width: screenWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: whiteColor,
        paddingBottom: 10,
    },
    toolItemTouch: {
        width: screenWidth / 5,
        alignItems: 'center',
        marginTop: 10,
    },
    toolItemView: {
        alignItems: 'center',
    },
    toolImg: {
        width: 20,
        height: 20,
        marginBottom: 10
    },
    toolName: {
        fontSize: 12
    },

});
