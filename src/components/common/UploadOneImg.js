/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    View
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker'
type Props = {};

export default class UploadOneImg extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            img: '',
            imageUploading: false
        }
    }

    componentDidMount() {
        if (this.props.img) {
            this.setState({img: {uri: this.props.img}});
        } else {
            this.setState({img: require('../../images/upload.png')});
        }
    }

    render() {
        const options = [
            '拍照上传',
            '从相册里选择',
            '取消',
        ];
        var imgView;
        if (this.state.imageUploading) {
            imgView = <ActivityIndicator></ActivityIndicator>
        } else {
            imgView =
                <Image
                    resizeMode='contain'
                    style={this.props.style || {
                        width: this.props.width || 100,
                        height: this.props.height || 100,
                    }}
                    source={this.state.img}
                >
                </Image>
        }
        return (
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={() => this.showActionSheet()}>
                    <View style={styles.uploadView}>
                        <View style={{
                            width: this.props.width || 100,
                            height: this.props.height || 100,
                            borderWidth: 1,
                            borderColor: borderColor,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {imgView}
                        </View>
                        {
                            this.props.title && <Text style={styles.uploadTitle}>{this.props.title}</Text>
                        }

                    </View>
                </TouchableOpacity>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title='请选择上传方式'
                    options={options}
                    cancelButtonIndex={2}
                    onPress={(index) => this.handlePress(index)}
                />
            </View>
        );
    }

    handlePress(i) {
        this.setState({selected: i})
        if (i === 0) {//拍照上传
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                mediaType:'photo'
            }).then(image => {
                this.imageUpload(image)
            })
        } else if (i === 1) {//相册选取
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                mediaType:'photo'
            }).then(image => {
                this.imageUpload(image)
            });
        }
    }

    imageUpload(image) {
        this.setState({imageUploading: true});
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
                    let url = `${imgDomain}${responseData.key}?imageView2/1/w/${this.props.width || 100}/h/${this.props.height || 100}`
                    this.setState({
                        img: {uri: url},
                        imageUploading: false
                    });
                    this.props.onChange(url);
                })
                .catch((error) => {
                    Alert.alert(null,'上传失败，请稍后再试')
                });
        })
    }

    showActionSheet() {
        this.ActionSheet.show()
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center'
    },
    uploadView: {
        alignItems: 'center',
    },
    uploadTitle: {
        marginTop: 10,
        fontSize: 12
    }
});
