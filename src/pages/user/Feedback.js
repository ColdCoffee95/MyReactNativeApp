/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Linking,
    TextInput,
    View,
    SafeAreaView,
    ScrollView,
    Alert
} from 'react-native';
import UploadMultiImg from '../../components/common/UploadMultiImg'
import ActiveButton from '../../components/common/ActiveButton'
import Toast, {DURATION} from 'react-native-easy-toast';

type Props = {};

export default class Feedback extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            typeList: [
                {
                    name: "功能建议",
                    value: 1
                },
                {
                    name: "购买遇到问题",
                    value: 2
                },
                {
                    name: "性能问题",
                    value: 3
                },
                {
                    name: "其他问题",
                    value: 4
                }
            ],
            fileList: [],
            sugType: 0,
            sugImage: "",
            sugMessage: "",
            sugProType: 1,
            userId: "",
            userPhone: ""
        }
    }

    render() {
        let typeList = [];
        this.state.typeList.map(value => {
            typeList.push(
                <TouchableHighlight onPress={() => this.setState({sugProType: value.value})}
                                    underlayColor='#fff'>
                    <View style={this.state.sugProType == value.value ? styles.activeProblemView : styles.problemView}>
                        <Text
                            style={this.state.sugProType == value.value ? styles.activeProblemText : styles.problemText}>{value.name}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: whiteColor}}>
                <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'>
                    <View style={styles.tabView}>
                        <TouchableHighlight
                            onPress={() => this.setState({sugType: 0})}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.sugType === 0 ? styles.activeTab : styles.negativeTab}>体验问题</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.setState({sugType: 1})}
                            underlayColor='#fff'>
                            <View style={styles.singleTab}>
                                <Text
                                    style={this.state.sugType === 1 ? styles.activeTab : styles.negativeTab}>咨询投诉</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {
                        this.state.sugType === 0 && <View style={styles.firstContainer}>
                            <Text style={styles.problemTitle}>问题种类</Text>
                            <View style={styles.problemWrapper}>
                                {typeList}
                            </View>
                            <View style={styles.sugMessageView}>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={this.state.sugMessage}
                                    onChangeText={(text) => this.setState({sugMessage: text})}
                                    maxLength={200}
                                    multiline={true}
                                    returnKeyType='done'
                                    underlineColorAndroid='transparent'
                                    placeholder='请输入一下您的意见(限200字内)'>
                                </TextInput>
                            </View>
                            <View>
                                <UploadMultiImg
                                    onChange={(imgs) => this.setState({fileList: imgs})}
                                    imgs={this.state.fileList}>

                                </UploadMultiImg>
                            </View>
                            <View style={styles.btnContainer}>
                                <ActiveButton clickBtn={() => this.submit()} text='提交'></ActiveButton>
                            </View>
                        </View>
                    }
                    {
                        this.state.sugType === 1 && <View style={styles.consult}>
                            <Text style={styles.text}>商品/商家投诉，请拨打店力集盒客服电话</Text>
                            <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.callPhone()}>
                                <View style={styles.hotlineView}>
                                    <Text>{hotline}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    }
                    <Toast ref='toast' position='center'></Toast>
                </ScrollView>
            </SafeAreaView>
        );
    }

    async submit() {
        let userInfo = await HttpUtils.getUserInfo();
        if (!this.state.sugMessage) {
            Alert.alert(null, '请描述您的意见');
            return;
        }
        let images = this.state.fileList.join(',');
        let params = {
            sugType: 0,
            sugImage: images,
            sugMessage: this.state.sugMessage.trim(),
            sugProType: this.state.sugProType,
            userId: `${userInfo.memberName}(${userInfo.memberId})`,
            userPhone: userInfo.mobile
        };
        if (!params.sugMessage) {
            this.refs.toast.show('请说点什么吧', 500);
            return;
        }
        HttpUtils.post('/suggest/setSug', params, data => {
            this.refs.toast.show('提交成功，请等待处理', 500, () => {
                this.props.navigation.goBack();
            });
        })
    }

    callPhone() {
        return Linking.openURL('tel:' + hotline)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: whiteColor,
    },
    btnContainer: {
        alignItems: 'center',
        width: screenWidth,
        height: 100
    },
    tabView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: screenWidth,
        backgroundColor: whiteColor,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    singleTab: {
        width: screenWidth / 2,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        color: activeColor
    },
    negativeTab: {
        color: '#444'
    },
    problemTitle: {
        padding: 15
    },
    firstContainer: {
        backgroundColor: whiteColor
    },
    underlineStyle: {
        backgroundColor: activeColor
    },
    problemWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,

    },
    activeProblemView: {
        backgroundColor: activeColor,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    activeProblemText: {
        color: whiteColor,
        fontSize: 12
    },
    problemView: {
        backgroundColor: '#f2f2f2',
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    problemText: {
        color: '#000',
        fontSize: 12
    },
    sugMessageView: {
        marginTop: 20,
        alignItems: 'center',
        width: screenWidth - 20,
        height: 100,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        margin: 10,
    },
    textInput: {
        width: screenWidth * 0.9,
        lineHeight: 20,
        padding: 5
    },
    submitView: {
        backgroundColor: activeColor,
        marginTop: 20,
        alignItems: 'center',
        width: screenWidth * 0.6,
        padding: 10,
        borderRadius: 5
    },
    submitText: {
        color: whiteColor
    },
    consult: {
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        marginBottom: 20
    },
    activeButton: {
        backgroundColor: activeColor,
        marginTop: 20,
        alignItems: 'center',
        width: screenWidth * 0.6,
        padding: 10,
        borderRadius: 5
    },
    hotlineView: {
        borderWidth: 1,
        borderColor: borderColor,
        padding: 10,
        width: screenWidth - 40,
        alignItems: 'center'
    }
});
