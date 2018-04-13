import React, {PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ViewPropTypes, StyleSheet
} from 'react-native';

export default class TimerButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '获取验证码',
            counting: false,
            enable: true
        };

    }

    render() {
        return (
            <TouchableOpacity activeOpacity={this.state.counting ? 1 : 0.8} onPress={() => this.props.buttonClick(this.state.enable)}>
                <View style={this.props.buttonStyle || styles.buttonStyle}>
                    <Text
                        style={this.props.textStyle || styles.textStyle}>{this.state.timerTitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    buttonClick() {
        if (!this.state.enable) {
            this.props.toast.show('请稍后再试', 500);
            return;
        }

    }
}
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: activeColor,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 5,
        marginRight: 10
    },
    textStyle: {
        color: whiteColor
    }
});