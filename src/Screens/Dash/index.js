import React, { Component } from 'react';
import { View, Image, StatusBar, TouchableOpacity, Linking } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {
    PermissionModal,
    PermissionItem
  } from "react-native-permissions-modal";

import styles from './styles'
import PNDText from '../../Views/PNDText';
import Map from './Map'
import Notification from './Notification'
import Feeds from './Feeds'
import Profile from './Profile'
import { updateFCMToken } from '../../actions';

(async() => {
      await messaging().registerForRemoteNotifications();
      await updateFCMToken();
})()
export default class Dash extends Component {

    constructor(props) {
        super(props);
        this.permModal = null;
    }

    componentDidMount() {
        PushNotification.localNotification({
            title: "🙏 Namaste !", 
            message: "Stay safe. Stay home. We'll get through this !", 
            playSound: false, 
            soundName: 'default', 
        });
        this.checkPermissionSettings();
    }

    checkPermissionSettings = async () => {
        try {
            const perm_1 = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
            const perm_2 = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if(perm_1 === RESULTS.GRANTED || perm_2 === RESULTS.GRANTED) {
                console.debug(`Permission already set. Skipping request...`)
            } else {
                this.permModal.openModal();
            }
        }catch(err) {
            console.error(`Soething wrong with checking permission`, err);
        }   
    }

    handlePermissionTap = (type) => {
        console.debug(`Redirecting to ${type} settings page`);
        Linking.openSettings();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#192965" />
                {this.renderToolbar()}
                <Stack screenProps={this.props.navigation} />
                <PermissionModal
                    subtitle={`To ensure smooth functioning of Contact Tracing using the application. We require the following permissions.`}
                    panGestureEnabled={false}
                    closeOnOverlayTap={true}
                    ref={ref => (this.permModal = ref)}
                >
                    <PermissionItem
                        title="Location"
                        iconStatusColor="red"
                        subtitle={`Please select Permissions -> Location -> "Allow All the time" on the settings page`}
                        source={require("./assets/location.png")}
                        onPress={this.handlePermissionTap}
                    />
                </PermissionModal>
            </View>
        )
    };

    renderToolbar() {
        return (
            <View style={styles.headerContainer}>
                {this.renderbackButton()}
                <PNDText style={styles.title} fontType='bold' fontSize={25} textColor='#192965' text='Pandemic Tracker' />
            </View>
        )
    }

    renderbackButton() {
        return (
            <TouchableOpacity style={styles.backArrowwraperStyle} onPress={() => {
                this.props.navigation.goBack(null);
            }}>
                <Image
                    style={styles.backArrow}
                    source={{ uri: null }}
                    resizeMode='contain' />

            </TouchableOpacity>
        )
    }
}


const TabView = createBottomTabNavigator({
    Map: {
        screen: Map,
    },
    Feeds: {
        screen: Feeds,
    },
    Notification: {
        screen: Notification,
    },
    Profile: {
        screen: Profile,
    },
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            defaultProps: navigation,
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName = '';
                let iconSelected = '';
                let title = ''

                if (routeName === 'Feeds') {
                    iconName = 'ic_news_unselected'
                    iconSelected = 'ic_news_selected'
                    title = "Feeds"
                }
                else if (routeName === 'Map') {
                    iconName = 'ic_map_unselected'
                    iconSelected = 'ic_map_selected'
                    title = "Map"
                }
                else if (routeName === 'Notification') {
                    iconName = 'ic_noti_unselected'
                    iconSelected = 'ic_noti_selected'
                    title = "Notifications"
                } else if (routeName === 'Profile') {
                    iconName = 'ic_profile_unselected'
                    iconSelected = 'ic_profile_selected'
                    title = "Profile"
                }

                if (focused) {
                    return (
                        <View style={{ flex: 1.0, justifyContent: 'center', margin: 5, }}>
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    alignSelf: 'center'
                                }}
                                source={{ uri: iconSelected }}
                                resizeMode='contain' />
                            <PNDText
                                style={{ alignSelf: 'center', marginTop: 2, textAlign: 'center', fontWeight: 'bold' }}
                                fontSize={10}
                                textColor='#192965'
                                text={title} />
                        </View>
                    )
                }
                else {
                    return (
                        <>  
                            {/* <FirebaseNotification /> */}
                            <View style={{ flex: 1.0, justifyContent: 'center', margin: 5, }}>
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    alignSelf: 'center'
                                }}
                                source={{ uri: iconName }}
                                resizeMode='contain' />
                        </View>
                        </>
                    )
                }


            },
            tabBarOnPress: () => {
                const { routeName } = navigation.state;
                navigation.navigate(routeName, { date: new Date() })
            },

        }),
        tabBarOptions: {
            showLabel: false,
            inactiveTintColor: 'white',
            inactiveBackgroundColor: 'white',
            elevation: 5
        },
    })


const RootStack = createStackNavigator(
    {
        TabView: {
            screen: TabView,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);


const Stack = createAppContainer(RootStack);

