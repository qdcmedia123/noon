import React, {useEffect, useState, useCallback, Fragment} from "react";
import {StyleSheet, ScrollView, TextInput, Image, Share } from "react-native";
import { useSelector, useDispatch} from "react-redux";
import { SliderBox } from "react-native-image-slider-box";
import { Col, Row, Grid } from "react-native-easy-grid";

import * as cartActions from '../../store/actions/cart';


import { 
          Content,
          Tab,
          Tabs,
          Item,
          Icon,
          Input,
          Button,
          View,
          Text,
          Container,
          TabHeading,
          Picker,
          Form
        } from "native-base";
import Ionicons from 'react-native-vector-icons/FontAwesome5';


const ProductDetailScreen = (props) => {
  const [searchMode, setSearchMode] = useState(false);
  const productId = props.navigation.getParam("productId");
  const [disImageSize, setDisImageSize] = useState(null);  
  const [qty, setQty] = useState(1);
  const images = [
    "https://k.nooncdn.com/t_desktop-pdp-v1/v1563786689/N22732308A_1.jpg",
    "https://k.nooncdn.com/t_desktop-pdp-v1/v1563786690/N22732308A_2.jpg",
    "https://k.nooncdn.com/t_desktop-pdp-v1/v1553162002/N22732308A_3.jpg",
    "https://k.nooncdn.com/t_desktop-pdp-v1/v1553162003/N22732308A_4.jpg",
  ];


  let selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  selectedProduct = {...selectedProduct, ...{qty:qty, imageUri:images[0] || null, deliveryInfo: 'Order in the next 7 hrs'}};
  
  console.log(selectedProduct);

  console.log(selectedProduct);
  const isSearchMode = props.navigation.getParam('searchEanbled');
  const dispatch = useDispatch();

  // Product disctiption image size and height 
 

 

  const onShare = async() => {
    try{
      const result = await Share.share({message:'React Native | A framework for building native apps using React'});

      if(result.action === Share.sharedAction) {
        if(result.activityType) {
          // Share with activity type of result.activityType
        } else {
          // Shared 
        }
      } else if(result.action === Share.dismissedAction) {
        // Dismissed 
      }
    } catch(error) {
      alert(error);
    }
  }

  const  searchmodes = useCallback(() => {
   setSearchMode(true)
    
  }, [])

  const disableSearchMode = useCallback(() => {
    setSearchMode(false);
  }, []);

  const qtyOnchange = (e) => {
       
       setQty(e);
  }

  useEffect(() => {
    getSize()
  }, [getSize])

 

  const getSize = () => {
    Image.getSize('https://a.nooncdn.com/cms/pages/20200114/f232ec4a7270f291c7a24627540639b6/N32087123A-1.jpg', (width, height) => {
     
      setDisImageSize({height:height, width:width});
      
    })
  }


  return (
    <View style={styles.warper}>
      <View>

      {searchMode ? 
      <View style = {styles.headerSearch}>
      <Item style = {styles.itemStyle}>
      
     <Input stsearchModsyle = {styles.searchInput}
    placeholder="What you are looking for?"
    />
   <Ionicons name='times' style={styles.closeIcon} size={20}
   onPress={disableSearchMode}
     />
  </Item>
 </View> : <Icon active name='search' style={styles.searchIcon} 
       onPress={searchmodes}/>}
     
          
      </View>
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.SliderBox}>
        <SliderBox
          sliderBoxHeight={500}
          images={images}
          dotColor="#017DFF"
          inactiveDotColor="#90A4AE"
          parentWidth={410}
          resizeMethod={"resize"}
          resizeMode={"cover"}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 10,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        />
      </View>
      <View style = {styles.searchHeartShare}>
        
       
        <View style = {styles.iconsRight} >
        <Ionicons
              name = "heart"
              size = {22}
              onPress={() => {console.log(`Put in waiting list`)}}

          />
        </View>
        <View style = {styles.iconsRight}>
        <Ionicons
              name = "share-alt"
              size = {22}
              onPress={onShare}
              
          />
        </View>
      </View>
      <View>
        <Text style = {styles.categoryText}>Product Category </Text>
      </View>

      <View>
        <Text style = {styles.productTitle}>Anti Microbial Hand Sanitizer 500 ML</Text>
      </View>

      <View>
        <Grid>
          <Col style={styles.contentView}>
            <Text style={styles.currency}>AED</Text>
            <Text style={styles.price}>49.0</Text>
            <Text style={styles.oldPrice}> AED 49.0</Text>
          </Col>
          <Col>
            <Text style={styles.inclusive}>Inclusive of VAT</Text>
            <Text style={styles.discount}>40% OFF</Text>
          </Col>
        </Grid>

        <View style={styles.express}>
        <Image source = {{uri: 'https://k.nooncdn.com/s/app/2019/noon-bigalog/b1298a21eeee0e16ed91bcb9d9bc9b9d4aaff711/static/images/noon-express-en.png'}} 
        style={{height: 15, width: 75}}/>
        </View>

        <View style={styles.add}>
        <Image source = {{uri: 'https://k.nooncdn.com/cms/pages/20200427/48f956e4dab7efbad3199589d10602a3/en_PDP-01.jpg'}} 
        style={{height: 100, width: '100%'}}/>
        </View>

           
        <View style={styles.orderintheNext}>
          <View style={styles.orderIn}>
            <Text style={styles.orderInNormal}>Order in the next </Text>
            <Text style={styles.hrsMin}>11 hrs 32 </Text>
            <Text style = {styles.minToCity}>mins ro Dubai receive by wed, Many 6</Text></View>
        </View>

        
        <View style={styles.offerDetails}>
            <Text style={styles.offerDetailsOne}> Offer Details</Text>
            <View style={styles.offerDetailsAfter}>
                <Text style={styles.detailsRow}>
                  <Ionicons name ="home" size={17}></Ionicons>
                </Text>
                <Text style = {styles.offerDetailsDiscription}> Enjoy hassle free return with this offer</Text>
            </View>
           
            <View style={styles.offerDetailsAfter}>
                <Text style={styles.detailsRow}>
                  <Ionicons name ="home" size={17}></Ionicons>
                </Text>
                <Text style = {styles.offerDetailsDiscription}> 1 Year Warranty</Text>
            </View>
           

            <View style={styles.offerDetailsAfter}>
                <Text style={styles.detailsRow}>
                  <Ionicons name ="home" size={17}></Ionicons>
                </Text>
                <Text style = {styles.offerDetailsDiscription}> Sold By</Text>
                <Text style={styles.bigDeal}>Big Details Sales</Text>
                <Col></Col>
                <Text style={[styles.textRight, styles.showOffer]}>Show offer details</Text>
            </View>
           

            <View style={styles.offerDetailsAfter}>
                <Text style={styles.detailsRow}>
                  <Ionicons name ="home" size={17}></Ionicons>
                </Text>
                <Text style = {styles.offerDetailsDiscription}> 7 others offers from ~{"\n"} 
                <Text style={styles.offerFrom}>AED 4,4555.00</Text> </Text>
                
              <Col></Col>
              <Button bordered danger>
            <Text>View All</Text>
          </Button>
             
                
                
            </View>
           

            <View style={styles.offerDetailsAfter}>
                <Text style={styles.detailsRow}>
                  <Ionicons name ="home" size={17}></Ionicons>
                </Text>
                <Text style = {styles.offerDetailsDiscription}> Enjoy hassle free return with this offer</Text>
            </View>
           
        </View>

        
       <View></View>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: "#3866df" }}>
        <Tab key='1'
            heading="Overview"
            activeTextStyle={{ color: '#3866df', fontWeight: 'bold' }}
            textStyle={{ color: '#707070', fontFamily:'Poppins-SemiBold' }}
            tabStyle={{ backgroundColor:'#fff', borderWidth: 0}}
            activeTabStyle={{ backgroundColor: '#fff',  borderWidth:0  }}
          >
            <View >
              <Text style={[styles.specificContainer, styles.speciFOne]}>Specifications</Text>
            </View>

            <View style={styles.specificationView}>
               <Text style={[styles.spec,  styles.specificContainer, styles.specColor]}>Department</Text>
               <Text style={[styles.spec,  styles.specificContainer]}>Specifications</Text>
            </View>
            
          </Tab>

          <Tab
            heading="Specification"
            activeTextStyle={{ color: '#3866df', fontWeight: 'bold' }}
            textStyle={{ color: '#707070', fontFamily:'Poppins-SemiBold' }}
            tabStyle={{ backgroundColor:'#fff', borderWidth: 0}}
            activeTabStyle={{ backgroundColor: '#fff', borderWidth:0 }}
            key='2'
          >
            <View >
              <Text style={[styles.specificContainer, styles.speciFOne]}>Hightlights</Text>
            </View>

            <View>
              <Text style = {[styles.specificContainer, styles.overview]} >◉ This is omethingsdf sfsdf ssdf </Text>
              <Text style = {[styles.specificContainer, styles.overview]}>◉ This is omethingsdf sfsdf ssdf </Text>
              <Text style = {[styles.specificContainer, styles.overview]}>◉ This is omethingsdf sfsdf ssdf </Text>
              <Image source={{uri:'https://a.nooncdn.com/cms/pages/20200114/f232ec4a7270f291c7a24627540639b6/N32087123A-1.jpg'}} 
              style= {{height: disImageSize !== null ? disImageSize.height : 0 , width:'100%'}}
              />
            </View>
          </Tab>           
          
         
        </Tabs>
        
       
      </View>
    </ScrollView>

    <View style={[styles.specificationView, styles.cartAndQty]}>
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
                selectedValue='key0'
                selectedValue={qty}
                onValueChange={qtyOnchange}
       
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                
              </Picker>
            </Item>
          </Form>
            </View>
            <View style={styles.addToCartContainer}>
              
              
              <Button onPress = {() => { 
                dispatch(cartActions.addToCart(selectedProduct))
              }}info><Text style={styles.addToCartContainer}> Add To Cart </Text></Button>
              
            </View>
        </View>
      
    </View>
  );
};




