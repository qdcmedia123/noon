import React, { useState, useCallback, Fragment } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import Ionicons from "react-native-vector-icons/FontAwesome5";
import { Item, Icon, View, Text, Picker, Form, Button, Input } from "native-base";
import {useSelector, useDispatch} from 'react-redux'
import * as  cartActions from '../../store/actions/cart'


function App(props) {
  const [qty, setQty] = useState(1);
  const [deliveryto, setDeliveryto] = useState("");
  
 
 // Get the cart 
 const {cart, auth} = useSelector(state => state);

 console.log(auth);
 const dispatch = useDispatch();
 const cartItems = useSelector(state => {
   const transformedCartItems = [];
   for(const key in state.cart.items) {
     transformedCartItems.push({
       productId: key,
       productTitle: state.cart.items[key].productTitle,
       productPrice: state.cart.items[key].productPrice,
       imageUri: state.cart.items[key].imageUri,
       deliveryInfo: state.cart.items[key].deliveryInfo,
       soldBy: state.cart.items[key].soldBy,
       quantity: state.cart.items[key].quantity,
       sum: state.cart.items[key].sum,
     
     });
   }

   return transformedCartItems;
 });

 const cartTotal = useCallback(() => {
    let totalQty = null;
    if(cartItems.length > 0) {
        totalQty = cartItems.reduce(function(a,b) {
         return a + +b.quantity;
       }, 0);

       
    }
    return totalQty;
 }, [cartItems])

 console.log(cartTotal());

 const qtyOnchange = useCallback((productId, e) => {

  if(Object.entries(cartItems).length > 0 ) {
     // Iritate thorough the id
     dispatch(cartActions.changeCartQty(productId, e));
  }
  
}, [cartItems]);

const deliveryonChange = (e) => {
    setDeliveryto(e);
};
// Remove the cart iteim 
const moneyFormate = (price) => {
  price = price.toString();
  price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return parseInt(price).toFixed(2);
}

// Order now 
const orderNow = useCallback(() => {
  // You have caritem
  // delivery to
  // delivery amount 
  // need to check if user is authenticated 
  if(auth.token === null) {
    // Redirect the user to the login 
    return props.navigation.navigate('AuthUser')
  }

  console.log('Doing the payment');
  

}, [cartItems, deliveryto]);


  return (
    <View style={styles.specificationView}>

       {Object.keys(cartItems).length > 0 ?  <Fragment>
        <ScrollView style={styles.cartConatiner}>
      <View style={styles.cartInner}>
        <View>
          <Text style={styles.dearCustomer}>
            Dear customers, please note we have changed our shipping and payment
            option
          </Text>
        </View>
        <View style={[styles.specificationView, styles.infoContainer]}>
          <View style={styles.specificationView}>
            <View style={[styles.orderwith, styles.iconText]}>
              <Text>
                <Ionicons name="car" size={20} />
              </Text>
            </View>
            <View style={[styles.orderwith, styles.iconContent]}>
              <Text style={styles.contentText}>
                Order with non-expressive addtions 10 AED shippign fee applies
              </Text>
            </View>
          </View>
          <View style={styles.specificationView}>
            <View style={[styles.orderwith, styles.iconText]}>
              <Text>
                <Ionicons name="credit-card" size={20} />
              </Text>
            </View>
            <View style={[styles.orderwith, styles.iconContent]}>
              <Text style={styles.contentText}>
                Order with non-expressive addtions 10 AED shippign fee applies
              </Text>
            </View>
          </View>
          <View style={styles.specificationView}>
            <View style={[styles.orderwith, styles.iconText]}>
              <Text>
                <Ionicons name="shield-alt" size={20} />
              </Text>
            </View>
            <View style={[styles.orderwith, styles.iconContent]}>
              <Text style={styles.contentText}>
                Order with non-expressive addtions 10 AED shippign fee applies
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.mt__10, styles.fistRow]}>
        <Text style={styles.thPrice}>
          The price of some product in you cart has been changed. Please review
          you cart before precedding
        </Text>
        <Text style={styles.dismiss}>DISMISS</Text>
      </View>
      
      {cartItems.map((item, index) => <View key = {index} style={[styles.isFlex, styles.cartMain, styles.eachItem]}>
        <View>
       <Text style={[styles.catName, styles.infoContainer]}>{}</Text>
        </View>
        <View style={[styles.specificationView]}>
          <Text
            style={[
              styles.afterCatName,
              styles.width80,
              styles.infoContainer,
              styles.productName,
            ]}
          >
            {item.productTitle}
          </Text>
          
          <View style={{width: 100, height:100 }} >
      <Image style= {{flex:1 , width: undefined, height: undefined}}    
       source={{
        uri:
          item.imageUri,
      }}
        />
    </View>

         
        
        </View>

        <View>
          <Text style={[styles.infoContainer, styles.bigPrice]}>
             AED {moneyFormate(item.productPrice)}
          </Text>
        </View>

        <View>
          <Text style={[styles.deliveryBy, styles.infoContainer]}>
            Delivered by Mon, May 18 when you order in 4 hrs 48 mins
          </Text>
        </View>

        <View style={[styles.fistRow, styles.infoContainer]}>
          <Text style={styles.soldBy}>Sold By Mother Fucker</Text>
          <Text style={styles.storeName}> Tamarind</Text>
          <View style={styles.express}>
            <Image
              source={{
                uri:
                  "https://k.nooncdn.com/s/app/2019/noon-bigalog/b1298a21eeee0e16ed91bcb9d9bc9b9d4aaff711/static/images/noon-express-en.png",
              }}
              style={{ height: 20, width: 100, alignSelf: "flex-end", flex: 1 }}
            />
          </View>
        </View>

        <View style={[styles.specificationView, styles.infoContainer]}>
          <View style={styles.qtyCartContainer}>
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Qty"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={item.quantity.toString()}
                  
                  onValueChange={(e) => qtyOnchange(item.productId, e)}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                </Picker>
              </Item>
            </Form>
          </View>
          <View style={[styles.specificationView]}>
            <Text style={styles.remove}  onPress = { () => {dispatch (cartActions.removeFromCart(item.productId))}}>
              <Ionicons name="trash" size={18} style={styles.removeIcon} 
              
              />{" "}
              Remove
            </Text>
          </View>
        </View>
      </View>
      )}
      


      <View style={[styles.afterCart]}>
      
      
      <View style={[styles.buyNow, styles.specificationView, styles.infoContainer]}>
        <Ionicons name = "university" size={20} style={styles.byNowIcon}></Ionicons>
        <Text style={styles.byNowText}>By now, play later with selected cards. Chose thsh option ofr moe details</Text>
      </View>

      <View style={[styles.coupon, styles.infoContainer]}>
        <Item>
            <Input placeholder='Enter Coupon code or Gift Card' style={styles.coupenInput}/>
            <Button transparent>
              <Text style = {styles.applyText}>Apply</Text>
            </Button>
          </Item>
      </View>
      
      <View style={[styles.infoContainer]}>
         <View style={[styles.specificationView, styles.subTotalView]}>
           <Text style={styles.SubTotalText}>Sub Total</Text>
            <Text style={[styles.subNumber, styles.SubTotalText]}>AED {moneyFormate(cart.totalAmount) }</Text>
         </View>

         <View style={[styles.specificationView]}>
           <Text style={[ styles.SubTotalText]}>delivery To   
           </Text>
           <View>
              <Item picker style={styles.deliveryTo}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={styles.pickerdeliveryTo}
                  placeholder="Qty"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={deliveryto}           
                  onValueChange={(e) => deliveryonChange(e)}
                >
                  <Picker.Item label="Devlivery address" value="" />
                  <Picker.Item label="Dubai" value="dubai" />
                  <Picker.Item label="Abu Dhabi" value="abu dhabi" />
                  <Picker.Item label="Aharjah" value="sharjah" />
                  <Picker.Item label="Al Ain" value="al ain" />
                </Picker>
              </Item>
            </View>
            {/* If order is more then 100 AED then free delivery */}
            <Text style={styles.subNumber}>AED {cart.totalAmount >= 100 ? 0 : 10}</Text>
         </View>

         <View style={[styles.specificationView, styles.cartTotal]}>
           <Text style={styles.TotalText}>TOTAL</Text>
           <Text style={styles.inclusiveVat}> (Inclusive of Vat)</Text>
            <Text style={[styles.subNumber, styles.TotalText]}>AED {
                   moneyFormate(cart.totalAmount + (cart.totalAmount < 100 ? 10 : 0)) 
            }</Text>
         </View>

      
      </View>
      
      <View style={[styles.infoContainer, styles.specificationView]}>
        <View style={[styles.specificationView, styles.cardContainer]}>
         
         <Ionicons name = "cc-visa" size={36} style={styles.card_p}/>
         <Ionicons name = "cc-mastercard" size={36} style={styles.card_p}/>
         <Ionicons name = "cc-amex" size={36} style={styles.card_p}/>
         <Ionicons name = "money-bill-alt" size={36} style={styles.card_p}/>
         </View>
      </View>
      </View>
      
    </ScrollView>
      <View style={[styles.specificationView, styles.cartAndQty]}>
        <Button danger style={styles.orderNowButton} onPress = { () => orderNow()}>
            <Text   adjustsFontSizeToFit style={styles.buyText}>BUY {cartTotal()} ITEMS FOR AED {
                   moneyFormate(cart.totalAmount + (cart.totalAmount < 100 ? 10 : 0)) 
            }</Text>
        </Button>
        
      </View>
    
       </Fragment>: <View style ={[styles.contentMiddle]}>
         <Ionicons name = "cart-plus" size={16}></Ionicons>
          <Text style={styles.cartEmpty}>Your cart is empty</Text>
          <Text style={styles.beSure}>Be sure to fill your cart with something you like</Text>
        </View>}
      
    
    </View>
     );
}

