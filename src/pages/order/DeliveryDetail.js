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
import Toast, {DURATION} from 'react-native-easy-toast';

type Props = {};
export default class DeliveryDetail extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            id: '',
            deliveryList: [],
            deliveryInfo: {}
        }
    }

    componentDidMount() {
        this.state.id = this.props.navigation.state.params.id;
        this.fetchData()
    }

    render() {
        if (this.state.isLoading) {
            return <View style={styles.loadingContainer}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        } else {
            let deliveryView = [];
            const {deliveryList, deliveryInfo} = this.state;
            deliveryList.map((value, index) => {
                let colorValue = index === 0 ? '#0b74c4' : '#888';
                let backgroundColor = index === 0 ? '#0b74c4' : '#e0e0e0';
                deliveryView.push(
                    <View style={styles.expressItem} key={index}>
                        <View style={styles.expressRightFirst}>
                            <View style={styles.process}>
                                <Text style={{color: colorValue, fontSize: 14}}>{value.Context}</Text>
                                <Text style={{
                                    color: colorValue,
                                    fontSize: 12,
                                    marginTop: 10
                                }}>{dateFormat(value.Time)}</Text>
                            </View>
                        </View>
                        <View style={[styles.expressLeft, {backgroundColor: backgroundColor}]}/>
                    </View>
                );
            });
            return <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.itemView}>
                    <View style={styles.leftImgView}>
                        <Image
                            resizeMode='contain'
                            style={styles.leftImg}
                            source={require('../../images/deliverylogo.png')}
                        />
                    </View>
                    <View style={styles.deliveryInfoView}>
                        <Text numberOfLines={2}>物流状态：{deliveryList[0].Context}</Text>
                        <Text>承运来源：{deliveryInfo.companyName}</Text>
                        <Text>运单编号：{deliveryInfo.number}</Text>
                    </View>
                </View>
                {deliveryView}
            </ScrollView>
        }

    }


    fetchData() {
        let params = {
            id: this.state.id
        };
        HttpUtils.post('/order/searchLogisticsOrder', params, data => {
            let deliveryInfo = data.data;
            let detail = deliveryInfo.orderDetail;
            let arr = [];
            detail.map(value => {
                arr.push(JSON.parse(value))
            });
            console.warn(arr)
            this.setState({
                deliveryList: arr,
                deliveryInfo: data.data,
                isLoading: false,
            });
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    process: {
        paddingVertical: 10,
        flexDirection: 'column',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        paddingRight: 20
    },
    expressRightFirst: {
        width: screenWidth,
        paddingLeft: 25,
        borderLeftWidth: 1,
        borderLeftColor: '#e0e0e0',
        flexDirection: 'column'
    },
    content: {
        flexDirection: 'column',
        width: screenWidth,
        backgroundColor: '#f2f2f2'
    },
    expressItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20,
        width: screenWidth,
        backgroundColor: whiteColor
    },
    expressLeft: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
        position: 'relative',
        right: screenWidth + 4,
        top: 20
    },
    itemView: {
        width: screenWidth,
        flexDirection: 'row',
        backgroundColor: whiteColor,
        height: 120,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    leftImgView: {
        width: screenWidth * 0.15,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftImg: {
        width: screenWidth * 0.1,
        height: screenWidth * 0.1
    },
    deliveryInfoView: {
        justifyContent: 'space-between',
        width: screenWidth * 0.85,
        height: 90,
    },
});
