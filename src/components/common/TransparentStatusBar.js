import React, {Component} from 'react';
import {
    StatusBar
} from 'react-native';
export default class TransparentStatusBar extends Component<Props>{
    render(){
        return <StatusBar
            translucent={true}
            barStyle="light-content"
            backgroundColor={'#00000000'}/>
    }
}