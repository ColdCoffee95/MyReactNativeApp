/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    ActivityIndicator,
    View
} from 'react-native';

type Props = {};

export default class SelectCrossAddress extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            addressList: [],
            isLoading: true
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight:
            (<TouchableHighlight style={{marginRight: 10}} underlayColor={activeColor}
                                 onPress={() => navigation.state.params.manage()}>
                <View>
                    <Text style={{color: whiteColor}}>管理</Text>
                </View>
            </TouchableHighlight>)
    });

    componentDidMount() {
        this.props.navigation.setParams({manage: this.jumpToManage.bind(this)});
        this.fetchData();
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        } else {
            let addressList = [];
            this.state.addressList.map(value => {
                addressList.push(
                    <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.selectAddress(value)}>
                        <View style={styles.addressView}>
                            <View style={styles.addressTopView}>
                                <Text>{value.mobile}</Text>
                            </View>
                            <View style={styles.addressBottomView}>
                                {
                                    value.defaults &&
                                    <Text style={styles.defaultText}>[默认地址]</Text>
                                }
                                <Text>{value.totalAddress}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                )
            });
            return (
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {addressList}
                    </ScrollView>
                </View>
            );
        }

    }

    async fetchData() {
        let list = await this.getAddressList();
        let addressData = await getAddressData();
        let dealedList = await getTotalAddress(addressData, list);
        this.setState({addressList: dealedList, isLoading: false});
    }

    getAddressList() {
        return new Promise((resolve, reject) => {
            HttpUtils.get('/idCardAddress/selectIdCardAddressList', {}, data => {
                resolve(data.data)
            })
        })
    }

    jumpToManage() {
        this.props.navigation.navigate('ManageCrossAddress');
    }

    selectAddress(address) {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.addressCallback(address);
        goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    bottomBtnView: {
        position: 'absolute',
        bottom: 0
    },
    activeButton: {
        backgroundColor: activeColor,
        alignItems: 'center',
        width: screenWidth,
        padding: 10,
    },
    scrollView: {
        paddingBottom: 40
    },
    addressView: {
        backgroundColor: whiteColor,
        padding: 10,
        marginBottom: 10,
        width: screenWidth
    },
    addressTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addressBottomView: {
        marginTop: 20,
        flexDirection: 'row'
    },
    defaultText: {
        color: activeColor
    }

});