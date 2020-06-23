import { StyleSheet, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputView: {
        flex: 1,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        height: 45,
        fontSize: 16,
        fontWeight: '400',
        justifyContent: 'space-between'
    },
    justifyCenterContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        flex: 1,
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        color: '#192965'
    },
});

export default styles