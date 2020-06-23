import React, { Component } from 'react';
import { View, StatusBar, Animated, SafeAreaView, Alert, ActivityIndicator } from 'react-native';

import Toast from '../../utils/Toast'
import styles from './styles'
import { StackActions, NavigationActions } from 'react-navigation';
import { verifyToken } from '../../actions';
import { logout } from '../../actions/user';
import PNDView from '../../Views/PNDView';

class ImageLoader extends Component {
    state = {
        opecity: new Animated.Value(0)
    }    
    onLoad = () => {
        Animated.timing(this.state.opecity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    render() {
        console.log(this.props.navigation)
        return (
            <Animated.Image
                onLoad={this.onLoad}
                {...this.props}
                style={[
                    {
                        opacity: this.state.opecity,
                        transform: [{
                            scale: this.state.opecity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1],
                            }),
                        }],
                    },
                    this.props.style
                ]}
            />
        )
    }
}

export default class Splash extends Component {

    constructor(props) {
        super(props)
    }


    validateExsistingTokken() {
        _this = this;
        return verifyToken()
            .then((response) => {
                this.navigateToDashBoard();

            }).catch(err => {
                if (err != null) {
                    if (!err.response) {
                        // network error
                        return Alert.alert('', 'Check network connection and try again')
                    } else {
                        Toast.info('Your session has timed out ', 2000);
                        return logout(this.props.navigation);
                    }
                }
                return logout(this.props.navigation);
        });
    }

    navigateToDashBoard() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Dash',
            params: {},
            action: NavigationActions.navigate({ routeName: 'Dash' }),
        });
        const resetAction = StackActions.reset({
            index: 0,
            actions: [navigateAction],
        });
        this.props.navigation.dispatch(resetAction);
    }

    componentDidMount() {
        setTimeout(() => {
            this.validateExsistingTokken();
        }, 1000);

    }

    render() {
        return (
            <PNDView
                ref={(ref) => this._indicator = ref}>
                <View style={[styles.container]}>
                    <StatusBar
                        backgroundColor="#192965" />
                    <ImageLoader
                        style={[styles.splashLog]}
                        source={{ uri: 'pandemix_logo' }}
                        resizeMode='cover' />

                    <ActivityIndicator
                        style={{ alignSelf: 'center', position: 'absolute', bottom: 24 }}
                        size="large"
                        color='#192965'
                        animating={true} />
                    <SafeAreaView />
                </View>
            </PNDView>
        )
    }
}