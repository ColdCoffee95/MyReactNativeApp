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
    Linking,
    TextInput,
    View
} from 'react-native';
import ActiveButton from '../../components/common/ActiveButton'
import AddressPicker from '../../components/common/AddressPicker'
import FormCell from '../../components/common/FormCell'
type Props = {};

export default class AddCrossAddress extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            typeList: [

            ],
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FormCell
                    title='收货手机'
                    placeholder='请输入可联系到的手机号'
                    keyboardType='numeric'
                    maxLength={11}
                    autoFocus={true}>
                </FormCell>
                <AddressPicker title='省市区'></AddressPicker>
                <FormCell title='详细地址' placeholder='请输入详细收货地址'></FormCell>
                <View style={styles.bottomBtnView}>
                    <ActiveButton clickBtn={() => this.save()} text='保存' style={styles.activeButton}></ActiveButton>
                </View>
            </View>
        );
    }

    save(){
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    bottomBtnView:{
        position:'absolute',
        bottom:0
    },
    activeButton:{
        backgroundColor:activeColor,
        alignItems:'center',
        width:screenWidth,
        padding:10,
    }

});
