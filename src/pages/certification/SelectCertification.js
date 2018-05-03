/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    View
} from 'react-native';
import Text from '../../components/common/MyText';
type Props = {};

export default class SelectCertification extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            certificationList: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({manage: this.jumpToManage.bind(this)});
        this.fetchData()
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerRight:
            (<TouchableOpacity style={{marginRight: 10}}
                               onPress={() => navigation.state.params.manage()}>
                <View>
                    <Text style={{color: 'black'}}>管理</Text>
                </View>
            </TouchableOpacity>)
    });

    render() {
        if (this.state.isLoading) {
            return <View/>
        } else {
            let certificationList = [];
            this.state.certificationList.map(value => {
                certificationList.push(
                    <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.selectCertification(value)}>
                        <View style={styles.singleView}>
                            <View style={styles.topView}>
                                {
                                    value.defaults && <Text style={{color: activeColor}}>[默认实名信息]</Text>
                                }
                                <Text>{value.contacts}</Text>
                            </View>
                            <Text style={{marginTop: 10}}>{value.idCard}</Text>
                        </View>
                    </TouchableHighlight>
                )
            });
            return (
                <SafeAreaView style={{flex: 1}}>
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            {certificationList}
                        </ScrollView>
                    </View>
                </SafeAreaView>
            );
        }

    }

    jumpToManage() {
        this.props.navigation.navigate('ManageCertification', {
            goBack: () => this.fetchData()
        });
    }

    async fetchData() {
        HttpUtils.get('/idCard/selectIdCardList', {}, data => {
            this.setState({certificationList: data.data, isLoading: false});
        })
    }

    selectCertification(certification) {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.callback(certification);
        goBack();
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
        paddingBottom: 10,
        width: screenWidth,
        marginBottom: 10
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
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
