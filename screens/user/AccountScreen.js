import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Picker } from "react-native";
import Ionicons from "react-native-vector-icons/FontAwesome5";
import CountryPicker, {FlagButton, Flag} from 'react-native-country-picker-modal'
import {} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import {styles} from '../../assets/css/styles';
const AccountScreen = (props) => {
  const [withFlag, setWithFlag] = useState(true);
  const [country, setCountry] = useState(null);
  const [language, setLanguage] = useState(null);

  const [countryCode, setCountryCode] = useState('FR');
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    
  }

  return (
    <ScrollView>
      <View >
        <View style={[styles.topHeader, styles.specificationView]}
        >
          <Image source={require("../../assets/img/logo1.png")} />
          <Text style={styles.halaText}>
            By now, play later with selected cards.
          </Text>
          <Text style={styles.TheReason}>
            By now, play later with selected cards.
          </Text>
        </View>

        <View style={[styles.warp1, styles.specificationView]}>
           <TouchableOpacity style={[styles.signUpSignIn]} onPress = {() => props.navigation.navigate("AuthUser")}>
              <Ionicons name = "user" size={34}></Ionicons> 
              <Text style={styles.signInText}>Sign In</Text> 
           </TouchableOpacity>

           <TouchableOpacity style={[styles.signUpSignIn]} onPress={() => props.navigation.navigate("SignupUser")}>
              <Ionicons name = "user" size={34}></Ionicons> 
              <Ionicons name = "plus" size={13} style={styles.pluseIco}></Ionicons> 
              <Text style={styles.signInText}>Sign Up</Text> 
           </TouchableOpacity>

          
      </View>
        

      <View style={[styles.afterLoginfirstRow, styles.warp1, styles.specificationView]}>
           <TouchableOpacity style={[styles.signUpSignIn]}>
              <Ionicons name = "list" size={34}></Ionicons> 
              <Text style={styles.signInText}>Order</Text> 
           </TouchableOpacity>

           <TouchableOpacity style={[styles.signUpSignIn]}>
              <Ionicons name = "undo" size={34}></Ionicons> 
             
              <Text style={styles.signInText}>Return</Text> 
           </TouchableOpacity>


           <TouchableOpacity style={[styles.signUpSignIn]}>
              <Ionicons name = "heart" size={34}></Ionicons> 
              <Text style={styles.signInText}>Wishlists</Text> 
           </TouchableOpacity>

           <TouchableOpacity style={[styles.signUpSignIn]}>
              <Ionicons name = "credit-card" size={34}></Ionicons> 
              
              <Text style={styles.signInText}>Credits</Text> 
           </TouchableOpacity>

          
      </View>
      
      <View style={[styles.infoContainer]}>
        <Text style={styles.settings}>My Accounts</Text>
      </View>

       <TouchableOpacity style = {styles.bgWhilte} onPress = {() => props.navigation.navigate('ShippingDetails')}>
           <View style={[styles.specificationView, styles.infoContainer]}>
            <Ionicons name = "map" size={23}/>
            <Text style={[styles.language, styles.countryPicker]}>Address</Text>     
            <Text style = {styles.rightIconArrow}><Ionicons name = "arrow-right" size = {18} />   </Text>     
           </View>     
           
       </TouchableOpacity>
      
      <TouchableOpacity style={styles.bgWhilte}>
      <View style = {[styles.specificationView, styles.infoContainer, styles.lanContainer]}>
               <Ionicons name = "credit-card" size = {20} />
               <Text style={[styles.language, styles.countryPicker]}>Payment</Text>
               <Text style = {styles.rightIconArrow}><Ionicons name = "arrow-right" size = {18} />   </Text>
               
            </View>
      
      </TouchableOpacity>
        
        
      <View style={[styles.infoContainer]}>
        <Text style={styles.settings}>SETTINGS</Text>
      </View>

       <TouchableOpacity style = {styles.bgWhilte}>
           <View style={[styles.specificationView, styles.infoContainer]}>
            <Ionicons name = "globe" size={23}/>
           <CountryPicker 
           withFlag = {true}
           onSelect= {onSelect}      
           containerButtonStyle={styles.countryPicker} 
           withCloseButton={true}
           theme={styles.countryPicker}/>
          
             <View style={styles.countrySelectView}>
             < Flag  {...{ countryCode,  flagSize: 20 }} />             

              {/*
              <Text style={styles.instructions}>Press on the flag to open modal</Text>
                    {country !== null && (
                      <Text style={styles.data}>{JSON.stringify(country, null, 2)}</Text>
                    )}
              */}

             </View>
             
           </View>     
           
       </TouchableOpacity>
      
      <TouchableOpacity style={styles.bgWhilte}>
      <View style = {[styles.specificationView, styles.infoContainer, styles.lanContainer]}>
               <Ionicons name = "language" size = {20} />
               <Text style={[styles.language, styles.countryPicker]}>Language</Text>
               
               <View style={[styles.languagePicker]}>               
                 <Picker
                 mode="dropdown"
                 iosIcon={<Ionicons name="arrow-down" />}
                 style={{width: 150, height:25, bottom:0,  }}
                 itemStyle={styles.languagePickerEl}
                 placeholder="Select Language"
                 placeholderStyle={{ color: "#bfc6ea" }}
                 placeholderIconColor="#007aff"
                 selectedValue= {language}
                 itemTextStyle= {{
                  fontFamily: 'Poppins-Regular'
               }}

               onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
            
               
                >
                      <Picker.Item label="English" value="english" />
                      <Picker.Item label="Arabic" value="arabic" />
                      
                 </Picker>
                
               </View>
               
            </View>
      
      </TouchableOpacity>
         
         <View style={styles.infoContainer}>
           <Text style={styles.reactoUs}> REACH OUT OT US</Text>
         </View>
       <TouchableOpacity style={styles.bgWhilte}>
         <View style={[styles.specificationView, styles.infoContainer]}>
         <Ionicons name = "whatsapp" size={23}/>
         <Text style={[styles.language, styles.countryPicker]}>WhatpsApp Us</Text>
         <Ionicons name = "arrow-right" size = {18} style={styles.arrwoRight}></Ionicons>
         </View>
         </TouchableOpacity>

         <TouchableOpacity style={styles.bgWhilte}>
         <View style={[styles.specificationView, styles.infoContainer]}>
         <Ionicons name = "question-circle" size={23}/>
         <Text style={[styles.language, styles.countryPicker]}>Need Help</Text>
         <Ionicons name = "arrow-right" size = {18} style={styles.arrwoRight}></Ionicons>
         </View>
         </TouchableOpacity>
     

     <View style = {[styles.specificationView, styles.footerContainer]}>
       
        <Ionicons style = {[styles.footerItem]}name = "facebook" size ={18} />
        <Ionicons style = {styles.footerItem}name = "twitter" size ={18} />
        <Ionicons style = {styles.footerItem}name = "instagram" size ={18} />
        <Ionicons style = {styles.footerItem}name = "linkedin" size ={18} />
       
     </View>

     <View style = {[styles.specificationView, styles.footerContainer]}>
       
      <Text style={[styles.footerItem]}>Terms Of Use</Text>
      <Text style={[styles.footerItem]}>Terms Of Salse</Text>
      <Text style={[styles.footerItem]}>Terms Of Policy</Text>
      
    </View>

    <View style = {[styles.specificationView, styles.footerContainer]}>
    
      <Text style={styles.footerItem1}>Warrenty Policy</Text>
     
      <Text style={styles.footerItem1}>Return Policy</Text>
      
      
    </View>


    <View style = {[styles.specificationView, styles.footerContainer]}>
       
      <Text style={[styles.footerItem]}>All right reserve</Text> 
      
    </View>

      </View>
      
      </ScrollView>
  );
};



AccountScreen.navigationOptions = (navData) => {
  headerShown: false;
};

export default AccountScreen;
