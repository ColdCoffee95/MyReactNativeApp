/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    TextInput
} from 'react-native';
type Props = {};
export default class MyTextInput extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                autoFocus={this.props.autoFocus || false}
                defaultValue={this.props.defaultValue || ''}
                editable={this.props.editable || true}
                keyboardType={this.props.keyboardType || 'default'}
                maxLength={this.props.maxLength}
                multiline={this.props.multiline || false}
                onBlur={this.props.onBlur}
                onChange={this.props.onChange}
                onChangeText={this.props.onChangeText}
                onEndEditing={this.props.onEndEditing}
                onFocus={this.props.onFocus}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                returnKeyType={this.props.returnKeyType || 'default'}
                secureTextEntry={this.props.secureTextEntry}
                style={this.props.style}
                value={this.props.value}
                returnKeyLabel={this.props.returnKeyLabel}
                underlineColorAndroid={this.props.underlineColorAndroid}
                allowFontScaling={this.props.allowFontScaling || false}
                numberOfLines={this.props.numberOfLines}>
            </TextInput>
        );
    }


}

