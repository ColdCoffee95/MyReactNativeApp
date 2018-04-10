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
    ScrollView,
    TouchableHighlight,
    View,
    Text
} from 'react-native';

type Props = {};
export default class Category extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            catList: [],
            leftLoading: true,
            rightLoading: true,
            currentLeftId: '',//当前左边选中的id

        }
    }

    componentDidMount() {
        this.getFirstAllCategories()
    }

    render() {
        let catList = this.state.catList;
        let leftArr = [];
        catList.map(value => {
            leftArr.push(
                <TouchableHighlight underlayColor='white'
                                    style={value.id === this.state.currentLeftId ? styles.leftCheckedItem : styles.leftItem}
                                    onPress={() => this.getSecondCategories(value.id)} key={value.id}>
                    <View>
                        <Text style={styles.leftText}
                        >{value.name}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        let rightArr = [];
        let leftIndex = this.state.catList.findIndex(n => n.id === this.state.currentLeftId);

        if (!this.state.rightLoading) {
            rightArr.push(
                <TouchableHighlight
                    underlayColor='#f2f2f2'
                    onPress={() => this.clickCategory(this.state.currentLeftId, '')}>
                    <View style={styles.rightCatView} key={0}>
                        <View style={styles.rightCatImgView}>
                            <Image
                                style={styles.rightCatImg}
                                source={{uri: catList[leftIndex].img}}
                                resizeMode='contain'
                            />
                        </View>

                        <Text style={styles.rightCatName}>全部</Text>
                    </View>
                </TouchableHighlight>
            );
            catList[leftIndex].children.map(value => {
                rightArr.push(
                    <TouchableHighlight
                        underlayColor='#f2f2f2'
                        onPress={() => this.clickCategory(value.parentId, value.id)}>
                        <View style={styles.rightCatView} key={value.id}>
                            <View style={styles.rightCatImgView}>
                                <Image
                                    style={styles.rightCatImg}
                                    source={{uri: value.img}}
                                    resizeMode='contain'
                                />
                            </View>
                            <Text style={styles.rightCatName} numberOfLines={1}>{value.name}</Text>
                        </View>
                    </TouchableHighlight>
                )
            });
        }

        return (
            <View style={styles.container}>
                <View>
                    {
                        this.leftLoading ? (
                            <ActivityIndicator></ActivityIndicator>
                        ) : (
                            <ScrollView contentContainerStyle={styles.leftScrollView}>
                                {leftArr}
                            </ScrollView>
                        )
                    }

                </View>
                <View>
                    {
                        this.rightLoading ? (
                            <ActivityIndicator></ActivityIndicator>
                        ) : (
                            <ScrollView contentContainerStyle={styles.rightScrollView}>
                                <Text style={styles.rightTitle}>分类</Text>
                                <View style={styles.rightCatWrapper}>
                                    {rightArr}
                                </View>
                            </ScrollView>
                        )
                    }

                </View>
            </View>
        );
    }

    async getFirstAllCategories() {//获取所有一级分类
        let params = {
            catId: -1
        };
        HttpUtils.get('/goodsCat/catList', params, data => {
            this.setState({
                catList: data.data,
                currentLeftId: data.data[0].id,
                leftLoading: false
            });
            this.getSecondCategories(data.data[0].id);//获取第一个分类的子分类
        })
    }

    clickCategory(parentId, id) {//点击分类
        this.props.navigation.navigate('GoodsList', {id: parentId, secondId: id});
    }

    getSecondCategories(catId) {//获取二级分类
        this.setState({
            currentLeftId: catId,
        });
        let clickItem = this.state.catList.find(n => n.id === catId);
        if (!clickItem.children) {
            this.setState({
                rightLoading: true
            });
            HttpUtils.get('/goodsCat/catList', {catId: catId}, data => {
                clickItem.children = data.data;
                this.setState({
                    rightLoading: false
                });
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex: 1
    },
    leftScrollView: {
        flexDirection: 'column',
        width: 80,
        backgroundColor: '#f2f2f2',
        flex: 1
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
        backgroundColor: '#fff',
        borderLeftWidth: 4,
        borderLeftColor: '#fd4a70'
    },
    leftText: {},
    rightScrollView: {},
    rightTitle: {
        fontSize: 16,
        lineHeight: 50,
        paddingLeft: 10
    },
    rightCatWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        width: screenWidth - 80
    },
    rightCatView: {
        width: (screenWidth - 100) / 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    rightCatImgView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightCatImg: {
        width: 40,
        height: 40
    },
    rightCatName: {
        marginTop: 10,
        color: '#b0b0b0',
        fontSize: 12
    }

});
