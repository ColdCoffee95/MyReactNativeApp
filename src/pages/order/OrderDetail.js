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
    ActivityIndicator,
    Linking,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    ScrollView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveButton from '../../components/common/ActiveButton';
import {observer} from 'mobx-react';
import {action, autorun} from 'mobx';
import selectPayTypeCountdown from '../../mobx/selectPayTypeCountdown'

type Props = {};
@observer
export default class OrderDetail extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            orderId: '',
            orderInfo: {},
            orderType: [
                {
                    id: 1,
                    name: '订单待付款'
                },
                {
                    id: 2,
                    name: '订单已发货'
                },
                {
                    id: 3,
                    name: '买家已付款'
                },
                {
                    id: 4,
                    name: '交易成功，快去评价吧'
                },
                {
                    id: 5,
                    name: '交易成功'
                },
                {
                    id: 6,
                    name: '订单已取消'
                },
            ]
        }
    }

    componentDidMount() {
        this.state.orderId = this.props.navigation.state.params.id;
        this.fetchData()
    }

    render() {
        if (this.state.isLoading) {
            return <View style={styles.loadingContainer}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        } else {
            const {orderInfo} = this.state;
            return <View style={styles.container}>
                <View>

                </View>
                <View style={styles.topLeftView}>
                    <Icon name='map-marker' size={20} color="#999"></Icon>
                    <View style={styles.topRightView}>
                        <View style={styles.topContacts}>
                            <Text style={{marginLeft: 10}}>收货人：{orderInfo.orderDetail.contacts}</Text>
                            <Text>{orderInfo.orderDetail.mobile}</Text>
                        </View>
                        <Text style={{
                            marginTop: 10,
                            marginLeft: 10
                        }}>收货地址：{orderInfo.orderDetail.address}</Text>
                    </View>
                </View>
            </View>
        }

    }


    fetchData() {
        let params = {
            orderId: this.state.orderId
        };
        HttpUtils.post('/order/viewOrderInfo', params, data => {
            console.warn(data.data)
            this.setState({
                orderInfo: data.data,
                isLoading: false,
            });
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
    topLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth
    },
    topRightView: {
        width: screenWidth * 0.9
    },
    topContacts: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
