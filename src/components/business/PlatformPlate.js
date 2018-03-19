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
export default class PlatformPlate extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.activityTitle}>
                    <Image style={styles.imageLogo} resizeMode='contain' source={require('../../images/ptlogo.png')}/>
                    <Image style={styles.imageTitle} resizeMode='contain' source={require('../../images/ptword.png')}/>
                </View>
                <View style={styles.topTwoActivity}>
                    <Image style={styles.topLeftImg} resizeMode='contain'
                           source={require('../../images/plat1.png')}/>
                    <Image style={styles.topRightImg} resizeMode='contain'
                           source={require('../../images/plat2.png')}/>
                </View>

                <View style={styles.lastThreeActivity}>
                    <Image style={styles.lastActivityImg} resizeMode='contain'
                           source={require('../../images/plat3.png')}/>
                    <Image style={styles.lastActivityImg} resizeMode='contain'
                           source={require('../../images/plat4.png')}/>
                    <Image style={styles.lastActivityImg} resizeMode='contain'
                           source={require('../../images/plat5.png')}/>
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    activityTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection:'row'
    },
    imageLogo:{
        width: 18,
    },
    imageTitle: {
        width: 81,
        marginLeft:10
    },
    activityWrapper: {
        marginTop: 0,
        width: screenWidth,
        height: 400,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    topTwoActivity: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: screenWidth,
        height: (screenWidth - 6) / 2 * 260 / 375
    },
    topLeftImg: {
        flex: 0.5,
        marginRight: 5
    },
    topRightImg: {
        flex: 0.5,
    },
    lastThreeActivity: {
        backgroundColor: '#fff',
        width: screenWidth,
        height: (260 * screenWidth / 750) * 3 + 5 * 3
    },
    lastActivityImg: {
        flex: 1,
        marginTop: 5,
        width: screenWidth
    }

});
