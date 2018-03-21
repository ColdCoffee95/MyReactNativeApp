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
    TextInput,
    View
} from 'react-native';

type Props = {};

export default class FormCell extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.formCellView}>
                <Text style={{width:this.props.labelWidth?this.props.labelWidth:60}}>{this.props.title}</Text>
                <TextInput
                    style={{marginLeft:10,width:this.props.labelWidth?(screenWidth-this.props.labelWidth):(screenWidth-60)}}
                    autoFocus={this.props.autoFocus}
                    keyboardType={this.props.keyboardType}
                    maxLength={this.props.maxLength}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={(text) => this.setState({sugMessage: text})}
                    placeholder={this.props.placeholder}>
                </TextInput>
            </View>
        );
    }

    submit() {

    }
}

const styles = StyleSheet.create({
    formCellView:{
        width:screenWidth,
        flexDirection:'row',
        padding:12,
        borderBottomColor:borderColor,
        borderBottomWidth:1
    },
    cellTitle:{

    },
    cellInput:{
        marginLeft:10
    }
});
