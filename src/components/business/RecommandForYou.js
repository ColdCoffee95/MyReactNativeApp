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
    FlatList,
    Text,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
export default class RecommandForYou extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            goodsList: [],
            allLoadCompleted:false,
            pageSize:10,
            pageNo:1,
            isLoading:false,
            type:1
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.activityTitle}>
                <Image style={styles.imageLogo} resizeMode='contain' source={require('../../images/tjlogo.png')}/>
                <Image style={styles.imageTitle} resizeMode='contain' source={require('../../images/tjword.png')}/>
            </View>
            <FlatList
                data={this.state.goodsList}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.05}
                numColumns={2}

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
            <Toast ref='toast' position='center'></Toast>
        </View>
    }
    _onEndReached() {
        if (this.state.allLoadCompleted) {
            this.refs.toast.show('到底了',500)
            return;
        }
        this.state.pageNo += 1;
        let params = {
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo,
            type: this.state.type
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            console.warn('reached')
            if (data.data.isLastPage) {
                this.setState({
                    allLoadCompleted: true,
                });
            }
            this.setState({
                goodsList: this.state.goodsList.concat(data.data.list),
            });
        })
    }

    _keyExtractor = (item, index) => item.id;
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

    async fetchData() {
        this.setState({
            isLoading: true,
            pageNo: 1,
        });
        let params = {
            pageSize: 10,
            pageNo: 1,
            type: this.state.type
        };
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width:screenWidth,
    },
    activityTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        width: screenWidth
    },
    imageLogo: {
        width: 18,
    },
    imageTitle: {
        width: 81,
        marginLeft: 10
    },
    goodsWrapper: {
        width: screenWidth,
    },
    catImg: {

        width: screenWidth / 8,
        height: screenWidth / 8
    },
    catName: {
        marginTop: 10
    },
    singleGoods: {
        backgroundColor: '#fff',
        width: (screenWidth - 30) / 2,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        justifyContent: 'flex-end',
        marginBottom: 10,
        marginLeft: 10
    },
    goodsImgView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (screenWidth - 30) / 2,
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
