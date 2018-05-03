/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Text
} from 'react-native';
type Props = {};
export default class MyText extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text
                style={this.props.style}
                allowFontScaling={this.props.allowFontScaling || false}
                selectable={this.props.selectable || true}
                numberOfLines={this.props.numberOfLines}>
                {this.props.children}
            </Text>
        );
    }


}

