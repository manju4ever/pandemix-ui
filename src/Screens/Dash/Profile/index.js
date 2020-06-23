import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Toast from '../../../utils/Toast'
import styles from './styles'
import PNDText from '../../../Views/PNDText';
import PNDView from '../../../Views/PNDView';
import LoginTextField from '../../../Views/LoginTextField';
import { fetchProfile, updateProfile } from '../../../actions'
import { logout } from '../../../actions/user';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            name: null,
            email: null,
            country: null,
            age_group: null,
            covid19_positive: false,
            covid19_positive_on: null,
            focusedName: false,
            focusedEmail: false
        }
    }

    componentDidMount() {
        this.fetchUserProfile();
    }

    fetchUserProfile = () => {
        this._indicator.startActivity()
        return fetchProfile().then(result => {
            console.debug(`Profile data fetched:`, result.data);
            this._indicator.stopActivity()
            this.setState({
                ...this.state,
                ...result.data
            });
        }).catch(err => {
            this._indicator.stopActivity()
            Toast.info(`Fetching Profile Failed.`)
        })
    }

    submitUpdateProfile = () => {
        const { email, name } = this.state;
        this._indicator.startActivity();
        return updateProfile({
            email,
            name,
        }).then((res) => {
            console.debug('Profile Updated Successfully', res.data);
            Toast.info(`Profile update successful.`)
            this._indicator.stopActivity()
        }).catch(err => {
            this._indicator.stopActivity()
            Toast.info(`Updating Profile Failed.`, err);
            console.warn("Update profile failed", err);
        });
    }

    signOut() {
        Alert.alert(
            'Logout',
            'Are you sure , you want to loggout ?',
            [
                { text: 'Cancel', onPress: () => console.debug('Cancel Update Covid Status !'), style: 'cancel' },
                { text: 'OK', onPress: () => logout(this.props.screenProps.navigation) },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <PNDView
                ref={(ref) => this._indicator = ref}>
                <ScrollView>
                    <View style={styles.container}>
                        {this.renderlogo()}
                        {this.renderForm()}
                        {this.renderUpdateButton()}
                        {this.renderLogout()}
                    </View>
                </ScrollView>
            </PNDView>
        )
    };

    renderlogo() {
        return (
            <View style={styles.logoContainer}>
                <Image
                    style={[styles.loginLog]}
                    source={{ uri: 'pandemix_logo' }}
                    resizeMode='cover' />
            </View>
        );
    }

    renderForm() {
        return (
            <View style={styles.loginView}>
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={[styles.box, { backgroundColor: '#bbb' }]}>
                        <LoginTextField
                            textInputStyle={{ color: "white", textAlign: 'center', fontSize: 24 }}
                            editable={false}
                            keyboardType='default'
                            value={this.state.username || "Anonymous"} />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={this.state.focusedName ? styles.boxSelected : styles.box}>
                        <LoginTextField
                            placeholder={'Name'}
                            keyboardType='default'
                            value={(this.state.name == "null"  || this.state.name == "undefined") ? null: this.state.name }
                            onFocus={() => {
                                this.setState({ focusedName: true })
                            }}
                            onBlur={() => {
                                this.setState({ focusedName: false })
                            }}
                            onChangeText={(text) => {
                                this.setState({
                                    name: text
                                })
                            }} />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={this.state.focusedEmail ? styles.boxSelected : styles.box}>
                        <LoginTextField
                            placeholder={'Email'}
                            keyboardType='default'
                            value={(this.state.email == "null"  || this.state.email == "undefined") ? null: this.state.email }
                            onFocus={() => {
                                this.setState({ focusedEmail: true })
                            }}
                            onBlur={() => {
                                this.setState({ focusedEmail: false })
                            }}
                            onChangeText={(text) => {
                                this.setState({
                                    email: text
                                })
                            }} />
                    </View>
                </View>
            </View >
        )
    }

    renderUpdateButton() {
        return (
            <TouchableOpacity style={styles.loginButton}
                onPress={this.submitUpdateProfile}>
                <PNDText fontType='bold' fontSize={20} textColor='#ffffff' text='Update' />
            </TouchableOpacity>
        )
    }

    renderLogout() {
        return (
            <TouchableOpacity style={styles.logoutBtn}
                onPress={() => this.signOut()}>
                <PNDText fontType='bold' fontSize={20} textColor='red' text='Logout' />
            </TouchableOpacity>
        )
    }

}