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
import Drawer from "react-native-drawer";
import Icon from 'react-native-vector-icons/FontAwesome';
import {LargeList} from 'react-native-largelist'

import GoodsSideMenu from '../../components/business/GoodsSideMenu'
type Props = {};

export default class GoodsList extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            sideMenuOpening: false,
            isLoading: true,
            loadingMore:false,//是否在下拉加载中
            goodsList: [],
            firstCatId: "",
            secondCatIds: [],
            brandIds: [],
            keyword: "",
            pageSize: 5,
            pageNo: 1,
            type: 1,
            allLoadCompleted: false,//是否全部加载完
            totalNum: 1,
            totalPages:1
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
            goodsList = <LargeList
                ref={ref => this.root = ref}
                bounces={true}
                safeMargin={screenHeight}
                style={{width: screenWidth, height: screenHeight - 100}}
                onLoadMore={() => this.loadMore()}
                refreshing={this.state.loadingMore}
                numberOfSections={()=>1}
                numberOfRowsInSection={() => this.state.pageSize}
                allLoadCompleted={this.state.allLoadCompleted}
                renderCell={this.renderItem.bind(this)}
                heightForCell={() => 120}
                heightForLoadMore={() => 100}
                renderEmpty={() =>
                    <View
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

    sureBtn(obj) {//子组件筛选完成
        this._drawer.close();
        this.state.firstCatId = obj.firstId;
        this.state.secondCatIds = obj.secondIds;
        this.fetchData();
    }

    changeTab(index) {
        if (index === 4) {
            this._drawer.open();
        } else {
            this.state.type = index;
            this.fetchData();
        }
    }

    renderItem(section, row) {

        let goods = this.state.goodsList[row];
        if (goods) {
            return (<View style={styles.goodsView} key={goods.id}>
                <View style={styles.goodsImgView}>
                    <Image
                        style={styles.goodsImg}
                        resizeMode='contain'
                        source={{uri: goods.img + '?imageView2/1/w/200/h/200'}}
                    />
                </View>
                <View style={styles.goodsInfoView}>
                    <View style={styles.goodsTitleView}>
                        <Text numberOfLines={2}>{goods.title}</Text>
                    </View>
                    <View style={styles.goodsPriceView}>
                        <Text style={styles.goodsPrice}>{goods.marketPrice}</Text>
                        <Text style={styles.goodsTrade}>{goods.tradeName}</Text>
                    </View>
                </View>
            </View>)
        }


    }

    loadMore() {
        let params = {
            firstCatId: this.state.firstCatId,
            secondCatIds: this.state.secondCatIds,
            brandIds: this.state.brandIds,
            keyword: this.state.keyword,
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo + 1,
            type: this.state.type
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            // console.warn('loadMore',data.data.list)
            this.state.goodsList = this.state.goodsList.concat(data.data.list);
            this.forceUpdate();
            setTimeout(()=>{
                this.root.reloadData();

            },2000)
            // if(data.data.isLastPage){
            //     this.setState({
            //         allLoadCompleted: true,
            //     });
            // }
            // this.state.goodsList.concat(data.data.list)
            // console.warn('goodslist',this.state.goodsList.length)
            // this.state.loadingMore = false;
            // this.forceUpdate();
            // this.largeList.reloadData();
        })
    }

    async fetchData() {

        this.setState({
            isLoading: true,
            pageNo: 1,
            pageSize: 5
        });
        let params = {
            firstCatId: this.state.firstCatId,
            secondCatIds: this.state.secondCatIds,
            brandIds: this.state.brandIds,
            keyword: this.state.keyword,
            pageSize: 5,
            pageNo: 1,
            type: this.state.type
        };
        console.warn('params',params)
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            console.warn('fetchData',data.data)
            if(data.data.isLastPage){
                this.setState({
                    allLoadCompleted: true,
                });
            }
            this.setState({
                goodsList: data.data.list,
                isLoading: false,
                totalNum: data.data.total,
                totalPages: data.data.pages
            });
        })
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
