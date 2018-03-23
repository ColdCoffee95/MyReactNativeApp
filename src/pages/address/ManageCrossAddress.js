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

type Props = {};

export default class ManageCrossAddress extends Component<Props> {

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
                <View style={styles.bottomBtnView}>
                    <ActiveButton clickBtn={() => this.addAddress()} text='添加跨境地址' style={styles.activeButton}></ActiveButton>
                </View>
            </View>
        );
    }

    submit() {
        alert('13')
    }
    addAddress(){
        this.props.navigation.navigate('AddCrossAddress');
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
