import React, {Component} from 'react';
import {
    StatusBar
} from 'react-native';
export default class CommonStatusBar extends Component<Props> {
    render() {
        return <StatusBar
            translucent={false}
            />
    }
}