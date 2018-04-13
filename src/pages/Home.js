/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import HomeSwiper from '../components/business/HomeSwiper'
import PlatformPlate from '../components/business/PlatformPlate'
import HomeCategory from '../components/business/HomeCategory'
import RecommandForYou from '../components/business/RecommandForYou'
import IdentifyImg from '../components/business/IdentifyImg'

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
                <RecommandForYou {...this.props} header={
                    <ScrollView contentContainerStyle={styles.container}>
                        <HomeSwiper {...this.props}></HomeSwiper>
                        <PlatformPlate {...this.props}></PlatformPlate>
                        <HomeCategory {...this.props}></HomeCategory>
                    </ScrollView>
                }>
                </RecommandForYou>
                <IdentifyImg {...this.props}></IdentifyImg>
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


});
