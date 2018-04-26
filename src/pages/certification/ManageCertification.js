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
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import ActiveButton from '../../components/common/ActiveButton';
import LoadingView from '../../components/common/LoadingView';

type Props = {};

export default class ManageCertification extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            certificationList: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({certificationGoBack: this.certificationGoBack.bind(this)});
        this.fetchData()
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerLeft:
            <TouchableOpacity onPress={() => navigation.state.params.certificationGoBack()}>
                <View style={{paddingLeft: 15}}>
                    <Icon name='angle-left' size={40} color='black'></Icon>
                </View>
            </TouchableOpacity>

    });

    render() {
        if (this.state.isLoading) {
            return <LoadingView/>
        } else {
            let certificationList = [];
            this.state.certificationList.map(value => {
                certificationList.push(
                    <View style={styles.singleView}>
                        <Text style={styles.contacts}>{value.contacts}</Text>
                        <Text style={styles.idCard}>{value.idCard}</Text>
                        <View style={styles.operate}>
                            <TouchableHighlight
                                onPress={() => this.setDefaultCertification(value.id)}
                                underlayColor='#fff'>
                                <View style={styles.defaultView}>
                                    {
                                        value.defaults ?
                                            (<Icon name="check-circle" size={16} color={activeColor}></Icon>) :
                                            (<Icon2 name="checkbox-blank-circle-outline" size={16}></Icon2>)
                                    }


                                    <Text style={styles.defaultOperate}>默认实名信息</Text>
                                </View>
                            </TouchableHighlight>

                            <View style={styles.editDeleteView}>
                                {/*<View style={styles.editView}>*/}
                                {/*<Icon name="edit" size={20}></Icon>*/}
                                {/*<Text style={styles.editText}>编辑</Text>*/}
                                {/*</View>*/}
                                <TouchableHighlight
                                    onPress={() => this.deleteCertification(value.id)}
                                    underlayColor='#fff'>
                                    <View style={styles.editView}>
                                        <Icon name="trash" size={16}></Icon>
                                        <Text style={styles.editText}>删除</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                )
            });
            return (
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            {certificationList}
                        </ScrollView>
                        <View style={styles.bottomBtnView}>
                            <ActiveButton clickBtn={() => this.addCertification()} text='添加实名认证'
                                          style={styles.activeButton}></ActiveButton>
                        </View>
                    </View>
                </SafeAreaView>
            );
        }

    }

    async fetchData() {
        HttpUtils.get('/idCard/selectIdCardList', {}, data => {
            this.setState({certificationList: data.data, isLoading: false});
        })
    }

    setDefaultCertification(id) {//设为默认
        HttpUtils.get('/idCard/setIdCardDefaultsById', {id: id}, data => {
            ToastUtil.show('设置成功');
            this.fetchData();
        })
    }

    certificationGoBack() {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.goBack();
        goBack();
    }

    deleteCertification(id) {
        Alert.alert(null, '删除后将无法恢复，确认删除？',
            [
                {
                    text: "确定", onPress: () => {
                        HttpUtils.get('/idCard/deleteIdCardById', {id: id}, data => {
                            ToastUtil.show('删除成功');
                            this.fetchData();
                        })
                    }
                },
                {
                    text: "取消", onPress: () => {
                    }
                },
            ],
            {cancelable: false}
        )
    }

    addCertification() {
        this.props.navigation.navigate('AddCertification', {
            goBack: () => this.fetchData(),
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    scrollView: {
        paddingBottom: 40
    },

    singleView: {
        backgroundColor: whiteColor,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 8,
        width: screenWidth,
        marginBottom: 10
    },
    contacts: {},
    operate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    defaultOperate: {
        color: activeColor,
        marginLeft: 5
    },
    defaultView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editDeleteView: {
        flexDirection: 'row',
    },
    editView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    editText: {
        marginLeft: 5
    },
    idCard: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5
    },

    bottomBtnView: {
        position: 'absolute',
        bottom: 0
    },
    activeButton: {
        backgroundColor: activeColor,
        alignItems: 'center',
        width: screenWidth,
        padding: 10,
    }

});
