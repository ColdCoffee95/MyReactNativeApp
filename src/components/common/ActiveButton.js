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
    View
} from 'react-native';

type Props = {};

export default class ActiveButton extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.btnContainer}>
                <TouchableHighlight
                    onPress={()=>this.props.clickBtn()}
                    underlayColor='#fff'>
                    <View style={this.props.style?this.props.style:styles.submitView}>
                        <Text style={styles.submitText}>{this.props.text}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    submit() {

    }
}

const styles = StyleSheet.create({
    btnContainer:{
        width:screenWidth,
        alignItems:'center'
    },
    submitView:{
        backgroundColor:activeColor,
        marginTop:20,
        alignItems:'center',
        width:screenWidth*0.6,
        padding:10,
        borderRadius:5
    },
    submitText:{
        color:whiteColor
    }
});
