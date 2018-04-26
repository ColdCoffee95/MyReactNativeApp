/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    View,
    SafeAreaView
} from 'react-native';
import LoadingView from '../../components/common/LoadingView';

type Props = {};
export default class ViewLogistics extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            orderId: '',
            deliveryList: []
        }
    }

    componentDidMount() {
        this.state.orderId = this.props.navigation.state.params.orderId;
        this.fetchData()
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView/>
        } else {
            let deliveryView = [];
            this.state.deliveryList.map(value => {
                deliveryView.push(
                    <View style={styles.itemView}>
                        <View style={styles.leftImgView}>
                            <Image
                                resizeMode='contain'
                                style={styles.leftImg}
                                source={require('../../images/package.png')}
                            />
                        </View>
                        <View style={styles.deliveryInfoView}>
                            <Text numberOfLines={2}>物流状态：{value.headInfo}</Text>
                            <Text>承运来源：{value.logisticsName}</Text>
                            <Text>运单编号：{value.logsiticsNumber}</Text>
                        </View>
                        <TouchableOpacity style={styles.lookTouch} onPress={() => this.deliveryDetail(value.id)}>
                            <View style={styles.lookView}>
                                <Text>查看</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            });
            return <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <ScrollView>
                        {deliveryView}
                    </ScrollView>
                </View>
            </SafeAreaView>
        }

    }


    fetchData() {
        let params = {
            orderId: this.state.orderId
        };
        HttpUtils.get('/order/selectLogisticsByOrderId', params, data => {
            console.warn(data.data)
            this.setState({
                deliveryList: data.data,
                isLoading: false,
            });
        })
    }

    deliveryDetail(id) {
        this.props.navigation.navigate('DeliveryDetail', {
            id: id
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
        width: screenWidth * 0.7,
        height: 90,
    },
    lookTouch: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.15,
    },
    lookView: {
        borderColor: borderColor,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 6,

    }
});
