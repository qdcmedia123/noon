import React from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from "react-native-vector-icons/FontAwesome5";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App() {
     return <View>
         
          <TouchableOpacity>
          <View style ={[styles.fistRow]}>
               <View style={[styles.specificationView, styles.custom0]}>
                  <Ionicons name = "map-marker" size={20}/>
                   <Text>  Work</Text>                   
               </View>  
               <View style={[styles.specificationView, styles.custom0]}>
                   <TouchableOpacity style={[styles.specificationView]}>
                   <Ionicons name="edit" size={20} />
                  <Text>  Edit    </Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.specificationView]}c>
                  <Ionicons name="trash" size={20} />
                  <Text> Delete</Text>
                  </TouchableOpacity>
               </View>
          </View>
          <View style = {[styles.infoContainer, styles.custom1]}>
          <View style={[styles.fistRow, styles.padding15TopBotton]}>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {styles.tdText}>Name</Text></View>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {[styles.tableBody]} >Bharat Shah</Text></View>
          </View>

          <View style={[styles.fistRow, styles.padding15TopBotton]}>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {styles.tdText} >Address</Text></View>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {[styles.tableBody]} >28 Office H, Interco DMCC, AU Tower - JLT, Dubai, United Arab Emirates</Text></View>
          </View>
        
          <View style={[styles.fistRow, styles.padding15TopBotton, styles.marginTopX]}>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {styles.tdText}>Mobile Number</Text></View>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {[styles.tableBody]}>+971-56-5973854 <Ionicons name = "check-circle" size={20} style={styles.circleIconCheck}></Ionicons></Text></View>
          </View>

          </View>
         
          </TouchableOpacity>
          
          
          <TouchableOpacity>
          <View style ={[styles.fistRow]}>
               <View style={[styles.specificationView, styles.custom0]}>
                  <Ionicons name = "map-marker" size={20}/>
                   <Text>  Home</Text>                   
               </View>  
               <View style={[styles.specificationView, styles.custom0]}>
                   <TouchableOpacity style={[styles.specificationView]}>
                   <Ionicons name="edit" size={20} />
                  <Text>  Edit    </Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.specificationView]}c>
                  <Ionicons name="trash" size={20} />
                  <Text> Delete</Text>
                  </TouchableOpacity>
               </View>
          </View>
          
          <View style = {[styles.infoContainer, styles.custom1]}>
          <View style={[styles.fistRow, styles.padding15TopBotton]}>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {styles.tdText}>Name</Text></View>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {[styles.tableBody]} >Bharat Shah</Text></View>
          </View>

          <View style={[styles.fistRow, styles.padding15TopBotton]}>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {styles.tdText} >Address</Text></View>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {[styles.tableBody]} >28 Office H, Interco DMCC, AU Tower - JLT, Dubai, United Arab Emirates</Text></View>
          </View>
        
          <View style={[styles.fistRow, styles.padding15TopBotton, styles.marginTopX]}>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {styles.tdText}>Mobile Number</Text></View>
            <View style={[styles.specificationView, styles.stylesTd]}><Text style = {[styles.tableBody]}>+971-56-5973854 <Ionicons name = "check-circle" size={20} style={styles.circleIconCheck}></Ionicons></Text></View>
          </View>

          </View>
         
          </TouchableOpacity>
          
          <TouchableOpacity style = {styles.addNewButtonWarper}>
            <Text style = {styles.poppinsRegular}><Ionicons name = "plus" size = {14} />  Add a new address</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.footer}>
            <Text style = {[styles.poppinsRegular, styles.continue]}><Ionicons name = "plus" size = {14} /> Continue</Text>
          </TouchableOpacity>
          

    
   
</View>
}


