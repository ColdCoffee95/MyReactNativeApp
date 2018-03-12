/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Button,
    Image,
    Text,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import Swiper from 'react-native-swiper';
import HttpUtils from '../utils/http'
const {width} = Dimensions.get('window');  //解构赋值 获取屏幕宽度
type Props = {};
export default class Home extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            carouselList:[
                {
                    url: "http://dianlijiheoss.metchange.com/homefirst.png?imageView2/1/w/750/h/521",
                    id: "53b7f0f7ae384d5bb7d89e2339190721"
                },
                {
                    url: "http://dianlijiheoss.metchange.com/home-banner2.png?imageView2/1/w/750/h/521",
                    id: "10b6994dfbaa422fa6001fbcc4628b08"
                },
                {
                    url: "http://dianlijiheoss.metchange.com/home-banner3.png?imageView2/1/w/750/h/521",
                    id: "33bcefde673849ee85f6f231d2bb17af"
                },
                {
                    url: "http://dianlijiheoss.metchange.com/home-banner4.png?imageView2/1/w/750/h/521",
                    id: "485af5e8df0b40b287d61326e05ebe87"
                }
            ]

        }
    }
    render() {

        const swiperList= [];
        this.state.carouselList.map(value => {
            swiperList.push(
                <View style={styles.slide}>
                    <Image
                        style={styles.banner}
                        resizeMode='stretch'
                        source={{uri:value.url}}
                    />
                </View>
            );
        });
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} height={200} autoplay={true}>
                    {swiperList}
                </Swiper>
                <View>
                    <Image source={require('../images/ptword.png')}/>
                </View>

            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center',
    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
    },
    banner: {
        width: width,
        flex:1
    }

});
