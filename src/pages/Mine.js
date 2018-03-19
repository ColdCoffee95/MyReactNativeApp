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
type Props = {};
export default class Mine extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {userInfo: {}}
    }

    componentDidMount() {
        this.getUserInfo()
    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }

    async getUserInfo() {
        storage.load({key: 'loginState'}).then(res => {
            HttpUtils.get('/member/selectStoreMemberById', res.memberId, data => {
                console.warn(data.data)
                this.setState({userInfo: data.data});
            })
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});
