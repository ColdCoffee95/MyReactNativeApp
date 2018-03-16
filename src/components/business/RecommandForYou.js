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
    View,
    FlatList,
    Text
} from 'react-native';
import HttpUtils from '../../utils/http'

const {width} = Dimensions.get('window');  //解构赋值 获取屏幕宽度
type Props = {};
let pageNo = 1;
let totalPage = 5;
let pageSize = 6;
export default class RecommandForYou extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            goodsList: [],
            isLoading: true,
            error: false,
            errorInfo: '',
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing: false,//下拉控制
        }
    }

    componentDidMount() {
        this.fetchData(pageNo)
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

    async fetchData(pageNo) {
        console.warn('123')
        this.setState({
            showFoot: 2,
        });
        let params = {
            type: 1, //1是人气排序
            pageSize: pageSize,
            pageNo: pageNo
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            totalPage = data.data.pages;
            let foot = 0;
            if (pageNo >= data.data.pages) {
                foot = 1;
            }
            this.setState({
                goodsList: this.state.goodsList.concat(data.data.list),
                showFoot: foot,
                isLoading: false,
            });
        })
    }

    _renderItem = ({item}) => (
        <View style={styles.singleGoods}>
            <View style={styles.goodsImgView}>
                <Image
                    source={{uri: item.img + '?imageView2/1/w/100/h/100'}}
                    style={styles.goodsImg}
                    resizeMode='contain'
                />
            </View>
            <Text style={styles.goodsTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.goodsPrice}>{item.marketPrice}</Text>
        </View>
    );

    renderLoadingView() {
        return <ActivityIndicator></ActivityIndicator>
    }

    renderErrorView() {

    }

    renderSuccessView() {
        return (
            <View style={styles.container}>
                <View style={styles.activityTitle}>
                    <Image style={styles.imageLogo} resizeMode='contain' source={require('../../images/tjlogo.png')}/>
                    <Image style={styles.imageTitle} resizeMode='contain' source={require('../../images/tjword.png')}/>
                </View>
                <FlatList
                    data={this.state.goodsList}
                    renderItem={this._renderItem}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={0.1}
                    refreshing={this.state.isLoading}
                    numColumns={2}
                />
            </View>
        );
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((pageNo != 1) && (pageNo >= totalPage)) {
            return;
        } else {
            pageNo++;
        }

        //获取数据
        this.fetchData(pageNo);
    }

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    activityTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        width: width
    },
    imageLogo: {
        width: 18,
    },
    imageTitle: {
        width: 81,
        marginLeft: 10
    },
    goodsWrapper: {
        width: width,
    },
    catImg: {

        width: width / 8,
        height: width / 8
    },
    catName: {
        marginTop: 10
    },
    singleGoods: {
        backgroundColor: '#fff',
        width: (width - 30) / 2,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        justifyContent: 'flex-end',
        marginBottom: 10,
        marginLeft: 10
    },
    goodsImgView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width - 30) / 2,
        height: 150

    },
    goodsImg: {
        width: 100,
        height: 100
    },
    goodsTitle: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    goodsPrice: {
        color: '#fd4a70',
        margin: 10,
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    }

});
