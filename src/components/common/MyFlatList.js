/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList
} from 'react-native';

type Props = {};

export default class FormCell extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <FlatList />;
    }


}

const styles = StyleSheet.create({

});
