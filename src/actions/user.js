import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

export function saveUser(details) {
    let str = JSON.stringify(details)
    AsyncStorage.setItem('user_details', str);
}

export function logout(navigation) {
    AsyncStorage.clear();
    const navigateAction = NavigationActions.navigate({
        routeName: 'Registration',
        params: {},
        action: NavigationActions.navigate({ routeName: 'Registration' }),
    });
    const resetAction = StackActions.reset({
        index: 0,
        actions: [navigateAction],
    });

   return  navigation.dispatch(resetAction);
}