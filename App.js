import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;

import Splash from './src/Screens/Splash'
import Login from './src/Screens/Login'
import Registration from './src/Screens/Registration'
import Verification from './src/Screens/Verification'
import Dash from './src/Screens/Dash';
import FeedDetail from './src/Screens/FeedDetail';

const NavigationStack = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Registration: {
    screen: Registration,
    navigationOptions: {
      header: null
    }
  },
  Verification: {
    screen: Verification,
    navigationOptions: {
      header: null
    }
  },
  Dash: {
    screen: Dash,
    navigationOptions: {
      header: null
    }
  },
  FeedDetail: {
    screen: FeedDetail,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(NavigationStack);



