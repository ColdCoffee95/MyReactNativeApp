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
    ScrollView,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast, {DURATION} from 'react-native-easy-toast';
import ActiveButton from '../../components/common/ActiveButton';
import LoadingView from '../../components/common/LoadingView';
type Props = {};

export default class ManageCrossAddress extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            addressList: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({addressGoBack: this.addressGoBack.bind(this)});
        this.fetchData()
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        headerLeft:
            <TouchableOpacity onPress={() => navigation.state.params.addressGoBack()}>
                <View style={{paddingLeft: 15}}>
                    <Icon name='angle-left' size={40} color='black'></Icon>
                </View>
            </TouchableOpacity>

    });
    render() {
        if (this.state.isLoading) {
            return <LoadingView/>
        } else {
            let addressList = [];
            this.state.addressList.map(value => {
                addressList.push(
                    <View style={styles.singleView}>
                        <Text style={styles.mobile}>{value.mobile}</Text>
                        <Text style={styles.address}>{value.totalAddress}</Text>
                        <View style={styles.operate}>
                            <TouchableHighlight
                                onPress={() => this.setDefaultAddress(value.id)}
                                underlayColor='#fff'>
                                <View style={styles.defaultView}>
                                    {
                                        value.defaults ?
                                            (<Icon name="check-circle" size={16} color={activeColor}></Icon>) :
                                            (<Icon2 name="checkbox-blank-circle-outline" size={16}></Icon2>)
                                    }


                                    <Text style={styles.defaultOperate}>默认跨境地址</Text>
                                </View>
                            </TouchableHighlight>

                            <View style={styles.editDeleteView}>
                                <TouchableOpacity
                                    onPress={() => this.editAddress(value.id)}>
                                    <View style={styles.editView}>
                                        <Icon name="edit" size={16}></Icon>
                                        <Text style={styles.editText}>编辑</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.deleteAddress(value.id)}>
                                    <View style={styles.editView}>
                                        <Icon name="trash" size={16}></Icon>
                                        <Text style={styles.editText}>删除</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            });
            return (
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {addressList}
                    </ScrollView>
                    <Toast ref='toast' position='center'></Toast>
                    <View style={styles.bottomBtnView}>
                        <ActiveButton
                            clickBtn={() => this.addAddress()}
                            text='添加跨境地址'
                            style={styles.activeButton}>
                        </ActiveButton>
                    </View>
                </View>
            );
        }

    }
    addressGoBack(){
        const {navigate, goBack, state} = this.props.navigation;
        state.params.goBack();
        goBack();
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
                console.warn(data.data)
                resolve(data.data)
            })
        })
    }

    editAddress(id) {
        this.props.navigation.navigate('EditCrossAddress', {
            goBack: () => this.fetchData(),
            id: id
        });
    }

    setDefaultAddress(id) {//设为默认
        HttpUtils.get('/idCardAddress/setIdCardAddressDefaultsById', {id: id}, data => {
            this.refs.toast.show('设置成功!', 10);
            this.fetchData();
        })
    }

    deleteAddress(id) {
        Alert.alert(null, '删除后将无法恢复，确认删除？',
            [
                {
                    text: "确定", onPress: () => {
                        HttpUtils.get('/idCardAddress/deleteIdCardAddressById', {id: id}, data => {
                            this.refs.toast.show('删除成功!', 10);
                            this.fetchData();
                        })
                    }
                },
                {
                    text: "取消", onPress: () => {
                    }
                },
            ],
            {cancelable: false}
        )
    }

    addAddress() {
        this.props.navigation.navigate('AddCrossAddress', {
            goBack: () => this.fetchData()
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    scrollView: {
        paddingBottom: 40
    },
    address: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1
    },
    singleView: {
        backgroundColor: whiteColor,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        width: screenWidth,
        justifyContent: 'space-between',
        marginBottom: 10,
        height: 100
    },
    mobile: {},
    operate: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    defaultOperate: {
        color: activeColor,
        marginLeft: 5
    },
    defaultView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editDeleteView: {
        flexDirection: 'row',
    },
    editView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    editText: {
        marginLeft: 5
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
    }

});
