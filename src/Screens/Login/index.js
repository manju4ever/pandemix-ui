import React, { Component } from 'react';
import {
    View, Image, StatusBar,
    SafeAreaView, TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    StackActions,
    NavigationActions
} from 'react-navigation';
import CountryPicker from 'react-native-country-picker-modal';
import Toast from '../../utils/Toast';

// Local Imports
import { signIn } from '../../actions'
import { saveUser } from '../../actions/user';
import styles from './styles'
import PNDText from '../../Views/PNDText';
import PNDView from '../../Views/PNDView';
import LoginTextField from '../../Views/LoginTextField';
import { isBlank } from '../../utils';

const initialState = {
    mPhoneNumber: '',
    mCountryCode: "91",
    mPin: '',
    cca2Value: "IN",
    isPinFocused: false,
    isPhoneFocused: false
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    navigateToDash = () => {
        this._indicator.stopActivity()
        const navigateAction = NavigationActions.navigate({
            routeName: 'Dash',
            params: {},
            action: NavigationActions.navigate({ routeName: 'Dash' })
        });
        const resetAction = StackActions.reset({
            index: 0,
            actions: [navigateAction],
        });
        this.props.navigation.dispatch(resetAction);
    }

    submitLogin() {
        const mPin = this.state.mPin
        const mCountrycode = this.state.mCountryCode
        const mPhoneNumber = this.state.mPhoneNumber

        let isValid = true;

        if (isBlank(mPin)) {
            isValid = false;
            Toast.info('Please enter pin', 5000)
            return
        } else if (isBlank(mCountrycode)) {
            isValid = false;
            Toast.info('Please select country code', 5000)
            return
        } else if (isBlank(mPhoneNumber)) {
            isValid = false;
            Toast.info('Please enter number', 5000)
            return
        }

        if (isValid) {
            // Start Showing loadind
            this._indicator.startActivity();
            signIn({
                countryCode: mCountrycode,
                phone: mPhoneNumber,
                pin: mPin,
            }).then((response) => {
                saveUser(response.data);
                this.navigateToDash();
                // Stop Loading
                this._indicator.stopActivity()
                Toast.info('Login Successful.');
            }).catch(err => {
                console.warn(`Login Error`, err);
                this._indicator.stopActivity()
                Toast.info(`Login Failed. Please Try Agian.`);
            });
        }
    }

    renderbackButton() {
        return (
            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => {
                this.props.navigation.goBack(null);
            }}>
                <Image
                    style={styles.backArrow}
                    source={{ uri: 'back' }}
                    resizeMode='center' />
            </TouchableOpacity>
        )
    }

    navigaetToDash() {
        this._indicator.stopActivity()
        const navigateAction = NavigationActions.navigate({
            routeName: 'Dash',
            params: {},
            action: NavigationActions.navigate({ routeName: 'Dash' })
        });
        const resetAction = StackActions.reset({
            index: 0,
            actions: [navigateAction],
        });
        this.props.navigation.dispatch(resetAction);
    }

    changeCountrySelect = (countrySelected) => {
        this.setState({
            cca2Value: countrySelected.cca2,
            mCountryCode: countrySelected.callingCode[0],
        });
    }

    render() {
        return (
            <PNDView
                ref={(ref) => this._indicator = ref}>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#192965" />
                    <View style={styles.container}>
                        <ScrollView style={{ height: '100%', width: '100%' }}>
                            {this.renderlogo()}
                            {this.renderForm()}
                            {this.renderLoginButton()}
                            {this.renderRegistrationButton()}
                            <SafeAreaView />
                        </ScrollView>
                    </View>
                </View>
            </PNDView>
        )
    }


    renderlogo() {
        return (
            <View style={styles.logoContainer}>
                {this.renderbackButton()}
                <Image
                    style={[styles.loginLog]}
                    source={{ uri: 'pandemix_logo' }}
                    resizeMode='cover' />

                <PNDText style={styles.title} fontType='bold' fontSize={25} textColor='#192965' text='Login' />
            </View>

        )
    }

    renderForm() {
        return (
            <View style={styles.loginView}>
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={[styles.boxCountryCode]}>
                        <CountryPicker
                            countryCode={this.state.cca2Value}
                            withFilter
                            withFlag
                            withCallingCodeButton
                            withFlagButton
                            onSelect={this.changeCountrySelect}
                        />
                    </View>
                    <View style={{ width: 16 }} />
                    <View style={this.state.isPhoneFocused ? styles.boxSelected : styles.box}>
                        <LoginTextField
                            maxLength={10}
                            placeholder={'Phone number'}
                            keyboardType='number-pad'
                            value={this.state.mPhoneNumber}
                            onFocus={() => {
                                this.setState({ isPhoneFocused: true })
                            }}
                            onBlur={() => {
                                this.setState({ isPhoneFocused: false })
                            }}
                            onChangeText={(text) => {
                                this.setState({
                                    mPhoneNumber: text
                                })
                            }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={this.state.isPinFocused ? styles.boxSelected : styles.box}>
                        <LoginTextField
                            placeholder={'Enter your 4 digit pin'}
                            maxLength={4}
                            secureTextEntry
                            keyboardType='number-pad'
                            value={this.state.mPin}
                            onFocus={() => {
                                this.setState({ isPinFocused: true })
                            }}
                            onBlur={() => {
                                this.setState({ isPinFocused: false })
                            }}
                            onChangeText={(text) => {
                                this.setState({
                                    mPin: text
                                })
                            }} />

                    </View>
                </View>
            </View >
        )
    }

    renderLoginButton() {
        return (
            <TouchableOpacity style={styles.loginButton}
                onPress={() => {
                    this.submitLogin()
                }}>
                <PNDText fontType='bold' fontSize={20} textColor='#ffffff' text='Login' />
            </TouchableOpacity>
        )
    }

    renderRegistrationButton() {
        return (
            <View style={styles.registrationButtonContainer}>
                <PNDText fontType='bold' fontSize={18} style={{ marginTop: 36 }} textColor='#192965' text="Don't have an account ?" />
                <TouchableOpacity style={styles.registerButton}
                    onPress={() => {
                        this.props.navigation.goBack(null);
                    }}
                >
                    <PNDText fontType='bold' fontSize={18} textColor='#192965' text='Register' />
                </TouchableOpacity>
            </View>
        )
    }
}
