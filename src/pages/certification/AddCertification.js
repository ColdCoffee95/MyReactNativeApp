/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View
} from 'react-native';
import ActiveButton from '../../components/common/ActiveButton'
import FormCell from '../../components/common/FormCell'
import UploadOneImg from '../../components/common/UploadOneImg'
import Toast, {DURATION} from 'react-native-easy-toast';

type Props = {};
export default class AddCertification extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            typeList: [],
            contacts: '',
            idCard: '',
            idCardImg: '',
            idCardBgImg: ''
        }
    }

    render() {

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <FormCell
                        title='姓名'
                        placeholder='请输入真实姓名'
                        onChange={text => this.setState({contacts: text})}
                        autoFocus={true}>
                    </FormCell>
                    <FormCell
                        title='身份证号'
                        placeholder='请输入身份证号码'
                        maxLength={18}
                        onChange={text => this.setState({idCard: text})}>
                    </FormCell>
                    <View style={styles.uploadImgView}>
                        <View style={styles.uploadView}>
                            <UploadOneImg
                                width={100}
                                height={100}
                                onChange={img => this.setState({idCardImg: img})}
                                title="身份证正面">
                            </UploadOneImg>
                        </View>
                        <View style={styles.uploadView}>
                            <UploadOneImg
                                width={100}
                                height={100}
                                onChange={img => this.setState({idCardBgImg: img})}
                                title="身份证反面">
                            </UploadOneImg>
                        </View>
                    </View>

                    <View style={styles.bottomBtnView}>
                        <ActiveButton clickBtn={() => this.save()} text='保存' style={styles.activeButton}></ActiveButton>
                    </View>
                    <Toast ref='toast' position='center'></Toast>
                </View>
            </SafeAreaView>
        );
    }

    save() {//保存
        let params = {
            contacts: this.state.contacts.trim(),
            idCard: this.state.idCard.trim(),
            idCardImg: this.state.idCardImg,
            idCardBgImg: this.state.idCardBgImg
        };
        if (!params.contacts || !params.idCard) {
            this.refs.toast.show('请填写完整', 500);
            return;
        }
        HttpUtils.post('/idCard/addIdCard', params, data => {
            this.refs.toast.show('新增成功', 500, () => {
                const {navigate, goBack, state} = this.props.navigation;
                state.params.goBack();
                goBack();
            });
        });
    }
}

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
    uploadImgView: {
        width: screenWidth,
        flexDirection: 'row',
        marginTop: 30
    },
    uploadView: {
        width: screenWidth / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
