/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';

type Props = {};
export default class GoodsDetail extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>

            </ScrollView>

        );
    }


}
const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        alignItems: 'center',
    },
});
