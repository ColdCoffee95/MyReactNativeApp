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
export default class RecommandForYou extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            goodsList: [],
            dataComplete: false,
            pageSize: 10,
            pageNo: 1
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.activityTitle}>
                    <Image style={styles.imageLogo} resizeMode='contain' source={require('../../images/tjlogo.png')}/>
                    <Image style={styles.imageTitle} resizeMode='contain' source={require('../../images/tjword.png')}/>
                </View>
                <View style={styles.goodsWrapper}>

                </View>
            </View>
        );
    }
// {this.showPage()}
    async fetchData() {
        let params = {
            type: 1, //1是人气排序
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo
        }
        HttpUtils.post('/goods/catBrandGoodsList', params, data => {
            this.setState({goodsList: data.data});
            this.setState({dataComplete: true});
        })
    }

    showPage() {
        if (this.state.dataComplete) {
            return <FlatList
                data={this.state.goodsList}
                renderItem={({item}) => <Text>{item.key}</Text>}
            />
        } else {
            return <ActivityIndicator animating={this.state.dataComplete}></ActivityIndicator>
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
        height: 300
    },
    catImg: {

        width: width / 8,
        height: width / 8
    },
    catName: {
        marginTop: 10
    }

});
