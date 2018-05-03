/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Text from '../../components/common/MyText';
type Props = {};

export default class Aboutus extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Image
                        source={require('../../images/logo.png')}
                        resizeMode='contain'
                        style={styles.logo}
                    />
                    <Text style={styles.version}>{version}</Text>
                    <Text style={styles.desc}>
                        店力集盒是新一代母婴B2B2C平台，致力于全方位服务全国小店，开发小店潜力，助力小店良性发展。
                        店力集盒帮助小店解决供应链效率问题，通过高效提供更全面丰富的海内外优秀货品，降低订货成本，提高小店订货效率。同时通过数据化智能化人性化服务，为小店运营加分，绑定更多高忠诚度会员。
                        角色定位：口碑海淘商品、国内外优质大牌、精选国货供应 + 小店运营顾问，实现小店价值最大化 店力集盒的使命：让中国小店拥有大渠道的竞争优势，让消费者享受近在咫尺的福利。
                    </Text>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: whiteColor,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    logo: {
        width: 60,
        height: 60
    },
    version: {
        marginTop: 20
    },
    desc: {
        marginTop: 20,
        fontSize: 16,
        lineHeight: 30
    }
});
