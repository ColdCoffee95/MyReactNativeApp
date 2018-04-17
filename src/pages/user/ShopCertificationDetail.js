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
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native';

type Props = {};

export default class ShopCertification extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            imgList: [],
            storeVoucherList: [],
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        let voucherList = [];
        this.state.storeVoucherList.map(value => {
            let img = [];
            this.state.imgList.map(i => {
                if (i.type == value.value) {
                    img.push(
                        <Image
                            source={{uri: i.url}}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    )
                }

            });
            voucherList.push(
                <View style={styles.cellWrapper}>
                    <View style={styles.cellView}>
                        <Text style={styles.leftCell}>{value.name}</Text>
                    </View>
                    {img}
                </View>
            )
        });
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {voucherList}
            </ScrollView>
        );
    }

    fetchData() {
        this.getImgUploadType();
        this.getStoreVouchers();
    }

    getImgUploadType() {//获取上传图片类型
        HttpUtils.get('/dict/selectDictByType', {type: "store_voucher"}, data => {
            this.setState({storeVoucherList: data.data.list})
        })
    }

    getStoreVouchers() {//获取上传图片类型
        HttpUtils.get('/store/selectStoreVouchers', {}, data => {
            this.setState({imgList: data.data})
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    cellWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellView: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: whiteColor,
        padding: 10,
    },
    leftCell: {
        justifyContent: 'center'
    },
    rightCell: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        margin: 15
    }
});
