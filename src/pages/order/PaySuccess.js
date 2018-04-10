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
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    View
} from 'react-native';
import ActiveButton from '../../components/common/ActiveButton';

type Props = {};
export default class PaySuccess extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        } else {
            return
        }
    }

    fetchData() {

    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,

    },

});
