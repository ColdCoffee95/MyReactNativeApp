/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'

type Props = {};

export default class UploadMultiImg extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            imgs: [],
            nowIndex: 0,
            uploadingArr: [],//正在加载的图片的index在这个数组中
            maxUploadNum: props.maxUploadNum || 5,//最多上传几张
            isLoading: true,
            loadingImgNum: 0
        }
    }

    componentDidMount() {
        if (this.props.imgs) {
            this.setState({imgs: this.props.imgs});
        }
    }

    render() {
        const options = [
            '拍照上传',
            '从相册里选择',
            '取消',
        ];
        let imgView = [];
        console.warn('imgs', this.state.imgs)
        this.state.imgs.map((value, index) => {
            imgView.push(
                <View style={styles.uploadView}>
                    <View style={{
                        width: this.props.width || 100,
                        height: this.props.height || 100,
                        borderWidth: 1,
                        borderColor: borderColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <Image
                            resizeMode='contain'
                            style={{
                                width: this.props.width || 100,
                                height: this.props.height || 100,
                            }}
                            source={{uri: value}}
                        />
                        <TouchableOpacity onPress={() => this.deleteImg(index)} style={styles.deleteIconView}>
                            <View style={styles.deleteIconView}>
                                <Icon name='times-circle' color='black' size={30}></Icon>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        });
        if (imgView.length < this.state.maxUploadNum) {
            imgView.push(
                <TouchableOpacity
                    onPress={() => {
                        this.state.nowIndex = this.state.imgs.length;
                        this.showActionSheet()
                    }}>
                    <View style={styles.uploadView}>
                        <View style={{
                            width: this.props.width || 100,
                            height: this.props.height || 100,
                            borderWidth: 1,
                            borderColor: borderColor,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                resizeMode='contain'
                                style={{
                                    width: this.props.width || 100,
                                    height: this.props.height || 100,
                                }}
                                source={require('../../images/upload.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.btnContainer}>
                <View style={styles.uploadWrapper}>
                    {imgView}
                </View>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title='选择上传方式'
                    options={options}
                    cancelButtonIndex={2}
                    onPress={(index) => this.handlePress(index)}
                />
            </View>
        );
    }

    handlePress(i) {//点击加号
        this.setState({selected: i});
        if (i === 0) {//拍照上传
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                mediaType: 'photo',
                maxFiles: this.state.maxUploadNum
            }).then(image => {
                this.imageUpload([image])
            })
        } else if (i === 1) {//相册选取
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                mediaType: 'photo',
                multiple: true,
                maxFiles: this.state.maxUploadNum - this.state.imgs.length - this.state.loadingImgNum
            }).then(image => {
                this.state.loadingImgNum = image.length;
                this.imageUpload(image);
            });
        }
    }

    deleteImg(index) {//删除图片
        this.state.imgs.splice(index, 1);
        this.setState({imgs: this.state.imgs});
    }

    imageUpload(images) {//上传图片时调用的方法
        images.map(image => {
            HttpUtils.post('/oss/imgSignature', {bucketName: 'dianlijihe'}, data => {
                let formData = new FormData();
                formData.append("token", data.data);
                formData.append("file", {uri: image.path, type: 'application/octet-stream', name: data.data});
                //上传数据
                fetch('http://upload.qiniu.com/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.warn(responseData)
                        let url = `${imgDomain}${responseData.key}?imageMogr2/thumbnail/${this.props.width || 200}x${this.props.height || 200}`
                        this.state.imgs.push(url);
                        this.setState({
                            imgs: this.state.imgs,
                        });
                        this.state.loadingImgNum -= 1;
                        this.props.onChange(this.state.imgs);
                    })
                    .catch((error) => {
                        Alert.alert(null, '上传失败，请稍后再试!')
                    });
            })
        })

    }

    showActionSheet() {//显示actionsheet
        this.ActionSheet.show()
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center'
    },
    deleteIconView: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: whiteColor,
        borderRadius: 30
    },
    uploadWrapper: {
        flexDirection: 'row',
        width: screenWidth,
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10
    },
    uploadView: {
        alignItems: 'center',
        marginRight: 10,
        marginTop: 10
    },
});
