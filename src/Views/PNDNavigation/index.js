import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import PNDText from '../PNDText'

export default class PNDNavigation extends PureComponent {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={[styles.continer]}>
                <View style={[styles.navigationView]}>
                    <View style={[styles.itemsContainer]}>
                        {this.props.leftItem
                            && this.props.leftItem != ''
                            && this.renderLeftItem()}
                    </View>
                    <View style={[styles.titleView]}>
                        {this.renderTitle()}
                    </View>
                    <View style={[styles.itemsContainer]}>
                        {this.props.rightItem
                            && this.props.rightItem != ''
                            && this.renderRightItem()}
                    </View>
                </View>
            </View>
        )
    }

    renderLeftItem() {
        return (
            <TouchableOpacity style={[styles.itemsContainer]} onPress={() => {
                this.props.leftItemPressed()
            }}>
                <Image style={[styles.itemStyle]}
                    source={{ uri: this.props.leftItem }}
                    resizeMode='contain' />
            </TouchableOpacity>
        )
    }

    renderTitle() {
        if (this.props.tabNavigation) {
            return (
                <PNDText style={[styles.titleTabText]}
                    text={this.props.title}
                    textColor='#ffffff'
                    fontType='medium'
                    fontSize={18} />
            )
        }
        else {
            return (
                <PNDText
                 style={[styles.titleText]}
                    text={this.props.title}
                    textColor='#ffffff'
                    fontType='medium'
                    fontSize={18} />
            )
        }

    }

    renderRightItem() {
        return (
            <TouchableOpacity 
            activeOpacity={.7}
            style={[styles.itemsContainer]} onPress={() => {
                this.props.rightItemPressed()
            }}>
                <Image style={[styles.itemStyle]}
                    source={{ uri: this.props.rightItem }}
                    resizeMode='contain' />
            </TouchableOpacity>
        )
    }
}

PNDNavigation.propTypes = {
    title: PropTypes.string,
    leftItem: PropTypes.string,
    rightItem: PropTypes.string,
    tabNavigation: PropTypes.bool
};

