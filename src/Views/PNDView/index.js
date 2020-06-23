import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

export default class PNDView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            animating: false,
            touch: false
        }
    }

    startActivityWithTouch() {
        this.setState({
            animating: true
        })
    }

    startActivity() {
        this.setState({
            animating: true
        })
    }

    stopActivity() {
        this.setState({
            animating: false
        })
    }

    render() {
        return (
            <View style={[styles.container]}>
                {this.props.children}
                {this.state.animating &&
                    this.state.touch &&
                    this.renderTouchableIndicator()}
                {this.state.animating &&
                    this.state.touch == false &&
                    this.renderIndicator()}
            </View>
        )
    }

    renderIndicator() {
        return (
            <View style={[styles.mainView]}>
                <View style={[styles.mainTouchableView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                    <ActivityIndicator
                        style={{ alignSelf: 'center' }}
                        size="large"
                        color='white'
                        animating={true} />
                </View>
            </View>
        )
    }

    renderTouchableIndicator() {
        return (
            <View style={[styles.mainTouchableView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <ActivityIndicator
                    style={{ alignSelf: 'center' }}
                    size="large"
                    color='white'
                    animating={true} />
            </View>
        )
    }
}