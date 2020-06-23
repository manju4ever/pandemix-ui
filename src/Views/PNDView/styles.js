import { StyleSheet, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    container: {
        flex: 1.0,
        justifyContent: 'center'
    },
    mainView: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    mainTouchableView: {
        position: 'absolute', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 10,
        left: Dimensions.get('window').width/2 - 50
    }
})

export default styles