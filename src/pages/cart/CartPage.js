/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import RecommandForYou from '../../components/business/RecommandForYou'
import Cart from '../../pages/cart/Cart';

type Props = {};
export default class CartPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <RecommandForYou {...this.props} header={
                        <Cart {...this.props}/>
                }>
                </RecommandForYou>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteColor,
    },
    scrollView: {
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchView: {
        borderColor: borderColor,
        borderWidth: 1,
        width: screenWidth * 0.7,
        height: 30,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    keyword: {
        width: screenWidth * 0.7 - 40,
        height: 50,
        paddingLeft: 10,
        fontSize: 14
    },
    rightSearch: {
        width: screenWidth * 0.15,
        alignItems: 'center',
    }
});
