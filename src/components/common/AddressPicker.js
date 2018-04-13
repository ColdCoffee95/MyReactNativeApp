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
    View
} from 'react-native';

type Props = {};

export default class AddressPicker extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.formCellView}>
                <Text style={{
                    marginLeft: 10,
                    lineHeight: 41,
                    height: 41,
                    width: this.props.labelWidth ? this.props.labelWidth : 60
                }}>{this.props.title}</Text>
                <View style={{
                    height: 41,
                    marginLeft: 10,
                    width: this.props.labelWidth ? (screenWidth - this.props.labelWidth - 20) : (screenWidth - 80)
                }}>
                    <TouchableHighlight onPress={() => this.props.onPress()} underlayColor='#fff'>
                        <Text style={{color: '#c8c8c8', lineHeight: 41}}>请选择地址</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    formCellView: {
        width: screenWidth,
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    cellInput: {
        marginLeft: 10
    },


});
