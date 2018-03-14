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
    Text
} from 'react-native';
import HttpUtils from '../../utils/http'
const {width} = Dimensions.get('window');  //解构赋值 获取屏幕宽度
type Props = {};
export default class HomeCategory extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            catList : [],
            dataComplete:false
        }
    }
    componentDidMount(){
        this.fetchData()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.activityTitle}>
                    <Image style={styles.imageLogo} resizeMode='contain' source={require('../../images/fllogo.png')}/>
                    <Image style={styles.imageTitle} resizeMode='contain' source={require('../../images/flword.png')}/>
                </View>
                <View style={styles.catWrapper}>
                    {this.showPage()}
                </View>

            </View>
        );
    }
    async fetchData(){
        HttpUtils.get('/goodsCat/catList',{catId:-1},data => {
            this.setState({catList:data.data});
            this.setState({dataComplete:true});
        })
    }
    showPage(){
        if(this.state.dataComplete){
            let catImgList= [];
            this.state.catList.map(value => {
                catImgList.push(
                    <View style={styles.imgWrapper}>
                        <Image
                            style={styles.catImg}
                            resizeMode='contain'
                            source={{uri:value.img+'?imageView2/1/w/100/h/100'}}
                        />
                        <Text style={styles.catName}>{value.name}</Text>
                    </View>
                );
            });
            return catImgList
        }else{
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
        flexDirection:'row',
        width: width,
    },
    imageLogo:{
        width: 18,
    },
    imageTitle: {
        width: 81,
        marginLeft:10
    },
    catWrapper:{
        flexWrap:'wrap',
        flexDirection:'row',
        width: width,
    },
    imgWrapper: {
        width : width/4,
        alignItems:'center',

    },
    catImg:{

        width: width/8,
        height : width/8
    },
    catName: {
        marginTop:10,
        marginBottom:10,
    }

});
