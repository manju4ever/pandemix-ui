import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },

    loginLog: {
        height: 85,
        width: 85,
        alignSelf: 'center'
    },
    loginView: {
        width: '100%',
        flex: 1.0,
        backgroundColor: '#ffffff',
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 24,
    },
    backArrow: {
        height: 56,
        width: 56,
        tintColor: '#192965'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 20,
        height: 120,
        width: 120,
        borderRadius: 60,
        margin: 16,
    },
    title: {
        marginTop: 24,
        marginBottom: 24,

    },
    box: {
        flex: 1.0,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#ffffff',
        elevation: 4,
        borderRadius: 4
    },
    boxSelected: {
        flex: 1.0,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#ffffff',
        elevation: 4,
        borderRadius: 4,
        height: "100%",
        width: '100%',
        borderWidth: 1,
        borderColor: '#192965'
    },
    boxCountryCode: {
        flex: 0.45,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#ffffff',
        elevation: 4,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        width: "80%",
        marginTop: 40,
        marginBottom: 10,
        backgroundColor: '#192956',
        elevation: 4,
        paddingLeft: 48,
        paddingRight: 48,
        paddingTop: 12,
        paddingBottom: 12,
        alignSelf: 'center',
    },
    logoutBtn: {
        width: "80%",
        marginBottom: 40,
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 2,
        elevation: 4,
        paddingLeft: 48,
        paddingRight: 48,
        paddingTop: 12,
        paddingBottom: 12,
        alignSelf: 'center',
        marginTop: 16,
    },
    registerButton: {
        marginBottom: -16,
        marginTop: 16,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        elevation: 4,
        paddingLeft: 48,
        paddingRight: 48,
        paddingTop: 12,
        paddingBottom: 12,
        alignSelf: 'center'
    },
    registrationButtonContainer: {
        flex: 1.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logout: {
        backgroundColor: 'red',
        borderRadius: 20,
        elevation: 2,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 12,
        marginBottom: 4,
        alignSelf: 'center',
    },
})

export default styles