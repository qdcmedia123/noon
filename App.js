import 'react-native-gesture-handler';
import  React, {useEffect, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/ShopNavigator';


import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import authReducer from './store/reducers/auth';
import stripe from 'tipsi-stripe';
stripe.setOptions({
  publishableKey: 'pk_test_5eCrZUNWnbmLG8iLe6wILAsy008tnT6WEo',
  merchantId: 'Test',
  androidPayMode: 'test', // if you are testing
});

console.log(stripe);

const rootReducer = combineReducers({
  products:productsReducer,
  cart: cartReducer,
  auth:authReducer
})

const middleware = [ReduxThunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const fetchFont = async() => {
       await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Light':require("./assets/fonts/Poppins-Light.otf") ,
        'Poppins-Medium':require("./assets/fonts/Poppins-Medium.otf") ,
        'Poppins-SemiBold':require("./assets/fonts/Poppins-SemiBold.otf") ,
        'Poppins-Bold':require("./assets/fonts/Poppins-Bold.otf"),
      })

      setFontLoaded(true)
    }

    fetchFont()
  })
  // Check if fonts is loaded 
  if(fontLoaded) {
    return   <Provider store = {store}><ShopNavigator/></Provider>
  } else {
    return (<View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>)
    
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
   
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  test:{
    fontFamily:'Poppins-Regular'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