const styles = StyleSheet.create({
  continue:{
    fontFamily:'Poppins-SemiBold',
    fontSize:14
  },
  footer: {
    position: 'absolute',
    height: 96,
    left: 0, 
    top: windowHeight - 100, 
    width: windowWidth,
    backgroundColor:'#008080',
    flex:1,
    alignItems:'center',
    padding:15,
   

},

  addNewAddTxt:{
    fontFamily:''
  },
  addNewButtonWarper:{
    padding:12,
    backgroundColor:'#fff',
    alignItems:'center',
    textAlign:'center',
    marginTop:15,
  
  },
  addNewAdd:{
    backgroundColor:'#fff',
    color:'#000000'  },
  custom0: {
    backgroundColor:'#fff',
    padding:15,
    
    borderBottomWidth:1
  },
  custom1: {
    backgroundColor:'#fff',
    marginTop:55,
    borderBottomColor:'#f0f0f0',
    borderBottomWidth:1
  },
  circleIconCheck:{
    color:'green'
  },
  padding15TopBotton:{
    paddingTop:15,
    paddingBottom:15
  },
  poppinsRegular:{
    fontFamily:'Poppins-Regular'
  },
  tdText:{
    fontFamily:'Poppins-Regular',
    color:'gray'
  },
  tableBody:{
    lineHeight:30,
    fontFamily:'Poppins-SemiBold',
    color:'#414551'

    
  },
  marginTopX:{
    marginTop:50
  },
    
    contentMiddle:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
   

    storeName: {
      fontFamily: "Poppins-Medium",
      fontSize: 14,
    },
    soldBy: {
      color: "#404553",
      fontSize: 14,
    },
    express: {
      flex: 1,
      width: "50%",
      paddingRight: 10,
    },
    deliveryBy: {
      color: "#404553",
      fontFamily: "Poppins-Regular",
      fontSize: 12,
    },
    bigPrice: {
      fontFamily: "Poppins-Bold",
      fontSize: 20,
      lineHeight: 30,
      color: "#404553",
    },
    productName: {
      fontFamily: "Poppins-SemiBold",
      color: "#404553",
    },
    width20: {
      width: "30%",
      height:'100%',
      overflow: "visible",
    },
    width80: {
      width: "70%",
    },
    afterCatName: {},
    catName: {
      color: "gray",
      fontSize: 14,
      fontFamily: "Poppins-Medium",
      lineHeight: 25,
    },
    isFlex: {
      flex: 1,
    },
    thPrice: {
      width: "78%",
      padding: 10,
      lineHeight: 25,
      fontFamily: "Poppins-Regular",
      borderRightColor: "#000000",
      borderRightWidth: 1,
      fontSize: 14,
    },
    dismiss: {
      width: "22%",
      padding: 10,
      textAlignVertical: "center",
      fontFamily: "Poppins-Bold",
      color: "#721c24",
      fontSize: 16,
    },
    mt__10: {
      flex: 1,
      flexWrap: "wrap",
      backgroundColor: "#fcfbf4",
    },
    cartInner: {
      backgroundColor: "#F7F7FA",
      marginTop: 10,
    },
    cartConatiner: {
      backgroundColor: "#fff",
      flex: 1,
     
    },
    infoContainer: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 15,
      paddingLeft: 15,
    },
    dearCustomer: {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 15,
      paddingLeft: 15,
    },
    contentText: {
      fontSize: 10,
      fontFamily: "Poppins-Medium",
    },
    orderwith: {
      flexGrow: 1,
      display: "flex",
      height: "100%",
    },
    iconText: {
      width: "auto",
    },
    iconContent: {
      width: "70%",
    },
    container: {
      flex: 1,
    },
    fistRow: {
      flex: 1,
      flexDirection: "row",
      marginRight: 1,
      marginTop: 15,
      flexWrap: "wrap",
    },
  
    specificationView: {
      flex: 1,
      flexDirection: "row",
    },
    specificContainer: {
      paddingLeft: 10,
      paddingTop: 5,
      paddingBottom: 5,
    },
  });
  

export default App;