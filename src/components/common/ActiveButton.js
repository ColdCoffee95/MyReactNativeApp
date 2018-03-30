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

export default class ActiveButton extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <TouchableHighlight
                onPress={() => this.props.clickBtn()}
                underlayColor='#fff'>
                <View style={this.props.style ? this.props.style : styles.submitView}>
                    <Text
                        style={this.props.textStyle ? this.props.textStyle : styles.submitText}>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    submit() {

    }
}

const styles = StyleSheet.create({
    submitView: {
        backgroundColor: activeColor,
        marginTop: 20,
        alignItems: 'center',
        width: screenWidth * 0.6,
        padding: 10,
        borderRadius: 5
    },
    submitText: {
        color: whiteColor
    }
});
