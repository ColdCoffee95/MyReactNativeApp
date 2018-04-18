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
    TextInput,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import HomeSwiper from '../components/business/HomeSwiper'
import PlatformPlate from '../components/business/PlatformPlate'
import HomeCategory from '../components/business/HomeCategory'
import RecommandForYou from '../components/business/RecommandForYou'
import IdentifyImg from '../components/business/IdentifyImg'
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {};
export default class Home extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            keyword: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.setParams({
                changeKeyword: this.changeKeyword.bind(this),
                search: this.search.bind(this)
            });
            this.setState({isLoading: false})
        }, 5)
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: (
            <View style={styles.searchView}>
                <Icon name='search' size={14} color={borderColor}></Icon>
                <TextInput
                    style={styles.keyword}
                    // autoFocus={true}
                    placeholder="搜索"
                    // onEndEditing={(text) => {
                    //     navigation.setParams({keyword: text})
                    // }}
                    onChangeText={(text) => navigation.state.params.changeKeyword(text)}
                    underlineColorAndroid='transparent'
                />

            </View>
        ),
        headerRight: (
            <TouchableOpacity onPress={() => navigation.state.params.search()}>
                <View style={styles.rightSearch}>
                    <Text>搜索</Text>
                </View>
            </TouchableOpacity>
        )

    });

    render() {
        if (this.state.isLoading) {
            return <View style={styles.loadingContainer}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        } else {
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

    changeKeyword(text) {
        this.state.keyword = text;
    }

    search() {
        if (this.state.keyword) {
            this.props.navigation.navigate('GoodsList', {keyword: this.state.keyword})
        }
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
