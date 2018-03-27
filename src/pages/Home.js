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
import HomeSwiper from '../components/business/HomeSwiper'
import PlatformPlate from '../components/business/PlatformPlate'
import HomeCategory from '../components/business/HomeCategory'
import RecommandForYou from '../components/business/RecommandForYou'
import Demo from '../components/business/Demo'
type Props = {};
export default class Home extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <HomeSwiper></HomeSwiper>
                <PlatformPlate></PlatformPlate>
                <HomeCategory></HomeCategory>
                <Demo></Demo>
                {/*<RecommandForYou></RecommandForYou>*/}
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
