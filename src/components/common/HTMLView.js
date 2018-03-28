import HTMLView from 'react-native-htmlview';
import React, {Component} from 'react';
import {Image, Dimensions, PixelRatio} from 'react-native';
type Props = {};
export default class HtmlView extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {isComplete: false}
    }

    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'img') {
            const attribs = node.attribs;
            return (
                <Image
                    key={index}
                    resizeMode='contain'
                    style={{
                        width: screenWidth * PixelRatio.get(),
                        height: screenWidth * PixelRatio.get()
                    }}
                    source={{uri: attribs.src}}/>
            );

        }

    }

    render() {
        return (
            <HTMLView
                value={`<html><body>${this.props.content}</body></html>`}
                renderNode={this.renderNode.bind(this)}
                stylesheet={this.props.stylesheet}/>
        )
    }
}