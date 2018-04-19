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
    Linking,
    SafeAreaView,
    View
} from 'react-native';

type Props = {};

export default class Hotline extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <Text style={styles.text}>商品/商家投诉，请拨打店力集盒客服电话</Text>
                    <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.callPhone()}>
                        <View style={styles.hotlineView}>
                            <Text>{hotline}</Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </SafeAreaView>
        );
    }

    callPhone() {
        return Linking.openURL('tel:' + hotline)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    text: {
        marginTop: 20,
        marginBottom: 20
    },
    hotlineView: {
        borderWidth: 1,
        borderColor: borderColor,
        padding: 10,
        width: screenWidth - 40,
        alignItems: 'center'
    }
});
