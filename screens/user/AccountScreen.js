import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Picker } from "react-native";
import Ionicons from "react-native-vector-icons/FontAwesome5";
import CountryPicker, {FlagButton, Flag} from 'react-native-country-picker-modal'
import {} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

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
              <Text style={styles.signInText}>Wishlist</Text> 
           </TouchableOpacity>

           <TouchableOpacity style={[styles.signUpSignIn]}>
              <Ionicons name = "credit-card" size={34}></Ionicons> 
              
              <Text style={styles.signInText}>Credits</Text> 
           </TouchableOpacity>

          
      </View>
      
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

const styles = StyleSheet.create({
  iconPadding:{
    margin:10,
    flex:1
  },
  footerContainer:{
    paddingLeft:40,
    paddingRight:40,
    paddingTop:20,
    justifyContent: "center", 
    alignItems:'center'
    
  },
 footerItem1:{
  flex:0.3,
  justifyContent:'center'
 },
  footerItem:{
   flex:1,
   color:'gray',
   textAlign:'center',
  
   
  },
  arrwoRight:{
    flex:1,
   alignItems:'flex-end',
   textAlign:'right'
  },
  reactoUs:{
    fontFamily:'Poppins-Bold',
    color:'gray',
    lineHeight:40
  },
  bgWhilte:{
    backgroundColor:'#fff',
    borderTopWidth:1,
    borderTopColor:'#E5E5E5'

  },
  languagePickerEl:{

  },
  languagePicker:{
    flex:1,
    alignItems:'flex-end',
    width:'20%',
    justifyContent:'center',
    alignSelf:'center',
    

  },
  countryPicker:{
    fontFamily:'Poppins-Medium',
    marginLeft:40,
    fontSize:16
    
  },
  countrySelectView:{
    flex:1,
    alignItems:'flex-end'

  },
  settings:{
    fontFamily:'Poppins-Bold',
    color:'#848484'
  },
  pluseIco:{
    position:'absolute',
    top:3,
    right:97
    
  },
  signInText:{
    paddingTop:5,
    paddingBottom:5,
    fontFamily:'Poppins-Medium'
  },
  warp1:{
    marginTop:15,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#FFFFFF',
    borderColor:'#E1E1E1',
    borderTopWidth:1,
    borderBottomWidth:1
  },
  signUpSignIn:{
    flex:1,
   alignItems:'center',
    justifyContent:'center'
  },
  topHeader:{
    paddingLeft:15,
    marginTop:15
  },
  halaText: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    color: "#505050",
    paddingBottom: 0,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  TheReason: {
    fontFamily: "Poppins-Medium",
    paddingLeft: 66,
    fontSize: 12,
    fontWeight: "600",
    color: "#848484",
    marginTop: -12,
  },
  infoContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  logoContainer: {
    width: "20%",
    flex: 1,
  },
  headerRight: {
    flex: 1,
    width: "70%",
  },
  warper: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  contentMiddle: { flex: 1, alignItems: "center", justifyContent: "center" },
  specificationView: {
    flexDirection: "row",
  
  },
});

AccountScreen.navigationOptions = (navData) => {
  headerShown: false;
};
export default AccountScreen;
