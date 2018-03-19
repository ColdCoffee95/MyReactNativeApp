/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';
import Swiper from 'react-native-swiper'
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
            ],
            wrapperHeight : screenWidth*521/750

        }
    }
    render() {

        const swiperList= [];
        this.state.carouselList.map(value => {
            swiperList.push(
                <View style={styles.slide}>
                    <Image
                        style={styles.banner}
                        resizeMode='contain'
                        source={{uri:value.url}}
                    />
                </View>
            );
        });
        return (
                <Swiper style={styles.wrapper} height={this.state.wrapperHeight} autoplay={true}>
                    {swiperList}
                </Swiper>
        );
    }


}
const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
    },
    banner: {
        width: screenWidth,
        flex: 1
    },

});
