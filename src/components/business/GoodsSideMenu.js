/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    ActivityIndicator,
    View,
    Text
} from 'react-native';
type Props = {};
export default class GoodsSideMenu extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            catList: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>123</Text>
            </View>
        );
    }

    async fetchData() {
        HttpUtils.get('/goodsCat/catList', {catId: -1}, data => {
            this.setState({catList: data.data});
            this.setState({isLoading: false});
        })
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        width:100,
        height:100
    },
    loadingStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        width: screenWidth,
    },
    imageLogo: {
        width: 18,
    },
    imageTitle: {
        width: 81,
        marginLeft: 10
    },
    catWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: screenWidth,
    },
    imgWrapper: {
        width: screenWidth / 4,
        alignItems: 'center',

    },
    catImg: {

        width: screenWidth / 8,
        height: screenWidth / 8
    },
    catName: {
        marginTop: 10,
        marginBottom: 10,
    }

});
