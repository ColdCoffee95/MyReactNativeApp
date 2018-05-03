/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight,
    View
} from 'react-native';
import Text from '../common/MyText';
type Props = {};
export default class HomeCategory extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            catList: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.activityTitle}>
                    <Image style={styles.imageLogo} resizeMode='contain' source={require('../../images/fllogo.png')}/>
                    <Image style={styles.imageTitle} resizeMode='contain' source={require('../../images/flword.png')}/>
                </View>
                {this.showPage()}
            </View>
        );
    }

    async fetchData() {
        HttpUtils.get('/goodsCat/catList', {catId: -1}, data => {
            this.setState({catList: data.data});
            this.setState({isLoading: false});
        })
    }

    showPage() {
        let catImgList = [];
        this.state.catList.map(value => {
            catImgList.push(
                <TouchableHighlight underlayColor='#f2f2f2' key={value.id} onPress={() => this.goodsList(value.id)}>
                    <View style={styles.imgWrapper}>
                        <Image
                            style={styles.catImg}
                            resizeMode='contain'
                            source={{uri: value.img + '?imageView2/1/w/100/h/100'}}
                        />
                        <Text style={styles.catName}>{value.name}</Text>
                    </View>
                </TouchableHighlight>
            );
        });
        return <View style={styles.catWrapper}>
            {catImgList}
        </View>

    }

    goodsList(id) {
        this.props.navigation.navigate('GoodsList', {id: id});
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    loadingStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        width: screenWidth,
    },
    imageLogo: {
        width: 18,
    },
    imageTitle: {
        width: 81,
        marginLeft: 10
    },
    catWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: screenWidth,
    },
    imgWrapper: {
        width: screenWidth / 4,
        alignItems: 'center',
    },
    catImg: {

        width: screenWidth / 8,
        height: screenWidth / 8
    },
    catName: {
        marginTop: 10,
        marginBottom: 10,
    }

});
