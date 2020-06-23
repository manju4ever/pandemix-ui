import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { isBlank } from '../../utils';
import styles from './styles'

export default class PNDText extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    getFontFamily() {
        if (this.props.fontType == 'bold') {
            return 'HelveticaNeue-Bold'
        }
        else if (this.props.fontType == 'medium') {
            return 'HelveticaNeue-Medium'
        }
        else {
            return 'Helvetica Neue'
        }
    }

    render() {
        var size = isBlank(this.props.fontSize) ? 15 : this.props.fontSize
        size = styles.width <= 350 ? size - 3 : size
        return (
            <Text style={
                [{
                        color: this.props.textColor,
                        fontSize: size,
                        fontFamily: this.getFontFamily(),
                        textAlign: 'center',
                        ...this.props.style,
                }]
            }
                numberOfLines={this.props.numberOfLines}
                ellipsizeMode='tail'
            >
                {this.props.text}
                {this.props.children}
            </Text>
        )
    }
}

PNDText.propTypes = {
    color: PropTypes.string,
    fontSize: PropTypes.number,
    fontType: PropTypes.string,
    numberOfLines: PropTypes.number,
};

