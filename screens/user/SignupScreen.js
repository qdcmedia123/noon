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
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
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

const AuthScreen = (props, navigation) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [sucessFullRegistered, setSucessFullRegistered] = useState(false);

  

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName:'',
      lastName:'',
      email: '',
      password: '',
      confirm_password:''
    },
    inputValidities: {
      firstName:false,
      lastName:false,
      email: false,
      password: false,
      confirm_password:false
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

     // console.log(formState);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });

     
    },
    [dispatchFormState]
  );

  const register = async() => {
    
    console.log(formState);
    let action;
    action = authActions.signup(
      formState.inputValues.firstName,
      formState.inputValues.lastName,
      formState.inputValues.email,
      formState.inputValues.password
    )
    setError(null);
    setIsLoading(true);
    try{
      await dispatch(action);
      //props.navigation.navigate('Home')
      setSucessFullRegistered(true);
    } catch(err) {
      setError(err.message);
      setIsLoading(false);
    }

    
  }

  const lostFocusHandler =  useCallback(() => {
      
   // console.log(formState);
  }, [formState]);


  const navigateToHome = useCallback(() => {
    setError(null);
    setIsLoading(false);
    setSucessFullRegistered(false)
    props.navigation.navigate('Home')
  })

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={styles.screen}
    >
      {/*
       {}
      */}
          {!sucessFullRegistered ? (<ScrollView>
            

            <View style = {styles.formContainer}>
            
            <Input
              id="firstName"
              label="First Name"
              keyboardType="default"
              required
              minLength={2}
              autoCapitalize="none"
              errorText="Please enter your first name."
              onInputChange={inputChangeHandler}
              initialValue=""
              onBlur={lostFocusHandler}
            />

          <Input
              id="lastName"
              label="Last Name"
              keyboardType="default"
              required
              minLength={2}
              autoCapitalize="none"
              errorText="Please enter your last name."
              onInputChange={inputChangeHandler}
              initialValue=""
              
            />

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
              minLength={2}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
              
            />
       
          

            <View style={styles.buttonContainer}>
            {isLoading ? <ActivityIndicator size = 'small'/> :
              <Button
                title= 'Sign Up'
                style={styles.actionButton}
                onPress={register}
                
              />}
            </View>
            <View style={styles.buttonContainer}>
             
                <Text
                
                onPress={() => props.navigation.navigate('AuthUser')}
                style={styles.swithcText}
              >Already have an account? Sign in </Text>
              
            </View>
            </View>
           {/*
           
         
           */}
            
          </ScrollView>
        ) : (<View style={styles.sucessContainer}>
          <Ionicons name = "check-circle" size = {100} style={styles.sucessIcon}></Ionicons>
          <Text style={styles.sucessText}>Registration Sucess</Text>
          
          <Button title = "Continue Shoppin"
          style={styles.actionButton}
          onPress={navigateToHome}>
                <Text>Continue Shopping</Text>
              </Button>
          </View>)}
          
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Create an account',
  };
};



const styles = StyleSheet.create({
  sucessText:{
    padding:15,
    lineHeight:40,
    fontFamily:'Poppins-Regular',
    fontSize:20
  },
  sucessIcon:{
    color:'#69855B',
    
    
  },
  sucessContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
