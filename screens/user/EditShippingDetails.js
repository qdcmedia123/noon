import React, { useState, useCallback, useReducer, useEffect, useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert
} from "react-native";
import { useDispatch } from 'react-redux';
import CountryPicker, {
  FlagButton,
  Flag,
} from "react-native-country-picker-modal";
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import MapPreview from '../../components/map/MapPreview';
import Ionicons from "react-native-vector-icons/FontAwesome5";
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


function App(props) {
  const dispatch = useDispatch();
 
  const [countryCode, setCountryCode] = useState("AE");
  const [countryCodePhone, setCountryCodePhone] = useState("+971");
  const [error, setError] = useState();
  const [addressLabel, setAddressLabel] = useState('home')
  const getLocation = props.navigation.getParam("pickedLocation");
  const auth = useSelector(state => state.auth);
  console.log(auth.token);

  useEffect(() => {
    if(error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error])

  
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      additionalAddress:'',
      phoneCode:countryCodePhone,
      mobileNumber: '',
      firstName: '',
      lastName:'',
      addressLabel:'home'
    },
    inputValidities: {
      additionalAddress:false,
      phoneCode:true,
      mobileNumber: false,
      firstName: false,
      lastName:false,
      addressLabel:true
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
     dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])


  const dialingCode = useCallback(() => {}, [dialingCode]);
  const lostFocusHandler =  useCallback(() => {
      
    // console.log(formState);
   }, [formState]);
   
  const saveAddress = () => {
    
    if (formState.formIsValid === true) {
      // Submit your form to the server 
      // After sucessful the data is added 
      // Return to the shipping screens for the client 
      // Send http request to send and return back to shipping screens

      // Get the user id 
      const {email, user_id} = jwt_decode(auth.token);
      formState.inputValues.location = getLocation;
      console.log(formState);

    } else {
      // Show error pup to the client 
    }
    // Check if all is goold 
    
  }

  const addressLabelChange =  useCallback((label) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: label,
      isValid: true,
      input: 'addressLabel'
    })
    
  }, [dispatchFormState]);

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
}

  return (
   <ScrollView>
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.row]}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={{  }}
          />

          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelBtnTxt}>CANCEL</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.flag]}>
            <View style={styles.countrySelectView}>
              <Flag {...{ countryCode, flagSize: 20 }} />

             
            </View>
          </View>

          <TouchableOpacity style={styles.cancelBtn}>
            <Text 
              style={styles.setAsDefault}>Set as a default</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.locationInfoBack]}>
          <Text style={[styles.locationInformation]}>LOCATION INFORMATION</Text>
        </View>

        <View style={[styles.row, styles.extraPad]}>
          <View style={styles.col_md_6}>
            <Text style={[styles.unNammed]}>Unammed Road - JLT</Text>
            <Text style={[styles.locName]}>Dubai</Text>
          </View>

          <View style={[styles.col_md_6, styles.googleImageScreen]}>
          <MapPreview onPress={pickOnMapHandler} style = {styles.mapPreview} location={getLocation}>
          </MapPreview>
          </View>

          <View style={styles.viewStyleForLine}></View>

          <View style={styles.col_md_12}>
            
            <Input
              id="additionalAddress"
              label="Additional address"
              keyboardType="default"
              required
              minLength={2}
              autoCapitalize="none"
              errorText="Please enter your additional address."
              onInputChange={inputChangeHandler}
              initialValue=""
              onBlur={lostFocusHandler}
            />
          </View>
        </View>

        <View style={[styles.locationInfoBack]}>
          <Text style={[styles.locationInformation]}>PERSONAL INFORMATION</Text>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.col_md_12]}>
            <Text style={[styles.paddintb]}>Mobile Number</Text>
          </View>

          <View style={[styles.col_md_3]}>
            <Text style={[styles.countryCode]}>{countryCodePhone}</Text>
          </View>

          

          <View style={[styles.col_md_6]}>
            <Input
              id="mobileNumber"
              keyboardType="default"
              required
              minLength={8}
              autoCapitalize="none"
              errorText="Please enter you mobile number"
              onInputChange={inputChangeHandler}
              initialValue=""
              onBlur={lostFocusHandler}
            />
          </View>

          <View style={styles.col_md_12}>
            
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
          </View>

          <View style={styles.col_md_12}>
            
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
              onBlur={lostFocusHandler}
            />
          </View>
       
       
        </View>
        <View style={styles.homeWorkView}>
          <Text style={styles.addressLabel}>Address Label(Option)</Text>
          <View style={styles.row_non_bck}>
            <TouchableOpacity onPress = {() => addressLabelChange('home')}>
              <Text style={formState.inputValues.addressLabel === 'home' ? styles.homeWorkBtnSelected : styles.homeWorkBtn}>
                <Ionicons name="home" size={16} /> Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mrz} onPress= {() => addressLabelChange('work')}>
              <Text style={formState.inputValues.addressLabel === 'work' ? styles.homeWorkBtnSelected : styles.homeWorkBtn}>
                <Ionicons name="briefcase" size={16} /> Work
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.footer} onPress= {() => saveAddress()}>
          <Text style={[styles.poppinsRegular, styles.saveAddress]}>
            {" "}
            Save Address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
 

    </ScrollView>
    
 );
}




const styles = StyleSheet.create({
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    flex: 1,
  
  },
  countryCode: {
    fontFamily: "Poppins-Bold",
    color: "#414551",
  },

  paddintb: {
    paddingVertical: 10,
    color: "#7e8597",
  },
  locName: {
    color: "#8d919a",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  unNammed: {
    color: "#353c42",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  saveAddress: {},
  footer: {
    height: "100%",

    backgroundColor: "#008080",

    alignItems: "center",
    padding: 15,
    marginBottom: 0,
  },
  mrz: {
    marginLeft: 15,
  },
  homeWorkBtnSelected: {
    fontSize: 16,
    color: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: "#414550",
  },
  homeWorkBtn: {
    fontSize: 16,
    color: "#414550",
    borderColor: "#414550",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  addressLabel: {
    fontFamily: "Poppins-Regular",
    color: "#8c909c",
    lineHeight: 40,
  },
  homeWorkView: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  borderHair: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
  },
  mb10: {
    marginTop: -15,
  },
  inputText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    height: 40,
  },
  viewStyleForLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    paddingTop: 5,
    paddingBottom: 10,
  },
  hrLine: {
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
    height: 2,
  },
  col_md_12: {
    flexBasis: "100%",
  },
  col_md_6: {
    flexBasis: "50%",
  },
  col_md_4: {
    flexBasis: "25%",
  },
  col_md_3: {
    flexBasis: "20%",
  },

  hr: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  googleImageScreen: {
    flex: 1,
    alignItems: "flex-end",
  },
  locationInfoBack: {
    padding: 10,
  },
  locationInformation: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#7e849a",
  },
  flagIcon: {
    fontSize: 28,
  },
  setAsDefault: {
    fontFamily: "Poppins-Regular",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#414551",
    borderRadius: 15,
    color: "#414551",
  },
  cancelBtnTxt: {
    fontFamily: "Poppins-Regular",
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#000000",
  },
  cancelBtn: {
    flex: 1,
    alignItems: "flex-end",
  },
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flexWrap: "wrap",
  },

  row_non_bck: {
    flexDirection: "row",

    flexWrap: "wrap",
  },
});

export default App;
