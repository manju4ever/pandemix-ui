import { StyleSheet, Dimensions, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: '#ffffff',
        width:'100%',
        height:'100%'
    },
    notificationBox: {
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        padding: 16,
        marginLeft: 16,
        marginRight: 16,
        flex: 1.0,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    notificationiewContainer: {
        flex: 1.0,
        flexDirection: 'column'
    },
    profilePic: {
        height: 75,
        width: 75,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#192965'
    },
    titleContainer: {
        flexDirection: 'row',
        marginLeft: 16,
        alignItems: 'center',
        overflow: 'hidden',
        flexWrap: 'wrap',
        width: '100%'
    },

})

export default styles