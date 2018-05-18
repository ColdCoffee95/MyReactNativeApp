/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image,
    View,
} from 'react-native';
import Drawer from "react-native-drawer";
import Icon from 'react-native-vector-icons/FontAwesome';
import GoodsSideMenu from '../../components/business/GoodsSideMenu'
import Text from '../../components/common/MyText';
import TextInput from '../../components/common/MyTextInput';

type Props = {};

export default class GoodsList extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            sideMenuOpening: false,
            isLoading: true,
            loadingMore: false,//是否在上拉拉加载更多中
            goodsList: [],
            firstCategoryId: "",
            secondCategoryIds: [],
            brandIds: [],
            keyword: "",
            pageSize: 10,
            pageNo: 1,
            type: 1,
            orderByOrders: 'asc',//销量排序
            orderByPv: 'asc',//人气排序
            tradeType: '',
            allLoadCompleted: false,//是否全部加载完
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            changeKeyword: this.changeKeyword.bind(this),
            search: this.search.bind(this)
        });
        this.state.firstCategoryId = this.props.navigation.state.params.id || '';
        this.state.secondCategoryIds = this.props.navigation.state.params.secondIds || [];
        this.state.brandIds = this.props.navigation.state.params.brandIds || [];
        this.state.keyword = this.props.navigation.state.params.keyword || '';
        this.fetchData();
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: (

            <View style={styles.searchView}>
                <Icon name='search' size={14} color={borderColor}></Icon>
                <TextInput
                    style={styles.keyword}
                    // autoFocus={true}
                    defaultValue={navigation.state.params.keyword || ''}
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

            <TouchableOpacity
                onPress={() => navigation.state.params && navigation.state.params.search && navigation.state.params.search()}>
                <View style={styles.rightSearch}>
                    <Text>搜索</Text>
                </View>
            </TouchableOpacity>
        )

    });

    render() {
        let goodsList = null;
        if (this.state.isLoading) {
            goodsList = <View/>
        } else {
            goodsList = <FlatList
                data={this.state.goodsList}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.2}
                refreshing={true}
                ItemSeparatorComponent={() => <View
                    style={{backgroundColor: borderColor, height: 1}}
                />}
                ListFooterComponent={this._renderFooter.bind(this)}
                ListEmptyComponent={() => <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50
                    }}
                >
                    <Image
                        style={{width: 200, height: 200}}
                        resizeMode='contain'
                        source={require('../../images/noGoods.png')}
                    />
                    <Text>暂无此类商品，请重新搜索吧</Text>
                </View>}
            />
        }

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <Drawer
                    type="overlay"
                    ref={(ref) => this._drawer = ref}
                    content={<GoodsSideMenu
                        firstId={this.props.navigation.state.params.id || ''}
                        secondIds={this.props.navigation.state.params.secondId ?
                            [this.props.navigation.state.params.secondId] : []}
                        conditions={{
                            firstCategoryId: this.state.firstCategoryId,
                            secondCategoryIds: this.state.secondCategoryIds,
                            brandIds: this.state.brandIds,
                            keyword: this.state.keyword,
                            tradeType: this.state.tradeType
                        }}
                        sureBtn={(obj) => this.sureBtn(obj)}/>}
                    openDrawerOffset={0.2}
                    panCloseMask={0.2}
                    side="right"
                    tapToClose={true}
                    styles={{
                        mainOverlay: {
                            backgroundColor: 'black',
                            opacity: 0,
                        },
                    }}
                    tweenHandler={(ratio) => ({
                        mainOverlay: {
                            opacity: ratio / 2,
                        }
                    })}
                >
                    <View style={styles.container}>
                        <View style={styles.tabView}>
                            <TouchableOpacity
                                onPress={() => this.changeTab(1)}>
                                <View style={styles.singleTab}>
                                    <Text
                                        style={this.state.type === 1 ? styles.activeTab : styles.negativeTab}>人气</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.changeTab(2)}>
                                <View style={styles.singleTab}>
                                    <Text
                                        style={this.state.type === 2 ? styles.activeTab : styles.negativeTab}>销量</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.changeTab(3)}>
                                <View style={styles.singleTab}>
                                    <Text
                                        style={this.state.type === 3 ? styles.activeTab : styles.negativeTab}>新品</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.changeTab(4)}>
                                <View style={styles.singleTab}>
                                    <Text
                                        style={this.state.type === 4 ? styles.activeTab : styles.negativeTab}>筛选</Text>
                                    <Icon name="filter" size={16}></Icon>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            !this.state.isLoading && goodsList
                        }
                    </View>
                </Drawer>
            </SafeAreaView>

        );
    }

    _renderFooter() {
        if (this.state.loadingMore) {
            return (<View/>)
        } else if (this.state.allLoadCompleted) {
            if (this.state.goodsList.length > 0) {
                return (<View style={{alignItems: 'center', height: 30, justifyContent: 'center'}}>
                    <Text>没有更多商品了</Text>
                </View>)
            } else {
                return <View></View>
            }
        } else {
            return (<View></View>)
        }
    }

    _onEndReached() {
        if (this.state.allLoadCompleted || this.state.loadingMore) {
            return;
        }
        this.state.loadingMore = true;
        this.state.pageNo += 1;
        let params = {
            firstCategoryId: this.state.firstCategoryId,
            secondCategoryIds: this.state.secondCategoryIds,
            brandIds: this.state.brandIds,
            keyword: this.state.keyword,
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo,
            orderByOrders: this.state.orderByOrders,
            orderByPv: this.state.orderByPv,
            orderByPrice: this.state.orderByPrice,
            tradeType: this.state.tradeType
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({goodsList: this.state.goodsList.concat(data.data.list), loadingMore: false});
        })
    }

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => {
        let sellout = <View></View>
        if (item.count === 0) {
            sellout = <Image
                style={styles.goodsImgSellout}
                resizeMode='contain'
                source={require('../../images/sellout.png')}
            />;
        }

        return <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.goodsDetail(item.id)}>
            <View style={styles.goodsView} key={item.id}>
                <View style={styles.goodsImgView}>
                    <Image
                        style={styles.goodsImg}
                        resizeMode='contain'
                        source={{uri: item.img + '?imageMogr2/thumbnail/200x200'}}
                    />
                    {sellout}
                </View>
                <View style={styles.goodsInfoView}>
                    <View style={styles.goodsTitleView}>
                        <Text numberOfLines={2}>{item.title}</Text>
                    </View>
                    <View style={styles.goodsPriceView}>
                        <Text style={styles.goodsPrice}>¥{item.marketPrice}</Text>
                        <Text style={{color: this.getColor(item.tradeType)}}>{item.tradeName}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    }

    sureBtn(obj) {//子组件筛选完成
        this._drawer.close();
        setTimeout(() => {
            this.state.firstCategoryId = obj.firstId;
            this.state.secondCategoryIds = obj.secondIds;
            this.state.tradeType = obj.tradeType;
            this.fetchData();
        }, 500)


    }

    changeKeyword(text) {
        this.state.keyword = text.trim();
    }

    search() {
        if (!this.state.keyword) {
            ToastUtil.show('请输入关键字');
            return;
        }
        this.fetchData();
    }

    changeTab(index) {
        if (this.state.type === index) {
            return;
        }
        if (index === 4) {
            this._drawer.open();
        } else {
            this.state.type = index;
            this.fetchData();
        }
    }

    goodsDetail(id) {
        this.props.navigation.navigate('GoodsDetail', {id: id});
    }

    async fetchData() {
        this.state.isLoading = true;
        this.state.pageNo = 1;
        let params = {
            firstCategoryId: this.state.firstCategoryId,
            secondCategoryIds: this.state.secondCategoryIds,
            brandIds: this.state.brandIds,
            keyword: this.state.keyword,
            pageSize: this.state.pageSize,
            orderByOrders: this.state.orderByOrders,
            orderByPv: this.state.orderByPv,
            orderByPrice: this.state.orderByPrice,
            pageNo: 1,
            tradeType: this.state.tradeType
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            console.warn('fetchData', data.data.list)
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({
                goodsList: data.data.list,
                isLoading: false,
            });
        })
    }

    getColor(type) {
        let color = '#78E285';
        cartTabList.map(value => {
            if (value.id === type) {
                color = value.color;
            }
        });
        return color;
    }

}

const styles = StyleSheet.create({
    openingContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
        opacity: 0.1
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: screenWidth,
        backgroundColor: whiteColor,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    singleTab: {
        width: screenWidth / 4,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        color: activeColor
    },
    negativeTab: {
        color: '#444'
    },
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

    goodsView: {
        flexDirection: 'row',
        padding: 10,
        width: screenWidth,
        height: 120,
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
    goodsImgSellout: {
        position: 'absolute',
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
    },
    searchView: {
        borderColor: borderColor,
        borderWidth: 1,
        width: screenWidth * 0.65,
        height: 30,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    keyword: {
        width: screenWidth * 0.65 - 40,
        height: 50,
        paddingLeft: 10,
        fontSize: 14
    },
    rightSearch: {
        width: screenWidth * 0.2,
        alignItems: 'center',
    }
});
