/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native';
import Spinkit from 'react-native-spinkit'
type Props = {};

export default class LoadingView extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.loadingContainer}>
                <Spinkit size={30} type='ThreeBounce' color={activeColor}/>
                {/*<ActivityIndicator size="large" color={activeColor}/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: screenWidth,
        height: screenHeight,
        zIndex: 9999
    },
});
