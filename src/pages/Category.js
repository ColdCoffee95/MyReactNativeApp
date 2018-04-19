/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingView from '../components/common/LoadingView';
import Toast, {DURATION} from 'react-native-easy-toast';
type Props = {};
export default class Category extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            catList: [],
            leftLoading: true,
            rightLoading: true,
            currentLeftId: '',//当前左边选中的id
            keyword: ''

        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            changeKeyword: this.changeKeyword.bind(this),
            search: this.search.bind(this)
        });
        this.getFirstAllCategories()
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: (
            <View style={styles.searchView}>
                <Icon name='search' size={14} color={borderColor}></Icon>
                <TextInput
                    style={styles.keyword}
                    // autoFocus={true}
                    placeholder="搜索"
                    returnKeyType='done'
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
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <View style={styles.container}>
                    <View>
                        {
                            this.leftLoading ? (
                                <LoadingView/>
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
                                <LoadingView/>
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
                <Toast ref='toast' position='center'></Toast>
            </SafeAreaView>
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
        let secondIds = [];
        if (id) {
            secondIds = [id];
        }
        this.props.navigation.navigate('GoodsList', {id: parentId, secondIds: secondIds});
    }

    changeKeyword(text) {
        this.state.keyword = text.trim();
    }

    search() {
        if (!this.state.keyword) {
            this.refs.toast.show('请输入关键字');
            return;
        }
        this.props.navigation.navigate('GoodsList', {keyword: this.state.keyword})
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
        backgroundColor: whiteColor,
        flexDirection: 'row',
        flex: 1
    },
    leftScrollView: {
        flexDirection: 'column',
        width: 80,
        backgroundColor: '#f2f2f2',
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
