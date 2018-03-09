/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Button,
    Image,
    Text,
    TextInput,
    View
} from 'react-native';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import HttpUtils from '../utils/http'
type Props = {};
export default class IndexPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {loginId: '', pwd: ''}
    }

    render() {
        return (
            <View/>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    version: {
        marginTop: 20
    },
    logo: {
        marginTop: 40,
        width: 100,
        height: 100,
    },

    phone: {
        width: 200,
        marginTop: 20
    },
    password: {
        width: 200
    },
});
