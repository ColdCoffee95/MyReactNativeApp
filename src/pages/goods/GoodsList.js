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
    FlatList,
    Image,
    View
} from 'react-native';
import Drawer from "react-native-drawer";
import Icon from 'react-native-vector-icons/FontAwesome';
import GoodsSideMenu from '../../components/business/GoodsSideMenu'
type Props = {};

export default class GoodsList extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            sideMenuOpening: false,
            isLoading: true,
            loadingMore: false,//是否在下拉加载中
            goodsList: [],
            firstCatId: "",
            secondCatIds: [],
            brandIds: [],
            keyword: "",
            pageSize: 10,
            pageNo: 1,
            type: 1,
            allLoadCompleted: false,//是否全部加载完
        }
    }

    componentDidMount() {
        this.state.firstCatId = this.props.navigation.state.params.id || '';
        this.state.secondCatIds = this.props.navigation.state.params.secondId ?
            [this.props.navigation.state.params.secondId] : []
        this.fetchData();
    }

    render() {
        let goodsList = null;
        if (this.state.isLoading) {
            goodsList = <ActivityIndicator style={styles.loadingStyle}></ActivityIndicator>
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
                        style={{width: 100, height: 100}}
                        resizeMode='contain'
                        source={require('../../images/no-order.jpg')}
                    />
                </View>}
            />
        }

        return (
            <Drawer
                type="overlay"
                ref={(ref) => this._drawer = ref}
                content={<GoodsSideMenu
                    firstId={this.props.navigation.state.params.id || ''}
                    secondIds={this.props.navigation.state.params.secondId ?
                        [this.props.navigation.state.params.secondId] : []}
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
                        <TouchableHighlight
                            onPress={() => this.changeTab(1)}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text style={this.state.type === 1 ? styles.activeTab : styles.negativeTab}>人气</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.changeTab(2)}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text style={this.state.type === 2 ? styles.activeTab : styles.negativeTab}>销量</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.changeTab(3)}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text style={this.state.type === 3 ? styles.activeTab : styles.negativeTab}>新品</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.changeTab(4)}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text style={this.state.type === 4 ? styles.activeTab : styles.negativeTab}>筛选</Text>
                                <Icon name="filter" size={16}></Icon>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {goodsList}
                </View>
            </Drawer>

        );
    }

    _renderFooter() {
        if (this.state.loadingMore) {
            return (<View>
                <ActivityIndicator></ActivityIndicator>
            </View>)
        } else if (this.state.allLoadCompleted) {
            return (<View style={{alignItems:'center', height: 30, justifyContent: 'center'}}>
                <Text>没有更多商品了</Text>
            </View>)
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
            firstCatId: this.state.firstCatId,
            secondCatIds: this.state.secondCatIds,
            brandIds: this.state.brandIds,
            keyword: this.state.keyword,
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo,
            type: this.state.type
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            if (data.data.isLastPage) {
                this.state.allLoadCompleted = true;
            }
            this.setState({goodsList:this.state.goodsList.concat(data.data.list)});
            this.state.loadingMore = false;
        })
    }

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.goodsDetail(item.id)}>
            <View style={styles.goodsView} key={item.id}>
                <View style={styles.goodsImgView}>
                    <Image
                        style={styles.goodsImg}
                        resizeMode='contain'
                        source={{uri: item.img + '?imageView2/1/w/200/h/200'}}
                    />
                </View>
                <View style={styles.goodsInfoView}>
                    <View style={styles.goodsTitleView}>
                        <Text numberOfLines={2}>{item.title}</Text>
                    </View>
                    <View style={styles.goodsPriceView}>
                        <Text style={styles.goodsPrice}>{item.marketPrice}</Text>
                        <Text style={{color: this.getColor(item.tradeType)}}>{item.tradeName}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    sureBtn(obj) {//子组件筛选完成
        this._drawer.close();
        setTimeout(()=>{
            this.state.firstCatId = obj.firstId;
            this.state.secondCatIds = obj.secondIds;
            this.fetchData();
        },500)


    }

    changeTab(index) {
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
        this.setState({
            isLoading: true,
            pageNo: 1,
        });
        let params = {
            firstCatId: this.state.firstCatId,
            secondCatIds: this.state.secondCatIds,
            brandIds: this.state.brandIds,
            keyword: this.state.keyword,
            pageSize: this.state.pageSize,
            pageNo: 1,
            type: this.state.type
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            console.warn('fetchData', data.data)
            if (data.data.isLastPage) {
                this.setState({
                    allLoadCompleted: true,
                });
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
        backgroundColor: '#ccc',
        opacity: 0.1
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
