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
            orderId:'',
            orderInfo:{}

        }
    }

    componentDidMount() {
        this.state.orderId = this.props.navigation.state.params.id;
        this.fetchData()
    }

    render() {
        if(this.state.isLoading){
            return <View style={styles.loadingContainer}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        }else{
            return <View style={styles.container}>

            </View>
        }

    }


    fetchData() {
        let params = {
            orderId:this.state.orderId
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
});
