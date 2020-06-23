import { StyleSheet, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: '#ffffff'
    },
    splashLog: {
        height: 200,
        width: 200
    },
    headerContainer: {
        alignItems: 'center',
        width: '100%',
        height: 56,
        elevation: 4,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    backArrowwraperStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        height: 56,
        width: 56
    },
    backArrow: {
        height: '45%',
        width: '45%',
        tintColor: '#192965'
    },
    title: {
        flex: 1.0,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 24,
        marginEnd: 56,
        marginBottom: 24,

    },
})

export default styles