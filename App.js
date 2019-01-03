import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screen/LoginScreen'
import RegisterCarScreen from './screen/RegisterCarScreen';
import CarListScreen from './screen/CarListScreen';
import DetailCarScreen from './screen/DetailCarScreen';
import RegisterAuctionScreen from './screen/RegisterAuctionScreen'
import SettingScreen from './screen/SettingScreen';
import { Ionicons } from '@expo/vector-icons'
import MyCarListScreen from './screen/MyCarListScreen';
import MyCarDetailScreen from './screen/MyCarDetailScreen';

const App2Navigator = createStackNavigator({
  Home1: {
    screen: MyCarListScreen
  },
  DetailCar1: {
    screen: MyCarDetailScreen
  }
})
const AppNavigator = createStackNavigator({
  Home2: {
    screen: CarListScreen
  },
  DetailCar2: {
    screen: DetailCarScreen
  }
})
const Setting = createStackNavigator({
  setting: {
    screen: SettingScreen
  }
})
const RegisterCar = createStackNavigator({
  register: {
    screen: RegisterCarScreen
  }
})
const RegisterAuction = createStackNavigator({
  registerAuction: {
    screen: RegisterAuctionScreen
  }
})
const TabNavigator = createBottomTabNavigator({
  MyCar: App2Navigator,
  Auction: AppNavigator,
  Settings: Setting,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'MyCar') {
          iconName = 'ios-car';
        } else if (routeName === 'Auction') {
          iconName = `ios-list`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: LoginScreen,
    },
    TabNav: {
      screen: TabNavigator
    },
    RegisterCar: {
      screen: RegisterCar
    },
    RegisterAuction: {
      screen: RegisterAuctionScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
