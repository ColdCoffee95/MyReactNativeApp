import React, {Component} from 'react';
import {
    StatusBar
} from 'react-native';
export default class TransparentStatusBar extends Component<Props> {
    render() {
        return <StatusBar
            translucent={true}
            hidden={this.props.hidden}
            barStyle="light-content"
            backgroundColor={'#00000000'}/>
    }
}