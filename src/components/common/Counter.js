/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    TextInput,
    View
} from 'react-native';
import {observer} from 'mobx-react/native';
import {action, autorun, observe} from 'mobx';
import Icon from 'react-native-vector-icons/FontAwesome';
type Props = {};
@observer
export default class Counter extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            currentValue: props.value || 1,
            steps: props.steps || 1,
            min: props.min || 1,
            max: props.max || 99999,
            sellout: props.sellout || false
        }
    }

    componentDidMount() {
        if (this.props.sellout) {
            this.state.currentValue = 0;
            this.state.sellout = true;
        }
        this.changeNumber(this.state.currentValue);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.cutValue()}>
                    <Icon name='minus-square' size={20} color='#333'>
                    </Icon>
                </TouchableHighlight>

                <TextInput
                    ref={(textInput) => this.textInput = textInput}
                    defaultValue={this.props.currentValue + ""}
                    value={this.state.currentValue + ""}
                    keyboardType='numeric'
                    style={styles.textInput}
                    returnKeyType='done'
                    editable={!this.state.sellout}
                    numberOfLines={1}
                    onChangeText={(num) => this.setState({currentValue: num})}
                    onBlur={(event) => this.judgeNum(event)}
                    underlineColorAndroid='transparent'>

                </TextInput>
                <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.addValue()}>
                    <Icon name='plus-square' size={20} color='#333'>
                    </Icon>
                </TouchableHighlight>
            </View>
        );
    }

    changeNumber(num) {
        this.setState({currentValue: num});
        this.props.onChangeNum(num);
    }

    _onEndEditing(event) {
        console.warn('_onEndEditing')
        let num = event.nativeEvent.text;
        if (!num) {
            this.textInput.clear();
            this.changeNumber(this.state.min);
            return;
        } else {
            num = parseInt(num);
        }
        if (num % this.state.steps !== 0) {
            ToastUtil.show('只能输入起订量的倍数');
            this.changeNumber(this.state.min);
            return;
        }
        if (num > this.state.max) {
            ToastUtil.show('购买量不能超过库存');
            this.changeNumber(this.state.min);
            return;
        }
        if (num < this.state.min) {
            ToastUtil.show('购买量不能少于起订量');
            this.setState({currentValue: this.state.min});
            this.changeNumber(this.state.min);
            return;
        }

    }

    judgeNum(event) {
        console.warn('judgeNum')
        let num = event.nativeEvent.text;
        if (!num) {
            this.changeNumber(this.state.min);
            return;
        }
        num = parseInt(num);
        if (num > this.state.max) {
            ToastUtil.show('购买量不能超过库存');
            this.changeNumber(this.state.min);
            return;
        }
        if (num < this.state.min) {
            ToastUtil.show('购买量不能少于起订量');
            this.changeNumber(this.state.min);
            return;
        }
        // if (num % this.state.steps !== 0) {
        //     this.props.toast.show('只能输入起订量的倍数', 300);
        //     this.changeNumber(this.state.min);
        //     return;
        // }
        this.changeNumber(num);
    }

    addValue() {
        let num = parseInt(this.state.currentValue);
        if (this.state.sellout) {
            ToastUtil.show('该商品已售罄');
            return;
        }
        if (num + this.state.steps > this.state.max) {
            ToastUtil.show('购买量不能超过库存上限');
            return;
        }
        let value = num + this.state.steps;
        this.changeNumber(value);
    }

    cutValue() {
        let num = parseInt(this.state.currentValue);
        if (this.state.sellout) {
            ToastUtil.show('该商品已售罄');
            return;
        }
        if (num - this.state.steps < this.state.min) {
            ToastUtil.show('购买量不能少于起订量');
            return;
        }
        let value = num - this.state.steps;
        this.changeNumber(value);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    textInputView: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    textInput: {
        width: 40,
        lineHeight: 20,
        height: 20,
        fontSize: 14,
        margin: 0,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
});
