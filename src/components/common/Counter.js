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
            currentValue: props.sellout ? 0 : (props.value || 1),
            steps: props.steps || 1,
            min: props.min || 1,
            max: props.max || 99999,
            sellout: props.sellout || false
        }
    }

    componentDidMount() {
        this.changeNumber(this.state.currentValue);
    }

    componentWillReceiveProps(props) {
        this.state.currentValue = props.sellout ? 0 : (props.value || 1);
        this.state.steps = props.steps || 1;
        this.state.min = props.min || 1;
        this.state.max = props.max || 99999;
        this.state.sellout = props.sellout || false;
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
                    onBlur={() => this.judgeNum()}
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

    judgeNum() {
        let num = this.state.currentValue;
        if (!num) {
            this.changeNumber(this.state.min);
            return;
        }
        num = parseInt(num);
        if (num > this.state.max) {
            ToastUtil.show('购买量不能超过库存');
            let maxBuy = parseInt(this.state.max / this.state.steps) * this.state.steps;
            this.changeNumber(maxBuy);
            return;
        }
        if (num < this.state.min) {
            ToastUtil.show('购买量不能少于起订量');
            this.changeNumber(this.state.min);
            return;
        }
        if (num % this.state.steps !== 0) {
            ToastUtil.show(`只能输入起订量的倍数,该商品起订量为${this.state.steps}`);
            this.changeNumber(this.state.min);
            return;
        }
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
        fontSize: 14,
        margin: 0,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
});
