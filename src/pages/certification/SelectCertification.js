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
    Alert,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast, {DURATION} from 'react-native-easy-toast';
import ActiveButton from '../../components/common/ActiveButton';

type Props = {};

export default class SelectCertification extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            certificationList: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
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
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {certificationList}
                </ScrollView>
                <Toast ref='toast' position='center'></Toast>
                <View style={styles.bottomBtnView}>
                    <ActiveButton clickBtn={() => this.addAddress()} text='添加实名认证'
                                  style={styles.activeButton}></ActiveButton>
                </View>
            </View>
        );
    }

    async fetchData() {
        HttpUtils.get('/idCard/selectIdCardList', {}, data => {
            this.setState({certificationList: data.data});
        })
    }

    selectCertification(certification) {
        const {navigate, goBack, state} = this.props.navigation;
        state.params.addressCallback(certification);
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
