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
    TouchableOpacity,
    SafeAreaView,
    View,
} from 'react-native';
import ActiveButton from '../../components/common/ActiveButton'
import Address from '../../components/common/Address'
import FormCell from '../../components/common/FormCell'
import PopupDialog, {SlideAnimation} from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};
export default class EditCrossAddress extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            provinceId: '',
            cityId: '',
            areaId: '',
            provinceName: '',
            cityName: '',
            areaName: '',
            mobile: '',
            address: '',//详细地址
            defaults: false,
            id: '',
            isLoading: true
        };
    }

    componentDidMount() {
        this.state.id = this.props.navigation.state.params.id;
        this.fetchData();
    }

    render() {
        if (this.state.isLoading) {
            return <View/>
        } else {
            return (
                <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                    <View style={styles.container}>
                        <FormCell
                            title='收货手机'
                            placeholder='请输入可联系到的手机号'
                            keyboardType='numeric'
                            maxLength={11}
                            defaultValue={this.state.mobile}
                            onChange={text => this.setState({mobile: text})}>
                        </FormCell>
                        <View style={styles.formCellView}>
                            <Text style={{
                                marginLeft: 10,
                                width: 60
                            }}>省市区</Text>
                            <TouchableHighlight onPress={() => this.showPopup()} underlayColor='#fff' style={{
                                marginLeft: 10,
                                width: screenWidth - 80
                            }}>
                                <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                                    <Text>{this.state.provinceName}</Text>
                                    <Text style={{marginLeft: 10}}>{this.state.cityName}</Text>
                                    <Text style={{marginLeft: 10}}>{this.state.areaName}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <FormCell
                            title='详细地址'
                            defaultValue={this.state.address}
                            onChange={text => this.setState({address: text})}
                            placeholder='请输入详细收货地址'>

                        </FormCell>
                        <View style={styles.setDefaultView}>
                            <TouchableOpacity onPress={() => this.setState({defaults: !this.state.defaults})}>
                                {
                                    this.state.defaults ?
                                        (<Icon name="check-circle" size={20} color={activeColor}></Icon>) :
                                        (<Icon2 name="checkbox-blank-circle-outline" size={20}></Icon2>)
                                }
                            </TouchableOpacity>

                            <Text style={{marginLeft: 5}}>设为默认收货地址</Text>
                        </View>
                        <View style={styles.bottomBtnView}>
                            <ActiveButton clickBtn={() => this.save()} text='保存'
                                          style={styles.activeButton}></ActiveButton>
                        </View>
                        <PopupDialog
                            ref={(popupDialog) => {
                                this.popupDialog = popupDialog;
                            }}
                            dialogAnimation={slideAnimation}
                            dialogStyle={{
                                borderRadius: 0,
                                position: 'absolute',
                                bottom: 0,
                                width: screenWidth,
                            }}>
                            <View style={styles.dialogWrapper}>
                                <Address
                                    onChange={(address) => this.setState({
                                        provinceId: address.provinceId,
                                        cityId: address.cityId,
                                        areaId: address.areaId,
                                        provinceName: address.provinceName,
                                        cityName: address.cityName,
                                        areaName: address.areaName,
                                    })}
                                    provinceId={this.state.provinceId}
                                    cityId={this.state.cityId}
                                    areaId={this.state.areaId}>
                                </Address>
                            </View>


                        </PopupDialog>
                    </View>
                </SafeAreaView>
            );
        }


    }

    fetchData() {
        HttpUtils.get('/idCardAddress/selectIdCardAddressById', {id: this.state.id}, data => {
            let address = data.data;
            this.setState({
                mobile: address.mobile,
                provinceId: address.provinceId,
                cityId: address.cityId,
                areaId: address.areaId,
                address: address.address,
                defaults: address.defaults,
                isLoading: false
            });
        })
    }

    showPopup() {//显示popup
        this.popupDialog.show(() => {
        });
    }

    closePopover() {
        this.popupDialog.dismiss(() => {
        });
    }

    save() {
        let params = {
            mobile: this.state.mobile.trim(),
            address: this.state.address.trim(),
            provinceId: this.state.provinceId,
            cityId: this.state.cityId,
            areaId: this.state.areaId,
            defaults: this.state.defaults,
            id: this.state.id
        };
        if (!params.mobile || !params.address) {
            ToastUtil.show('请填写完整');
            return;
        }
        HttpUtils.post('/idCardAddress/updateIdCardAddress', params, data => {
            ToastUtil.show('修改成功');
            const {navigate, goBack, state} = this.props.navigation;
            state.params.goBack();
            goBack();
        });
    }
}
const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
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
    formCellView: {
        width: screenWidth,
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    setDefaultView: {
        width: screenWidth,
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 40,
        padding: 10
    },
    cellInput: {
        marginLeft: 10
    },
    dialogWrapper: {
        width: screenWidth,
        justifyContent: 'space-between',
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomColor: borderColor,
        borderBottomWidth: 1
    }

});
