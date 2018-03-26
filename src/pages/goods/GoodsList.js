/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    ActivityIndicator,
    Linking,
    TextInput,
    Image,
    View
} from 'react-native';
import {DrawerNavigator} from "react-navigation";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import SideMenu from 'react-native-side-menu'
import GoodsSideMenu from '../../components/business/GoodsSideMenu'
import {Drawer} from 'teaset'
import ActiveButton from '../../components/common/ActiveButton'
type Props = {};

export default class GoodsList extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            sideMenuOpening: false,
            isLoading: true,
            firstCategories: [],
            secondCategories: [],
            currentFirstId: '',//右侧筛选中暂时的id
            currentSecondIds: [],//右侧筛选中暂时的id
            goodsList: [],
            firstCatId: "",
            secondCatIds: [],
            brandIds: [],
            keyword: "",
            pageSize: 5,
            pageNo: 0,
            type: 1,
        }
    }

    render() {
        let goodsList = null;
        if (this.state.isLoading) {
            goodsList = <ActivityIndicator style={styles.loadingStyle}></ActivityIndicator>
        } else {
            goodsList = [];
            this.state.goodsList.map(value => {
                goodsList.push(
                    <View style={styles.goodsView}>
                        <View style={styles.goodsImgView}>
                            <Image
                                style={styles.goodsImg}
                                resizeMode='contain'
                                source={{uri: value.img + '?imageView2/1/w/200/h/200'}}
                            />
                        </View>
                        <View style={styles.goodsInfoView}>
                            <View style={styles.goodsTitleView}>
                                <Text numberOfLines={2}>{value.title}</Text>
                            </View>
                            <View style={styles.goodsPriceView}>
                                <Text style={styles.goodsPrice}>{value.marketPrice}</Text>
                                <Text style={styles.goodsTrade}>{value.tradeName}</Text>
                            </View>
                        </View>
                    </View>
                )
            });
        }
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar />}
                    style={{marginTop: 10, marginBottom: 0}}
                    tabBarActiveTextColor={activeColor}
                    tabBarUnderlineStyle={styles.underlineStyle}
                    initialPage={0}
                    onChangeTab={(index) => this.changeTab(index)}
                    scrollWithoutAnimation={true}
                >
                    <View tabLabel='人气' style={styles.consult}>
                        {goodsList}
                    </View>
                    <View tabLabel='销量' style={styles.consult}>
                        {goodsList}
                    </View>
                    <View tabLabel='新品' style={styles.consult}>
                        {goodsList}
                    </View>
                    <View tabLabel='筛选' style={styles.consult}>
                        {goodsList}
                    </View>
                </ScrollableTabView>
            </View>
        );
    }

    changeTab(index) {
        if (index.i === 3) {
            this.openDrawer();
        } else {
            this.state.type = index.i + 1;
            this.fetchData();
        }
    }

    async openDrawer() {//打开右侧筛选侧栏
        let firstCategories = await this.getFirstCategories();
        let renderFirstCategories = [];
        firstCategories.map(value => {
            renderFirstCategories.push(
                <TouchableHighlight underlayColor='#fff' onPress={() => this.getSecondCategories(value.id)}>
                    <View style={this.state.currentFirstId === value.id ? styles.activeFirst : styles.negativeFirst}>
                        <Text
                            style={this.state.currentFirstId === value.id ? styles.activeText : styles.negativeText}>{value.name}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        let secondCategories = this.state.secondCategories;
        let renderSecondCategories = [];
        secondCategories.map(value => {
            renderSecondCategories.push(
                <TouchableHighlight underlayColor='#fff' onPress={() => this.getSecondCategories(value.id)}>
                    <View
                        style={this.state.currentSecondIds.indexOf(value.id) !== -1 ? styles.activeFirst : styles.negativeFirst}>
                        <Text
                            style={this.state.currentSecondIds.indexOf(value.id) !== -1 ? styles.activeText : styles.negativeText}>{value.name}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        let sideMenu = <View style={styles.sideMenuView}>
            <View>
                <Text>类目</Text>
                <View style={styles.catView}>
                    {renderFirstCategories}
                </View>
            </View>
            <View>
                <Text>分类</Text>
                <View style={styles.catView}>
                    {renderSecondCategories}
                </View>
            </View>
        </View>;
        Drawer.open(sideMenu, 'right')
    }

    getFirstCategories() {//筛选侧栏里获取分类列表
        return new Promise((resolve, reject) => {
            if (this.state.firstCategories.length > 0) {
                resolve(this.state.firstCategories);
            } else {
                HttpUtils.get('/goodsCat/catList', {catId: -1}, data => {
                    this.setState({firstCategories: data.data});
                })
            }
        });
    }

    getSecondCategories(id) {//筛选侧栏点击第一级分类获取第二级分类
        this.setState({currentFirstId: id});
        HttpUtils.get('/goodsCat/catList', {catId: id}, data => {
            this.setState({secondCategories: data.data});
        })
    }

    fetchData() {
        let params = {
            firstCatId: this.state.firstCatId,
            secondCatIds: this.state.secondCatIds,
            brandIds: this.state.brandIds,
            keyword: this.state.keyword,
            pageSize: 5,
            pageNo: 1,
            type: this.state.type
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            console.warn(JSON.stringify(params))
            this.setState({
                goodsList: data.data.list,
                isLoading: false
            });
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    loadingStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    underlineStyle: {
        backgroundColor: '#fff'
    },
    sideMenuView: {
        width: screenWidth * 2 / 3
    },
    catView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    activeFirst: {
        backgroundColor: '#fce7e9',
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    negativeFirst: {
        backgroundColor: '#f7f7f7',
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeText: {
        color: activeColor
    },
    negativeText: {
        color: '#333'
    },
    goodsView: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: borderColor,
        padding: 10
    },
    goodsImgView: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.3
    },
    goodsImg: {
        width: 80,
        height: 80
    },
    goodsInfoView: {
        justifyContent: 'space-between',
        flex: 0.7
    },
    goodsTitleView: {},
    goodsPriceView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    goodsPrice: {
        color: activeColor
    },
    goodsTrade: {
        color: '#c685ff'
    }
});
