import React, { useReducer, useCallback, useState, useEffect, Fragment } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text
} from 'react-native';

import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';





const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });
 
  useEffect(() => {
    if(error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
    if(isSignup) {
      props.navigation.setParams({screen:'Signup'})
    } else {
      
      props.navigation.setParams({screen:'Login'})
    }
  }, [error, isSignup])

 

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={styles.screen}
    >
      
          <ScrollView>
            <View style = {styles.formContainer}>
            

            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
           
          

            <View style={styles.buttonContainer}>
            {isLoading ? <ActivityIndicator size = 'small'/> :
              <Button
                title= {isSignup ? 'Sign Up' : 'Login'}
                style={styles.actionButton}
                
              />}
            </View>
            <View style={styles.buttonContainer}>
              {/*
              <Text
                
                onPress={() => {setIsSignup(prevState => !prevState)}}
                style={styles.swithcText}
              >Switch to {isSignup ? 'Already have an account? Sign in' : 'Dont"t have an account? Sing Up'}</Text>
               
              */}
               
               <Text                
                onPress={() => props.navigation.navigate('SignupUser')}
                style={styles.swithcText}
              >Dont"t have an account? Sing Up </Text>
            </View>
            </View>
          
          </ScrollView>
        
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Welcome back!',
  };
};



const styles = StyleSheet.create({
  formContainer:{
    flex:1,
    padding:15
  },
  swithcText:{
    color:'gray',
    fontFamily:'Poppins-Bold',
    textAlign:'center'
  },
  actionButton:{
    flex:1,
    backgroundColor:'#3866df',
    color:'#fff',
    paddingTop:15,
    fontFamily:'Poppins-Regular'
  },
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
