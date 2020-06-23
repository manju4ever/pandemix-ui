import { StyleSheet, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: '#ffffff',
        height: '100%'
    },
    loginLog: {
        height: 150,
        width: 150,
        marginTop: -16,
        alignSelf: 'center'
    },
    loginView: {
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
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
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
        borderRadius: 4,
        height: "100%",
        width: '100%'
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
        marginTop: 36,
        backgroundColor: '#192956',
        borderRadius: 30,
        elevation: 4,
        paddingLeft: 48,
        paddingRight: 48,
        paddingTop: 12,
        paddingBottom: 12,
        alignSelf: 'center'
    },
    registerButton: {
        marginTop: 16,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        elevation: 4,
        paddingLeft: 48,
        paddingRight: 48,
        marginBottom: 16,
        paddingTop: 12,
        paddingBottom: 12,
        alignSelf: 'center'
    },
    registrationButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrow: {
        height: 56,
        width: 56,
        tintColor: '#192965'
    },
})

export default styles