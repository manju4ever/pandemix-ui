import { StyleSheet, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    container: {
        flex: 1.0,
        justifyContent: 'center'
    },
})

export default styles