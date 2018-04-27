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
    TouchableOpacity,
} from 'react-native';

type Props = {};
export default class IdentifyImg extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            authentication: ''
        }
    }

    componentDidMount() {
        this.getUserAuth();
    }

    render() {
        if (this.state.authentication == 0) {
            return <TouchableOpacity onPress={() => this.toIdentify()} style={styles.identifyImgView}>
                <View>
                    <Image
                        source={require('../../images/identify.png')}
                        resizeMode='contain'
                        style={styles.identifyImg}
                    />
                </View>
            </TouchableOpacity>
        } else {
            return <View/>
        }
    }

    async getUserAuth() {
        let userInfo = await HttpUtils.getUserInfo();
        this.setState({authentication: userInfo.authentication});
    }

    toIdentify() {
        this.props.navigation.navigate('ShopCertification', {
            goBack: () => this.fetchData(),
        });
    }

    async fetchData() {
        let userInfo = await this.getUserInfo();
        this.setState({authentication: userInfo.authentication});
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            HttpUtils.get('/member/selectStoreMemberById', {}, data => {
                storage.save({
                    key: 'userInfo',
                    data: data.data
                });
                resolve(data.data)
            });
        })
    }

}
const styles = StyleSheet.create({
    identifyImgView: {
        position: 'absolute',
        right: 30,
        bottom: 60,
        width:80,
        height:80,
    },
    identifyImg: {
        width: 80,
        height: 80
    }

});
