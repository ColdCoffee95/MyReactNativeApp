/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Dimensions,
    ActivityIndicator,
    ScrollView,
    View,
    Text
} from 'react-native';
import HttpUtils from '../utils/http'

const {width} = Dimensions.get('window');  //解构赋值 获取屏幕宽度
type Props = {};
export default class RecommandForYou extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            catList: [],
            isLoading: true,
            error: false,
            errorInfo: '',
            leftCheckedIndex: 0
        }
    }

    componentDidMount() {
        this.getFirstAllCategories()
    }

    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
        if (this.state.error) {
            return this.renderErrorView();
        } else {
            return this.renderSuccessView();
        }
    }

    async getFirstAllCategories() {//获取所有一级分类
        let params = {
            catId: -1
        };
        HttpUtils.get('/goodsCat/catList', params, data => {
            data.data.map(value => {
                value.children = []
            });
            this.setState({
                catList: data.data,
                isLoading: false
            });
            console.warn(data.data)
        })
    }

    getSecondCategories(catId) {//获取二级分类
        let clickItem = this.state.catList.find(n => n.id === catId);
        if (clickItem.children.length > 0) {
            return
        }
        let params = {
            catId: catId
        };
        this.setState({isLoading: true});
        HttpUtils.get('/goodsCat/catList', params, data => {
            console.warn('getchild')
            clickItem.children = data.data;
            this.setState({
                isLoading: false
            });
            console.warn(this.state.catList)
        })
    }

    renderLoadingView() {
        return <ActivityIndicator></ActivityIndicator>
    }

    renderErrorView() {

    }

    renderSuccessView() {
        let arr = []
        this.state.catList.map(value => {
            arr.push(
                <View style={styles.leftItem}>
                    <Text style={styles.leftText}
                          onPress={()=>this.getSecondCategories(value.id)}
                    >{value.name}</Text>
                </View>
            )
        })
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView contentContainerStyle={styles.leftScrollView}>
                        {arr}
                    </ScrollView>
                </View>
                <View>
                    <ScrollView contentContainerStyle={styles.rightScrollView}>

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    leftScrollView: {
        flexDirection: 'column',
        width: 80,
    },
    leftItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 50,
        backgroundColor: '#f2f2f2'
    },
    leftCheckedItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 50,
        backgroundColor: 'white',
        borderLeftColor: '#fd4a70',
        borderWidth: 4
    },
    leftText: {},
    rightScrollView: {}

});