const styles = StyleSheet.create({
  beSure:{
    fontFamily:'Poppins-Regular',
    color: 'gray',
    lineHeight: 40
  },
  cartEmpty:{
    fontFamily:'Poppins-Medium',
    fontSize:16
  },
  contentMiddle:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
  buyText:{
    flex:1,
    textAlign:'center',
    fontFamily:'Poppins-Medium',
    color:'#fff',
    fontWeight:'bold'
  },
  orderNowButton:{
    width:'100%',
    
  },
  cartAndQty:{
    flex:1,
    position:'absolute',
    bottom:0,
    backgroundColor:'#fff',
    width:'100%',
    paddingRight:5,
    paddingLeft:5

  },
  addToCartContainer:{
    flex:1,
    alignSelf:'center',
    textAlign:'center'
  },

  card_p:{
    flex:1,
    alignSelf:'center',
    width:36
  },
  cardContainer:{
    paddingRight:30,
    paddingLeft:30
  },
  inclusiveVat:{
    marginTop:3,
    fontSize:13,
    color:'#b2bbd2'
  },
  TotalText:{
    fontFamily:'Poppins-Bold',
    color:'#404553',
    fontSize:18
  },
  cartTotal:{
    marginTop:20
  },
  pickerdeliveryTo:{
    fontFamily:'Poppins-Medium',
    width:'40%',
    backgroundColor:'#fff'
  },
  deliveryTo:{
    marginTop:-12
  },
  SubTotalText:{
    fontFamily:'Poppins-Medium',
    color:'#404553'
  },
  subTotalView:{
    paddingTop:8,
    paddingBottom:8
  },
  subNumber:{
    flex:1,
   
    textAlign:'right'
  },
  applyText:{
    fontFamily:'Poppins-Bold'
  },
  coupenInput:{
    backgroundColor:'#fff',
    borderRightColor:'gray',
    borderRightWidth:1,
    paddingLeft:10,
    paddingBottom:10,
    fontSize:14,
    fontFamily:'Poppins-Regular'
  },
  afterCart:{
    backgroundColor:'#f7f9fe'
  },
  byNowIcon:{
  
    color:'#feee00',
    textShadowColor: 'black', 
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
  },
  byNowText:{
    paddingLeft:5,
    paddingRight:5,
    fontSize:13,
    fontFamily:'Poppins-Medium'
  },
  buyNow:{
    backgroundColor:'#fcfbf4'
  },
  removeIcon: {
    flex: 1,
    color: "#b2bbd2",
  },
  remove: {
    alignSelf: "flex-end",
    flex: 1,
    width: 20,
    textAlign: "right",
    padding: 10,
    color: "#b2bbd2",
    fontFamily: "Poppins-Regular",
  },
  qtyCartContainer: {
    flexBasis: "20%",
  },
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
