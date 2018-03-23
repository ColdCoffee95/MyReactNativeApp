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
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveButton from '../../components/common/ActiveButton'

type Props = {};

export default class ManageCertification extends Component<Props> {

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
                <View style={styles.singleView}>
                    <Text style={styles.contacts}>{value.contacts}</Text>
                    <Text style={styles.idCard}>{value.idCard}</Text>
                    <View style={styles.operate}>
                        <View>
                            <Text style={styles.defaultOperate}>默认实名信息</Text>
                        </View>
                        <View style={styles.editDeleteView}>
                            <View>
                                <Icon name="address-book" size={40}></Icon>
                                <Text>编辑</Text>
                            </View>
                            <View>
                                <Text>删除</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        });
        return (
            <View style={styles.container}>
                <View>
                    {certificationList}
                </View>
                <View style={styles.bottomBtnView}>
                    <ActiveButton clickBtn={() => this.addAddress()} text='添加实名认证'
                                  style={styles.activeButton}></ActiveButton>
                </View>
            </View>
        );
    }

    async fetchData() {
        HttpUtils.get('/idCard/selectIdCardList', {}, data => {
            console.warn(data.data)
            this.setState({certificationList: data.data});
        })
    }

    submit() {
        alert('13')
    }

    addAddress() {
        this.props.navigation.navigate('AddCertification');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
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
    contacts: {},
    operate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    defaultOperate: {
        color: activeColor
    },
    editDeleteView: {
        flexDirection: 'row',
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
