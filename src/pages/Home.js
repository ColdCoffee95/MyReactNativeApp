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
    Text
} from 'react-native';
import HomeSwiper from '../components/business/HomeSwiper'
import PlatformPlate from '../components/business/PlatformPlate'
import HomeCategory from '../components/business/HomeCategory'
import RecommandForYou from '../components/business/RecommandForYou'
type Props = {};
export default class Home extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <HomeSwiper {...this.props}></HomeSwiper>
                    <PlatformPlate {...this.props}></PlatformPlate>
                    <HomeCategory {...this.props}></HomeCategory>
                </ScrollView>
                <RecommandForYou {...this.props}></RecommandForYou>
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container:{
        backgroundColor: whiteColor,
    },
    scrollView: {
        justifyContent:'flex-start',
        alignItems: 'center',
    },
});
