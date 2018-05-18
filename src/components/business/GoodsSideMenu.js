/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import ActiveButton from '../../components/common/ActiveButton'
import Text from '../common/MyText';
type Props = {};
export default class GoodsSideMenu extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            firstCategories: [],//第一级分类列表
            secondCategories: [],//第二级分类列表
            currentFirstId: '',//选中的第一级分类
            currentSecondIds: [],//选中的第二级分类
            tradeType: ''//选中的贸易形态
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        let renderTradeTypes = [];
        cartTabList.map(value => {
            renderTradeTypes.push(
                <TouchableHighlight key={value.id} underlayColor='#fff' onPress={() => this.clickTradeType(value.id)}>
                    <View
                        style={this.state.tradeType === value.id ? styles.activeFirst : styles.negativeFirst}>
                        <Text
                            numberOfLines={1}
                            style={this.state.tradeType === value.id ? styles.activeText : styles.negativeText}>{value.name}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        let renderFirstCategories = [];
        this.state.firstCategories.map(value => {
            renderFirstCategories.push(
                <TouchableHighlight key={value.id} underlayColor='#fff' onPress={() => this.clickFirstCat(value.id)}>
                    <View
                        style={this.state.currentFirstId === value.id ? styles.activeFirst : styles.negativeFirst}>
                        <Text
                            numberOfLines={1}
                            style={this.state.currentFirstId === value.id ? styles.activeText : styles.negativeText}>{value.name}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        let secondCategories = this.state.secondCategories;
        let renderSecondCategories = [];
        secondCategories.map(value => {
            renderSecondCategories.push(
                <TouchableHighlight key={value.id} underlayColor='#fff' onPress={() => this.clickSecondId(value.id)}>
                    <View
                        style={this.state.currentSecondIds.indexOf(value.id) !== -1 ? styles.activeFirst : styles.negativeFirst}>
                        <Text
                            numberOfLines={1}
                            style={this.state.currentSecondIds.indexOf(value.id) !== -1 ? styles.activeText : styles.negativeText}>{value.name}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        let secondList = null;
        if (renderSecondCategories.length > 0) {
            secondList = <View>
                <Text style={styles.catTitle}>分类</Text>
                <View style={styles.catView}>
                    {renderSecondCategories}
                </View>
            </View>
        } else {
            secondList = <View>

            </View>;
        }
        return <View style={styles.sideMenuView}>
            <View>
                <Text style={styles.catTitle}>贸易形态</Text>
                <View style={styles.catView}>
                    {renderTradeTypes}
                </View>
            </View>
            <View>
                <Text style={styles.catTitle}>类目</Text>
                <View style={styles.catView}>
                    {renderFirstCategories}
                </View>
            </View>
            {secondList}
            <View style={styles.bottomView}>
                <ActiveButton
                    style={styles.resetButton}
                    textStyle={styles.resetButtonText}
                    text="重置"
                    clickBtn={() => this.resetBtn()}>
                </ActiveButton>
                <ActiveButton
                    style={styles.activeButton}
                    textStyle={styles.activeButtonText}
                    text="确定"
                    clickBtn={() => this.props.sureBtn({
                        firstId: this.state.currentFirstId,
                        secondIds: this.state.currentSecondIds,
                        tradeType: this.state.tradeType
                    })}>
                </ActiveButton>
            </View>
        </View>;
    }

    resetBtn() {//重置按钮
        this.setState({
            secondCategories: [],
            currentFirstId: '',
            currentSecondIds: []
        })
    }

    async fetchData() {//获取数据
        // this.getCatBrandGoodsList();

        this.searchGoodsSku(this.props.conditions)

        // this.getFirstCategories();
        // if (this.props.firstId) {
        //     this.clickFirstCat(this.props.firstId);
        // }
        // if (this.props.secondIds) {
        //     this.props.secondIds.map(value => {
        //         this.clickSecondId(value);
        //     })
        // }
    }
    searchGoodsSku(conditions){
        HttpUtils.post('/goodsV1/searchGoodsCondition',conditions,data=>{
            console.warn('searchGoodsSku',data)
        })
    }
    // getCatBrandGoodsList() {
    //     let params = {
    //         firstCatId: this.state.firstCatId,
    //         secondCatIds: this.state.secondCatIds,
    //         brandIds: this.state.brandIds,
    //         keyword: this.state.keyword,
    //         pageSize: 5,
    //         pageNo: 1,
    //         type: this.state.type,
    //         tradeType: this.state.tradeType
    //     };
    //     HttpUtils.post('/goods/catBrandGoodsList', params, data => {
    //         console.warn(JSON.stringify(params))
    //         this.setState({
    //             goodsList: data.data.list,
    //             isLoading: false
    //         });
    //     })
    // }

    getFirstCategories() {//筛选侧栏里获取分类列表
        HttpUtils.get('/goodsCat/catList', {catId: -1}, data => {
            this.setState({firstCategories: data.data});
        })
    }

    clickFirstCat(id) {//筛选侧栏点击第一级分类获取第二级分类
        if (this.state.currentFirstId === id) {
            this.setState({currentFirstId: '', secondCategories: [], currentSecondIds: []});
        } else {
            this.setState({currentFirstId: id, currentSecondIds: []});
            HttpUtils.get('/goodsCat/catList', {catId: id}, data => {
                this.setState({secondCategories: data.data});
            })
        }
    }

    clickTradeType(id) {//点击贸易形态
        if (this.state.tradeType === id) {
            this.setState({tradeType: ''});
        } else {
            this.setState({tradeType: id});
        }
    }

    clickSecondId(id) {//点击第二级分类
        let arr = this.state.currentSecondIds;
        let index = arr.findIndex(value => value === id);
        if (index !== -1) {
            arr.splice(index, 1);
        } else {
            arr.push(id);
        }
        this.setState({currentSecondIdsId: arr});
    }


}

const styles = StyleSheet.create({
    sideMenuView: {
        backgroundColor: whiteColor,
        flex: 1,
    },
    catView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    catTitle: {
        marginTop: 10,
        marginLeft: 10,
    },
    activeFirst: {
        backgroundColor: '#fce7e9',
        width: ((screenWidth * 4 / 5) - 40) / 3,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
    negativeFirst: {
        backgroundColor: '#f7f7f7',
        width: ((screenWidth * 4 / 5) - 40) / 3,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
    activeText: {
        color: activeColor,
        fontSize: 12
    },
    negativeText: {
        color: '#333',
        fontSize: 12
    },
    activeButton: {
        width: (screenWidth * 4 / 5) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: activeColor,
        height: 30
    },
    resetButton: {
        width: (screenWidth * 4 / 5) / 2,
        backgroundColor: whiteColor,
        borderTopColor: borderColor,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
    activeButtonText: {
        color: whiteColor
    },
    resetButtonText: {
        color: '#444'
    },
    bottomView: {
        position: 'absolute',
        width: screenWidth * 4 / 5,
        bottom: 0,
        height: 30,
        right: 0,
        flexDirection: 'row'
    }
});
