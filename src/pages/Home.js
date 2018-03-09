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
    View
} from 'react-native';
import Swiper from 'react-native-swiper';
import HttpUtils from '../utils/http'

type Props = {};
export default class Home extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            img:'http://dianlijiheoss.metchange.com/homefirst.png',

        }
    }
    // carouselList:[
    //     {
    //         url: "http://dianlijiheoss.metchange.com/homefirst.png",
    //         id: "53b7f0f7ae384d5bb7d89e2339190721"
    //     },
    //     {
    //         url: "http://dianlijiheoss.metchange.com/home-banner2.png",
    //         id: "10b6994dfbaa422fa6001fbcc4628b08"
    //     },
    //     {
    //         url: "http://dianlijiheoss.metchange.com/home-banner3.png",
    //         id: "33bcefde673849ee85f6f231d2bb17af"
    //     },
    //     {
    //         url: "http://dianlijiheoss.metchange.com/home-banner4.png",
    //         id: "485af5e8df0b40b287d61326e05ebe87"
    //     }
    //     ]
    render() {
        // const swiperList = carouselList.map((value) => {
        //     <View style={styles.slide1}>
        //
        //     </View>
        // })
        //     <Image
        // style={styles.banner}
        // source='http://dianlijiheoss.metchange.com/home-banner4.png'
        //     />
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} height={250}>
                    <View style={styles.slide}>
                        <Image
                            style={styles.banner}
                            resizeMode={'cover'}
                            source={this.state.img}
                        />
                    </View>
                    <View style={styles.slide}>
                        <Text>1234</Text>

                    </View>
                    <View style={styles.slide}>
                        <Text>1235</Text>

                    </View>
                    <View style={styles.slide}>
                        <Text>1236</Text>

                    </View>

                </Swiper>
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    wrapper: {
    },
    slide: {
        height: 250
    },
    banner: {
        height: 250,
        resizeMode:'cover'

    }

});
