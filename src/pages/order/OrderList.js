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
export default class SelectPayType extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            orderId: ''
        }
        this.data = new selectPayTypeCountdown()
    }

    componentDidMount() {
        this.state.orderId = this.props.navigation.state.params.orderId;
        this.fetchData()
    }

    render() {
        return <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.countdownView}>
                    <Text>支付剩余时间</Text>
                    <View style={styles.countdownTimeView}>
                        <Text>{this.data.time.hours}</Text>
                        <Text>时</Text>
                        <Text>{this.data.time.minutes}</Text>
                        <Text>分</Text>
                        <Text>{this.data.time.seconds}</Text>
                        <Text>秒</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    }

    fetchData() {
        HttpUtils.post('/order/viewOrderInfo', {orderId: this.state.orderId}, data => {
            console.warn(data.data)
            this.data.replace(data.data.orderInfo.payRemainingTime);
            this.start();
        })
    }

    @action
    start() {
        let interval = setInterval(() => {
            this.data.time--;
            if (this.data.time <= 0) {
                clearInterval(interval);
                Alert.alert(null, '订单支付超时，请重新下单',
                    [
                        {text:'确定',onPress:()=>{this.props.navigation.navigate('OrderList')}}
                    ],
                    {cancelable: false});
            }
        }, 1000)
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,

    },
    scrollView: {},
    countdownView: {
        alignItems: 'center'

    },
    countdownTimeView: {
        flexDirection: 'row',
        alignItems: 'center'

    }
});
