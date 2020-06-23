import React, { Component } from 'react';
import { View, Image, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Toast from '../../utils/Toast'
import styles from './styles'
import PNDText from '../../Views/PNDText';
import LoginTextField from '../../Views/LoginTextField'
import PNDView from '../../Views/PNDView';
import { signUp } from '../../actions'
import firebaseAuth from '@react-native-firebase/auth';
import { StackActions, NavigationActions } from 'react-navigation';
import { saveUser } from '../../actions/user';
import { requestOTP as getOTP, verifyOTP } from '../../actions/phone_2factor';

PREMIUM_OTP_COUNTRIES = ['91', '49'];

export default class Verification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mPhoneNumber: this.props.navigation.getParam('mPhoneNumber'),
            mCountryCode: this.props.navigation.getParam('mCountryCode'),
            mPin: this.props.navigation.getParam('mPin'),
            mCode: '',
            mConfirmation: null,
            mSessionId: null,
            focusedCode: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.requestOTP();
        }, 500);

    }

    resetOTPState = () => {
        return this.setState({ 
            mCode: null, 
            mSessionId: null, 
            mConfirmation: null 
        });
    }

    requestOTP = () => {
        const { mCountryCode, mPhoneNumber } = this.state;  
        console.debug(`Requesting OTP for:`, mCountryCode, mPhoneNumber);      
        const _requestOTP = PREMIUM_OTP_COUNTRIES.indexOf(mCountryCode) !== -1 ? getOTP({
            countryCode: mCountryCode,
            phone: mPhoneNumber,
        }) :firebaseAuth().signInWithPhoneNumber(`+${mCountryCode}${mPhoneNumber}`)
        
        this._indicator.startActivity();
        return _requestOTP
            .then((confirmation) => {
                this._indicator.stopActivity();
                const mSessionId = confirmation.data && confirmation.data['Details'] ? confirmation.data['Details'] : null;
                this.setState({ mConfirmation: confirmation, mSessionId });
            })
            .catch(err => {
                this._indicator.stopActivity();
                console.warn(`Error fetching OTP`, err);
                Toast.info('OTP Request Failed. Try Again', 5000)
            });
    }

    apiCallSignUp = () => {
        const { mPhoneNumber, mCountryCode, mPin} = this.state;
        console.debug(`Registration request for:`, { mPhoneNumber, mCountryCode, mPin});
        this._indicator.startActivity()
        return signUp({
            phone: mPhoneNumber,
            countryCode: mCountryCode,
            pin: mPin,
        }).then(response => {
            this._indicator.stopActivity();
            saveUser(response.data);
            Toast.info('Registration Successful.');
            return this.navigateToDash();
        }).catch(err => {
            this._indicator.stopActivity();
            console.warn(`Registration error`, err);
            Toast.warn(`Account already exists. Please login.`, 500);
        });
    }

    confirmOTP =  () => {
        const { mCountryCode, mConfirmation, mSessionId, mCode } = this.state;
        const _verifyOTP = PREMIUM_OTP_COUNTRIES.indexOf(mCountryCode) !== -1 ? verifyOTP({
            sessionId: mSessionId,
            otp: mCode,
        }) : mConfirmation.confirm(mCode)
        console.debug("Starting OTP Verification");
        console.debug(`Provier details:`,{ mCountryCode, mConfirmation: !!mConfirmation, mSessionId, mCode});
         this._indicator.startActivity();
         return _verifyOTP
            .then(() => {
                this._indicator.stopActivity();
                console.debug(`OTP Verification Successfull`);
                return this.apiCallSignUp();
            }).catch(err => {
                this._indicator.stopActivity();
                console.warn(`Error Verifying OTP`, err);
                return Toast.info('Invalid OTP. Please try again.', 5000);
            });
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

    render() {
        return (
            <PNDView
                ref={(ref) => this._indicator = ref}>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor="#192965" />
                    <ScrollView>
                        <View style={styles.container}>
                            {this.renderlogo()}
                            {this.renderForm()}
                            {this.renderVerify()}
                            {this.renderResend()}
                        </View>
                    </ScrollView>
                    <SafeAreaView />
                </View>
            </PNDView>
        )
    }

    renderbackButton() {
        return (
            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => {
                this.props.navigation.goBack(null)
            }}>
                <Image
                    style={styles.backArrow}
                    source={{ uri: 'back' }}
                    resizeMode='center' />
            </TouchableOpacity>
        )
    }

    renderlogo() {
        const verificationMessage = "Verification code has been sent you on  \n+" + this.state.mCountryCode + " " + this.state.mPhoneNumber + " this number";

        return (
            <View style={styles.logoContainer}>
                {this.renderbackButton()}
                <Image
                    style={[styles.loginLog]}
                    source={{ uri: 'pandemix_logo' }}
                    resizeMode='cover' />

                <PNDText style={styles.title} fontType='bold' fontSize={25} textColor='#192965' text='Verification' />
                <PNDText style={styles.message} fontType='bold' fontSize={15} textColor='gray' text={verificationMessage} />
            </View>

        )
    }

    renderForm() {
        return (
            <View style={styles.loginView}>

                <View style={{ flexDirection: 'row', marginTop: 16 }}>

                    <View style={this.state.focusedCode ? styles.boxSelected : styles.box}>
                        <LoginTextField
                            placeholder={'Enter code'}
                            keyboardType='number-pad'
                            value={this.state.mCode}
                            onFocus={() => {
                                this.setState({ focusedCode: true })
                            }}
                            onBlur={() => {
                                this.setState({ focusedCode: false })
                            }}
                            onChangeText={(text) => {
                                this.setState({
                                    mCode: text
                                })
                            }} />

                    </View>
                </View>
            </View >
        )
    }

    renderVerify() {
        return (
            <TouchableOpacity style={styles.loginButton}
                onPress={() => {
                    this.confirmOTP();
                }}>
                <PNDText fontType='bold' fontSize={20} textColor='#ffffff' text='Verify' />
            </TouchableOpacity>
        )
    }

    renderResend() {
        return (
            <View style={styles.registrationButtonContainer}>
                <PNDText fontType='bold' fontSize={18} style={{ marginTop: 56 }} textColor='#192965' text="I did't receive a code" />
                <TouchableOpacity style={styles.registerButton} onPress={() => {
                    this.requestOTP();
                }}>
                    <PNDText fontType='bold' fontSize={18} textColor='#192965' text='Resend' />
                </TouchableOpacity>
            </View>
        )
    }
}