ProductDetailScreen.navigationOptions = navData => {
  return {
        headerTitle: navData.navigation.getParam('productTitle'),
       
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    marginBottom:45
  },
  cartAndQty:{
    flex:1,
    position:'absolute',
    bottom:0,
    backgroundColor:'#fff'

  },
  addToCartText:{
    textAlign: 'right'
  },
  qtyCartContainer:{
    flexBasis:'30%'
  },
  addToCartContainer:{
    flexBasis:'70%',
    flex:1,
    alignSelf:'center',
    textAlign:'center'
  },
  overview: {
    fontSize:14,
    color:'#404553'
  },
  speciFOne: {
    fontFamily:'Poppins-SemiBold',
    color:'#404553'
  },
  specificContainer:{
    paddingLeft: 10,
    paddingTop:5,
    paddingBottom:5,
    
  },
  spec:{
    fontFamily:'Poppins-Regular',
    width:'50%',
    fontSize:14,
    lineHeight:15
  },
  specColor:{
    color:'#7e859b'
  },
  specColorRight: {
   color:'#404553'
  },
  specificationView: {
    flex:1,
    flexDirection:'row',
    flexWrap: "wrap",
  },
  tabs:{
    backgroundColor:'#fff',
    color:'#404553',
    fontSize:50
  },
  primaryBtn:{
    borderColor:'#3866df',
    borderWidth:2,
  },
  bigDeal:{
    fontFamily:'Poppins-Bold',
    textDecorationLine:'underline',
    marginLeft:5,
    color:'#3866df'
  },
  warper: {
    backgroundColor:'#ffffff'
  },
  SliderBox: {
    marginTop: 0,
  },
  searchHeartShare:{
    position:'absolute',
    right:0,
    top:10
  },
  iconsRight:{
  paddingTop:12,
  marginRight:12
  },
  contentView: {
    paddingLeft: 5,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  orderintheNext:{
    paddingLeft: 5,
    paddingTop:10,
    paddingBottom:10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor:'#e5e5e5'
  },
  headerSearch: {
    position:'absolute',
    top: -47,
    zIndex:1000,
    width:'95%',
    left:10,
    backgroundColor:'#fff'
  },
  searchInput: { 
     height: 40, 
     borderColor: 'gray', 
     borderWidth: 2,
     borderRadius:10,
     fontFamily:'Poppins-Bold',
     padding:5,
     textDecorationLine:'none'
    },
    searchIcon:{
     marginLeft:15,
     position:'absolute',
     right:10,
     zIndex:5000,
     top:-40

    },
    closeIcon: {
      marginLeft:15
    },
    itemStyle: {
     borderBottomWidth:0
    },
    categoryText: {
      padding: 5,
      fontSize:14,
      color:'#007657',
      lineHeight:20
    },
    productTitle:{
      fontSize:18,
      lineHeight:30,
      fontFamily:'Poppins-Regular',
      color:'#808080',
      padding:5
    },
    currency:{
      fontWeight:'bold',
      textTransform:'uppercase',
      fontSize:18,
      color:'gray',
      paddingTop:4
    },
    price:{
      fontFamily:'Poppins-Bold',
      fontSize:20,
      color:'#404553',
      paddingBottom:5,
      marginLeft:2
    },
    oldPrice:{
      color:'gray',
      textDecorationLine:'line-through',
      padding:5
    },
    inclusive:{
      textAlign:'right',
      padding:5,
      fontSize:14,
      color:'gray'
    },
    express:{
      padding:5,
      marginTop:-20
    },
    discount:{
    width:'auto',
      textAlign:'right',
      padding:5,
      backgroundColor:'#b2d8b2',
      color:'#008000',
      fontWeight:'bold'

    },
    add:{
      display:'flex',
      padding:5
    },
    orderIn:{
      flex:1,
      flexDirection:'row',
      padding:5
    },
    orderInNormal:{
     fontSize:16,
     fontFamily:'Poppins-Light'
    },
    hrsMin:{
      fontSize:16,
      fontWeight:'bold',
      fontFamily:'Poppins-Light',
      color:'#000000'
    },
    minToCity:{
      flexShrink: 1
    },
    offerDetails:{
      backgroundColor:'#ffffff',
      borderColor:'gray',
      borderWidth:1,
      paddingTop:20,
      paddingBottom:20
      
    },
    offerDetailsOne:{
      paddingLeft:15,
      
      fontWeight:'bold',
      textTransform:'capitalize'
    },
    offerDetailsAfter:{
      flex:1,
      flexDirection:'row',
      padding:20,
      borderBottomColor:'gray',
      borderBottomWidth:1
      
    },
    detailsRow:{
    },
    offerDetailsDiscription:{
      paddingLeft:10,
      color:'#404553',
      fontFamily:'Poppins-Medium'
    },
    offerFrom:{
      fontFamily:'Poppins-SemiBold',
      fontWeight:'700',
      color:'#000000'
    },
    textRight:{
      textAlign: 'center'
    },
    showOffer:{
      color:'#3866df',
      lineHeight:20
    }


  });

export default ProductDetailScreen;
