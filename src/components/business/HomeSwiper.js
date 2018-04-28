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
    View,
} from 'react-native';
import Swiper from 'react-native-swiper'
type Props = {};
export default class HomeSwiper extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            carouselList:[
                {
                    url: "http://dianlijiheoss.metchange.com/homefirst.png?imageView2/1/w/750/h/521",
                    id: "53b7f0f7ae384d5bb7d89e2339190721"
                },
                {
                    url: "http://dianlijiheoss.metchange.com/329969137658857470.png?imageView2/1/w/750/h/521",
                    id: "e2e9ba48263f4cf3a46eccf834272e7d"
                },
                {
                    url: "http://dianlijiheoss.metchange.com/home-banner3.png?imageView2/1/w/750/h/521",
                    id: "33bcefde673849ee85f6f231d2bb17af"
                },
                {
                    url: "http://dianlijiheoss.metchange.com/3452133720124317.png?imageView2/1/w/750/h/521",
                    id: "572cfff0eda3442dbaa877e4e2569423"
                }
            ],
            wrapperHeight : screenWidth*521/750,
            visibleSwiper: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visibleSwiper: true
            });
        }, 100);
    }
    render() {
        if (this.state.visibleSwiper) {
            const swiperList= [];
            this.state.carouselList.map(value => {
                swiperList.push(
                    <TouchableHighlight underlayColor='#f2f2f2' onPress={()=>this.toGoodsDetail(value.id)}>
                        <View style={styles.slide}>
                            <Image
                                style={styles.banner}
                                resizeMode='contain'
                                source={{uri:value.url}}
                            />
                        </View>
                    </TouchableHighlight>

                );
            });
            return (
                <Swiper style={styles.wrapper} width={screenWidth} height={this.state.wrapperHeight} autoplay={true}>
                    {swiperList}
                </Swiper>
            );
        }else{
            return <View style={styles.emptyView}>

            </View>
        }

    }
    toGoodsDetail(id){
        this.props.navigation.navigate('GoodsDetail', {id: id});
    }}


const styles = StyleSheet.create({
    wrapper: {
    },
    emptyView:{
        width: screenWidth,
        height: 521*screenWidth/750
    },
    slide: {
        width: screenWidth,
        height: 521*screenWidth/750,
    },
    banner: {
        width: screenWidth,
        height: 521*screenWidth/750,
    },

});
