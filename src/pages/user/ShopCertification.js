/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Picker,
    TouchableHighlight,
    View
} from 'react-native';

type Props = {};
import PopupDialog, {SlideAnimation} from 'react-native-popup-dialog';
import Address from '../../components/common/Address'
import FormCell from '../../components/common/FormCell'
import ActiveButton from '../../components/common/ActiveButton'
import Toast, {DURATION} from 'react-native-easy-toast';
import UploadOneImg from '../../components/common/UploadOneImg';

export default class ShopCertification extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            memberName: '',
            name: '',
            pwd: '',
            mobile: '',
            pwdAgain: '',
            counting: false,
            enable: true,
            timerCount: 60,
            timerTitle: '获取验证码',
            provinceId: '',
            cityId: '',
            areaId: '',
            provinceName: '',
            cityName: '',
            areaName: '',
            num: '',
            storeVoucherList: [],
            areaList: [],
            doorStoreList: []
        }
    }

    componentDidMount() {
        this.getDoorType();
        this.getDoorStoreList();
        this.getImgUploadType();
    }

    render() {
        let doorTypes = [];
        this.state.areaList.map(value => {
            doorTypes.push(
                <Picker.Item label={value.value} value={value.key}/>
            )
        });
        let doorStores = [];
        this.state.doorStoreList.map(value => {
            doorStores.push(
                <Picker.Item label={value.value} value={value.key}/>
            )
        });
        let voucherList = [];
        this.state.storeVoucherList.map((value, index) => {
            voucherList.push(
                <View style={styles.uploadView} key={index}>
                    <UploadOneImg
                        width={100}
                        height={100}
                        onChange={img => {
                            this.state.storeVoucherList[index].url = img;
                            this.setState({storeVoucherList: this.state.storeVoucherList})
                        }}
                        title={value.name}>
                    </UploadOneImg>
                </View>
            )
        });
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <FormCell
                    title='真实姓名'
                    placeholder='请输入真实姓名'
                    onChange={text => this.setState({memberName: text})}
                    autoFocus={true}>
                </FormCell>
                <FormCell
                    title='店铺名称'
                    placeholder='请输入店铺名称'
                    onChange={text => this.setState({name: text})}>
                </FormCell>
                <View style={styles.formCellView}>
                    <Text style={{
                        marginLeft: 10,
                        width: 60
                    }}>门店类型</Text>
                    <TouchableHighlight onPress={() => this.showDoorPopup()} underlayColor='#fff' style={{
                        marginLeft: 10,
                        width: screenWidth - 80
                    }}>
                        <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                            {
                                !this.state.type && <Text style={{color: '#c8c8c8'}}>请选择门店类型</Text>
                            }
                            {
                                this.state.type &&
                                <Text>{this.state.areaList.find(value => value.key == this.state.type).value}</Text>
                            }
                        </View>
                    </TouchableHighlight>
                </View>
                {
                    this.state.type === 'off-line' && <View style={styles.formCellView}>
                        <Text style={{
                            marginLeft: 10,
                            width: 60
                        }}>经营规模</Text>
                        <TouchableHighlight onPress={() => this.showDoorStorePopup()} underlayColor='#fff' style={{
                            marginLeft: 10,
                            width: screenWidth - 80
                        }}>
                            <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                                {
                                    !this.state.num && <Text style={{color: '#c8c8c8'}}>请选择经营规模</Text>
                                }
                                {
                                    this.state.num &&
                                    <Text>{this.state.doorStoreList.find(value => value.key == this.state.num).value}</Text>
                                }
                            </View>
                        </TouchableHighlight>
                    </View>
                }
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
                    placeholder='请输入店铺详细地址'
                    onChange={text => this.setState({address: text})}>
                </FormCell>
                <View style={styles.uploadWrapper}>
                    <Text style={{
                        marginLeft: 10,
                        lineHeight: 40,
                        height: 40,
                    }}>上传图片</Text>
                    <View style={styles.voucherView}>
                        {voucherList}
                    </View>
                </View>

                <View style={styles.bottomBtnView}>
                    <ActiveButton clickBtn={() => this.submit()} text='提交认证' style={styles.activeButton}>

                    </ActiveButton>
                </View>
                <PopupDialog
                    ref={(popupDialog) => {
                        this.doorTypeDialog = popupDialog;
                    }}
                    dialogAnimation={slideAnimation}
                    dialogStyle={{
                        borderRadius: 0,
                        position: 'absolute',
                        bottom: 0,
                        width: screenWidth,
                    }}>
                    <View style={styles.dialogWrapper}>
                        <Picker style={styles.pickerStyle}
                                selectedValue={this.state.type}
                                onValueChange={(type) => {
                                    this.setState({type: type})
                                }}>
                            {doorTypes}
                        </Picker>
                    </View>
                </PopupDialog>
                <PopupDialog
                    ref={(popupDialog) => {
                        this.doorStoreDialog = popupDialog;
                    }}
                    dialogAnimation={slideAnimation}
                    dialogStyle={{
                        borderRadius: 0,
                        position: 'absolute',
                        bottom: 0,
                        width: screenWidth,
                    }}>
                    <View style={styles.dialogWrapper}>
                        <Picker style={styles.pickerStyle}
                                selectedValue={this.state.num}
                                onValueChange={(num) => {
                                    this.setState({num: num})
                                }}>
                            {doorStores}
                        </Picker>
                    </View>
                </PopupDialog>
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
                        ></Address>
                    </View>
                </PopupDialog>
                <Toast ref='toast' position='center'/>
            </ScrollView>
        );
    }

    getDoorType() {
        HttpUtils.get('/dict/selectDictByType', {type: "store_type"}, data => {
            let types = data.data.list;
            let arr = [];
            types.map(value => {
                arr.push({key: value.value, value: value.name});
            });
            this.setState({areaList: arr})
        })
    }

    getDoorStoreList() {
        HttpUtils.get('/dict/selectDictByType', {type: "store_num"}, data => {
            let types = data.data.list;
            let arr = [];
            types.map(value => {
                arr.push({key: value.value, value: value.name});
            });
            this.setState({doorStoreList: arr})
        })
    }

    getImgUploadType() {//获取上传图片类型
        HttpUtils.get('/dict/selectDictByType', {type: "store_voucher"}, data => {
            let types = data.data.list;
            let arr = [];
            types.map(value => {
                arr.push({
                    type: value.value,
                    url: "",
                    name: value.name
                });
            });
            this.setState({storeVoucherList: arr})
        })
    }

    showDoorStorePopup() {
        this.doorStoreDialog.show(() => {
            this.setState({num: this.state.doorStoreList[0].key})
        });
    }

    showDoorPopup() {
        this.doorTypeDialog.show(() => {
            this.setState({type: this.state.areaList[0].key})
        });
    }

    showPopup() {//显示popup
        this.popupDialog.show(() => {
        });
    }

    submit() {
        const {memberName, name, num, type, provinceId, cityId, areaId, address, storeVoucherList} = this.state;
        let params = {
            memberName: memberName, //真实姓名
            name: name, //店铺名称
            address: address,
            provinceId: provinceId,
            cityId: cityId,
            areaId: areaId,
            type: type,
            num: num,
            storeVoucherList: storeVoucherList
        };
        if (this.props.navigation.state.params) {
            params.memberId = this.props.navigation.state.params.memberId;
        }
        HttpUtils.post('/store/applyAuthenticationStore', params, data => {
            this.refs.toast.show('店铺认证已提交，请等待审核', 500,()=>{
                const {navigate, goBack, state} = this.props.navigation;
                if (state.params && state.params.goBack) {
                    state.params.goBack();
                    goBack();
                }else{
                    jumpAndClear(this.props.navigation, 'Login')
                }
            });

        })
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
    version: {
        marginTop: 20
    },
    messageInputView: {
        width: 250,
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    code: {
        width: 150,
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#ededed'
    },
    messageBtn: {
        marginLeft: 10
    },
    phone: {
        width: 250,
        height: 40,
        marginTop: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#ededed'
    },
    password: {
        width: 250,
        height: 40,
        marginTop: 10,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#ededed'
    },
    formCellView: {
        width: screenWidth,
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellTitle: {},
    cellInput: {
        marginLeft: 10
    },
    buttonStyle: {
        backgroundColor: activeColor,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 5,
        marginRight: 10
    },
    voucherView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screenWidth,
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    textStyle: {
        color: whiteColor
    },
    uploadWrapper: {
        width: screenWidth,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
    },
    uploadView: {
        width: screenWidth / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});
