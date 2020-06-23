import { StyleSheet, Dimensions, Platform } from 'react-native';
let safeViewHeight = Dimensions.get('screen').height >= 836 ? 44 : 20

const styles = StyleSheet.create({
    continer: {
        backgroundColor: '#d82321'
    },
    flexContainer: {
        flex: 1.0
    },
    navigationView: {
        marginTop: Platform.OS == 'ios' ? safeViewHeight : 0,
        height: Platform.OS == 'ios' ? 44 : 56,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleView: {
        flex: 1.0,
        flexDirection: 'row',
        backgroundColor: '#d82321'
    },
    titleText: {
        textAlign: 'left',
        marginHorizontal: 8,
        alignSelf: 'center'
    },
    titleTabText: {
        textAlign: 'center',
        alignSelf: 'center',
        width: '100%'
    },
    itemsContainer: {
        width: Platform.OS == 'ios' ? 44 : 56,
        height: Platform.OS == 'ios' ? 44 : 56,
        justifyContent: 'center'
    },
    itemStyle: {
        alignSelf:'center',
        height: 20,
        width:20,
    },
})

export default styles