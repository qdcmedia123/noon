import React from 'react';
import { View, Text, Image, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

// Screens 

import HomeScreen from '../screens/HomeScreen';
import FeedsScreens from '../screens/FeedsScreen'
import MessagesScreen from '../screens/user/MessagesScreen';
import CartScreen from '../screens/shop/CartScreen';
import AccountScreen from '../screens/user/AccountScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailScreen';
import AuthScreen from '../screens/user/AuthScreen';
import SignupScreen from '../screens/user/SignupScreen';
import ShippingDetailsScreen from '../screens/user/ShippingDetailsScreen';
import ShippingDetailsScreenSelect from '../screens/user/ShippingDetailsScreenSelect';
import EditShippingDetails from '../screens/user/EditShippingDetails';
import MapScreen from '../screens/user/MapScreen';
import PaymentScreen from '../screens/shop/PaymaentScreen';

// Use reducer 
/*

https://github.com/react-navigation/react-navigation/issues/3980

Search the string 
"ZackTRobertson commented on 11 May 2018"

https://stackoverflow.com/questions/54638872/how-can-i-hide-the-bottom-tab-bar-on-a-specific-screen-react-navigation-3-x
https://stackoverflow.com/questions/51352081/react-navigation-how-to-hide-tabbar-from-inside-stack-navigation
https://stackoverflow.com/questions/51352081/react-navigation-how-to-hide-tabbar-from-inside-stack-navigation
*/



const defaultStackNavOptions = {
  
    headerTitleAlign: 'center',
    headerTitleStyle: { alignSelf: 'center' },
    headerTitle: () => <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
    <Image
        source={require('../assets/img/logo.png')}
        style={{width:150, height:22, marginTop:20}}
    />
    </View>
    ,
  
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      
    },
  
    headerTintColor:
      Platform.OS === 'android' ? Colors.accent : Colors.primary
  };

  const AppNavigator = createStackNavigator(
    {
      Home:HomeScreen,
      ProductDetails:ProductDetailsScreen,
      Cart:CartScreen
    },
    
    {
      // initialRouteName: 'Categories',
      defaultNavigationOptions: defaultStackNavOptions,
      
    }
  );

const FeedNavigator = createStackNavigator(
    {
      Details: {
          screen: FeedsScreens
      }
    },
    {
      // initialRouteName: 'Categories',
      defaultNavigationOptions: defaultStackNavOptions
    }
  );

const MessagesNavigator = createStackNavigator(
    {
      Messages: {
          screen: MessagesScreen
      }
    },
    {
      // initialRouteName: 'Categories',
      defaultNavigationOptions: defaultStackNavOptions
    }
);

const CartNavigator = createStackNavigator(
    {
      Cart: CartScreen,
      ShippingDetailsScreenSelect: {
        screen:ShippingDetailsScreenSelect,
        navigationOptions:{
          tabBarVisible: false
        }
      },
      PaymentScreen:PaymentScreen
    },
    {
      // initialRouteName: 'Categories',
      defaultNavigationOptions: defaultStackNavOptions
    }
);

const AccountNavigator = createStackNavigator({
      Account: AccountScreen,
      ShippingDetails: ShippingDetailsScreen,
      EditShippingDetails:EditShippingDetails,
      Map: MapScreen
    });


const AuthNavigator = createStackNavigator(
  {
    AuthUser: {
        screen: AuthScreen
    }
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);


const SignupNavigator = createStackNavigator(
  {
    SignupUser: SignupScreen

  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);








const tabScreenConfig = {
    Home:{
      screen: AppNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons
              name = "home"
              size = {25}
              color = {tabInfo.tintColor}
            />
          );
        }
      },
      title: 'This is home'
    },
    Feed:{
        screen: FeedNavigator,
        navigationOptions: {
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name = "rss"
                size = {25}
                color = {tabInfo.tintColor}
              />
            );
          }
        }
      },
      Messages:{
        screen: MessagesNavigator,
        navigationOptions: {
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name = "comments"
                size = {25}
                color = {tabInfo.tintColor}
              />
            );
          }
        }
      },
      Cart:{
        screen: CartNavigator,
        navigationOptions: {
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name = "cart-plus"
                size = {25}
                color = {tabInfo.tintColor}
              />
            );
          }
        }
      },

      Account:{
        screen: AccountNavigator,
        navigationOptions: {
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name = "user-alt"
                size = {25}
                color = {tabInfo.tintColor}
              />
            );
          }
        }
      }
    
  };


const MealsFavTabNavigator = 
  Platform.OS === 'android' ?
  createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: 'white',
    
    barStyle: {
      backgroundColor: Colors.primary
    }

  })
  : createBottomTabNavigator(tabScreenConfig, {
      tabBarOptions: {
        activeTintColor: Colors.accent
      }
  });


  const MainNavigator = createDrawerNavigator(
    {
      MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
          drawerLabel: 'Home'
        }
      },
      auth: {
        screen: AuthNavigator,
        navigationOptions: {
          drawerLabel: 'Login'
        }
      },
      SignupUser: {
        screen: SignupNavigator,
        navigationOptions: {
          drawerLabel :() => null
        }
        
      }    

    },{
      contentOptions: {
        activeTintColor: Colors.accent,
        labelStyle: {
          fontFamily: 'Poppins-Light'
        }
      }
    });






export default createAppContainer(MainNavigator);