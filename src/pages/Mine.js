/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    ActivityIndicator,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast, {DURATION} from 'react-native-easy-toast';
type Props = {};
export default class Mine extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userInfo: {},
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
                {
                    id: 3,
                    name: "会员中心",
                    img: require('../images/memberCenter.png')
                },
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
                }
            ]
        }
    }

    componentDidMount() {
        this.getUserInfo()
    }

    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        } else {
            return this.renderSuccessView();
        }

    }

    renderLoadingView() {
        return <ActivityIndicator></ActivityIndicator>
    }

    renderSuccessView() {
        console.warn(this.state.userInfo)
        return <View></View>
        let orderTypeList = [];
        this.state.orderTypeList.map(value => {
            orderTypeList.push(
                <View style={styles.orderItemView} key={value.id}>
                    <Image
                        style={styles.orderImg}
                        resizeMode='contain'
                        source={value.img}
                    />
                    <Text style={styles.orderName}>{value.name}</Text>
                </View>
            )
        });
        let toolList = [];
        this.state.toolList.map(value => {
            toolList.push(
                <TouchableHighlight
                    underlayColor='#f2f2f2'
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

                </TouchableHighlight>
            )
        });
        return (
            <View style={styles.container}>
                <View style={styles.mineHeader}>
                    <View style={styles.mineHeaderActive}>

                    </View>
                    <View style={styles.mineHeaderBackground}>

                    </View>

                    <View style={styles.userView}>

                    </View>
                    <View style={styles.avatarView}>
                        <Image
                            style={styles.avatar}
                            resizeMode='contain'
                            source={this.state.userInfo.avatar?{uri: this.state.userInfo.avatar}:{uri: 'http://dianlijiheoss.metchange.com/161516865146_.pic.jpg'}}
                        />
                    </View>
                </View>
                <View style={styles.cellView}>
                    <Text style={styles.leftCell}>我的订单</Text>
                    <View style={styles.rightCell}>
                        <Text style={styles.rightCellText}>查看所有订单</Text>
                    </View>
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
                <Toast ref='toast' position='center'></Toast>
            </View>
        );
    }

    async getUserInfo() {
        HttpUtils.get('/member/selectStoreMemberById', {}, data => {
            console.warn(data.data)
            this.setState({userInfo: data.data, isLoading: false});
        })
    }

    uploadAvatar() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
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
                this.refs.toast.show('此功能暂未开放，敬请期待!', 500);
                break;
            case 4://意见反馈
                this.props.navigation.navigate('Feedback');
                break;
            case 5://大贸地址
                this.props.navigation.navigate('ManageAddress');
                break;
            case 6://跨境地址
                this.props.navigation.navigate('ManageCrossAddress');
                break;
            case 7://实名认证
                this.props.navigation.navigate('ManageCertification');
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
    mineHeader: {},
    mineHeaderActive: {
        width: screenWidth,
        height: 100,
        backgroundColor: activeColor,
    },
    mineHeaderBackground: {
        width: screenWidth,
        height: 100,
        backgroundColor: '#f2f2f2',
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

    },
    avatar: {
        width: 50,
        height: 50
    },
    userView: {
        position: 'absolute',
        top: 40,
        margin: 10,
        borderRadius: 5,
        height: 140,
        width: screenWidth - 20,
        backgroundColor: whiteColor
    },
    cellView: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: whiteColor,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    leftCell: {},
    rightCell: {},
    rightCellText: {
        color: '#999'
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
    toolItemView: {
        width: screenWidth / 5,
        alignItems: 'center',
        marginTop: 10
    },
    toolImg: {
        width: 20,
        height: 20,
        marginBottom: 6
    },
    toolName: {
        fontSize: 12
    },

});
