import React, { Component } from 'react';
import { 
    View, Image, StatusBar,ScrollView, 
    SafeAreaView, TouchableOpacity 
} from 'react-native';
import Toast from '../../utils/Toast'


import styles from './styles'
import PNDText from '../../Views/PNDText';
import LoginTextField from '../../Views/LoginTextField'
import CountryPicker from 'react-native-country-picker-modal'
import { isBlank } from '../../utils'
import PNDView from '../../Views/PNDView';
import { StackActions, NavigationActions } from 'react-navigation';

const initialState = {
    mPhoneNumber: null,
    mCountryCode: "91",
    mPin: null,
    cca2Value: "IN",
    isPinFocused: false,
    isPhoneFocused: false
};
export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    submitRegister() {
        let mPin = this.state.mPin
        let mCountrycode = this.state.mCountryCode
        let mPhoneNumber = this.state.mPhoneNumber

        let isValid = true;

        if (isBlank(mPin)) {
            isValid = false;
            Toast.info('Please enter valid PIN', 5000)
            return;
        }
        else if (mPin.length < 4 || mPin.length > 6) {
            isValid = false;
            Toast.info('PIN should be of 4 digits.', 5000)
        }
        else if (isBlank(mCountrycode)) {
            isValid = false;
            Toast.info('Please select country code.', 5000)
            return;
        } else if (isBlank(mPhoneNumber)) {
            isValid = false;
            Toast.info('Please enter valida phone number.', 5000)
            return;
        }

        if (isValid) {
            this.props.navigation.navigate('Verification', {
                mPhoneNumber: mPhoneNumber,
                mCountryCode: mCountrycode,
                mPin: mPin
            })
        }
    }
    
    navigateToDash() {
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
                ref={(ref) => this._indicator = ref}
                toastRef={(ref) => this._toast = ref}>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#192965" />
                    <ScrollView>
                        <View style={styles.container}>
                            {this.renderlogo()}
                            {this.renderForm()}
                            {this.renderRegistrationButton()}
                            {this.renderLoginButton()}
                        </View>
                    </ScrollView>
                    <SafeAreaView />
                </View>
            </PNDView>
        )
    }

    renderlogo() {
        return (
            <View style={styles.logoContainer}>
                <Image
                    style={[styles.loginLog]}
                    source={{ uri: 'pandemix_logo' }}
                    resizeMode='cover' />

                <PNDText style={styles.title} fontType='bold' fontSize={25} textColor='#192965' text='Register' />
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
                            placeholder={'Set your 4 digit pin'}
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

    renderRegistrationButton() {
        return (
            <TouchableOpacity style={styles.loginButton}
                onPress={() => {
                    this.submitRegister();
                }}>
                <PNDText fontType='bold' fontSize={20} textColor='#ffffff' text='Register' />
            </TouchableOpacity>
        )
    }

    renderLoginButton() {
        return (
            <View style={styles.registrationButtonContainer}>
                <PNDText fontType='bold' fontSize={18} style={{ marginTop: 36 }} textColor='#192965' text="Already have an account ?" />
                <TouchableOpacity style={styles.registerButton} onPress={() => {
                        this.props.navigation.navigate('Login')
                }}>
                    <PNDText fontType='bold' fontSize={18} textColor='#192965' text='Login' />
                </TouchableOpacity>
            </View>
        )
    }
}




