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
    TextInput,
    Alert,
    KeyboardAvoidingView,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Kaede,
    Hoshi,
    Jiro,
    Isao,
    Madoka,
    Akira,
    Hideo,
    Kohana,
    Makiko,
    Sae,
    Fumi,
} from 'react-native-textinput-effects';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

type Props = {};

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
                    <Icon name='minus-square' size={20}></Icon>
                </TouchableHighlight>
                {/*<Kaede*/}
                {/*defaultValue={this.state.currentValue + ""}*/}
                {/*onChangeText={(num) => this.judgeNum(num)}*/}
                {/*style={styles.textInput}*/}
                {/*>*/}

                {/*</Kaede>*/}
                <TextInput
                    ref={(textInput) => this.textInput = textInput}
                    defaultValue={this.state.currentValue + ""}
                    keyboardType='numeric'
                    style={styles.textInput}
                    returnKeyType='done'
                    editable={!this.state.sellout}
                    // blurOnSubmit={true}
                    onChangeText={(num) => this.judgeNum(num)}
                    onEndEditing={(event) => this._onEndEditing(event)}
                    // onBlur={(event) => this.judgeNum(event)}
                    underlineColorAndroid='transparent'>

                </TextInput>


                <TouchableHighlight underlayColor='#f2f2f2' onPress={() => this.addValue()}>
                    <Icon name='plus-square' size={20}></Icon>
                </TouchableHighlight>
            </View>
        );
    }

    changeNumber(num) {
        this.setState({currentValue: num});
        this.props.onChangeNum(num);
    }

    _onEndEditing(event) {
        let num = event.nativeEvent.text;
        if (!num) {
            this.changeNumber(this.state.min);
            return;
        } else {
            num = parseInt(num);
        }
        if (num % this.state.steps !== 0) {
            this.props.toast.show('只能输入起订量的倍数', 300);
            this.changeNumber(this.state.min);
            return;
        }
        if (num > this.state.max) {
            this.props.toast.show('购买量不能超过库存', 300);
            this.changeNumber(this.state.min);
            return;
        }
        if (num < this.state.min) {
            this.props.toast.show('购买量不能少于起订量', 300);
            this.setState({currentValue: this.state.min})
            this.changeNumber(this.state.min);
            return;
        }

    }

    judgeNum(num) {
        if (!num) return;
        num = parseInt(num);
        if (num > this.state.max) {
            this.props.toast.show('购买量不能超过库存', 300);
            this.changeNumber(this.state.min);
            return;
        }
        if (num < this.state.min) {
            this.props.toast.show('购买量不能少于起订量', 300);
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
            this.props.toast.show('该商品已售罄', 300);
            return;
        }
        if (num + this.state.steps > this.state.max) {
            this.props.toast.show('购买量不能超过库存上限', 300);
            return;
        }
        let value = num + this.state.steps;
        this.changeNumber(value);
    }

    cutValue() {
        let num = parseInt(this.state.currentValue);
        if (this.state.sellout) {
            this.props.toast.show('该商品已售罄', 300);
            return;
        }
        if (num - this.state.steps < this.state.min) {
            this.props.toast.show('购买量不能少于起订量', 300);
            return;
        }
        let value = num - this.state.steps;
        this.changeNumber(value);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    textInputView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: 40,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
});
