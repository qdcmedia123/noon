import React, {useState , useEffect, useCallback} from 'react';
import { 
          Container,
          Header,
          Content,
          Button,
          Text,
          View,
          Spinner,
          Item,
          Input,
          Icon
        } from 'native-base';
import Carousel from 'react-native-snap-carousel';

import 
        {StyleSheet,
        SafeAreaView,
        Image,
        TouchableOpacity,
        TouchableNativeFeedback,
        Platform
      } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../store/actions/products';




const HomeScreen = props => {


  
 const [isLoading, setIsLoading] = useState(false);
 const [isRefreshing, setIsRefreshing] = useState(false);
 const [error, setError] = useState();
 let carousel;
 let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'andriod' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }


 const products = useSelector(state => state.products.availableProducts);
 const dispatch = useDispatch();
 
 const [sampleData, setSampleData] = useState({
  activeIndex:0
 })

 const selectItemHandler = (id, title) => {
   props.navigation.navigate('ProductDetails', {
     productId: id,
     productTitle: title
   })
 }

const _renderItem= ({item,index}) => {
  return (
    <View style={{
        backgroundColor:'#fff',
        borderRadius: 5,
        height: 300,
        padding:10,
        marginLeft: 2,
        marginRight: 2, 
        }}>
          <Ionicons name = "heart" size={20} style={{textAlign: 'right'}}/>
        <TouchableCmp onPress = {() => {selectItemHandler(item.id, item.title)}}useForeground>
          <View>
            <View style={styles.imageContainer}>
        <Image source = {{uri: item.imageUrl[0]}}   style={styles.image}/>
        

        </View>
      <Text style={{fontSize: 14, fontFamily: 'Poppins-Light'}}>{item.title}</Text>
      <Text style={{fontSize: 12, fontFamily: 'Poppins-Bold'}} >AED {10.45}</Text>
        <Image source = {{uri: 'https://k.nooncdn.com/s/app/2019/noon-bigalog/b1298a21eeee0e16ed91bcb9d9bc9b9d4aaff711/static/images/noon-express-en.png'}} 
        style={{height: 25, width: 120}}/>
        </View>
        </TouchableCmp>
      
    </View>
    
  )
}


  const loadProducts = useCallback(async() =>{ 
    console.log('Loding product');
    setIsRefreshing(true);
    setError(null);
    try{
      await dispatch(productsActions.fetchProdcut());
    } catch(err) {
      setError(err.message);
    }
    setIsRefreshing(false)
  }, [dispatch])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
    return () => {
      willFocusSub.remove();
    }
  }, [loadProducts])
    
  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadProducts]);
  

  // Caresole change the index 


  if(error) {
    return (<View>
      <Text> An Error Occured</Text>
      <Button title = "Try Again" onPress={loadProducts}></Button>
    </View>)
  }

  // Loading the data 
  if(isLoading) {
    return (<View style={styles.centered}>
       <Spinner color='green' />
    </View>)
  }

  // Check the product length 
  if(!isLoading && products.length === 0) {
    return (<View style={styles.centered}>
          <Item error>
            <Input placeholder='No item avilalbe.'/>
            <Icon name='close-circle' />
          </Item>
    </View>)
  }

  // Return flat list 


  return (
    <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
        <Carousel
          layout={"default"}
          ref={ref => carousel = ref}
          data={products}
          sliderWidth={300}
          itemWidth={200}
          renderItem={_renderItem}
          onSnapToItem = { index => setSampleData({...sampleData, activeIndex:index}) } />
    </View>
  </SafeAreaView>
  );
    
  }


HomeScreen.navigationOptions = navData => {
 return {
   
   headerLeft: () => <Ionicons 
   title = "Menu"
   name = "bars"
   onPress = {() => {
     navData.navigation.toggleDrawer();
   }}
   size={25}
   style={{marginLeft:10}}
   
 />,
 headerRight: () => <Ionicons
 title = "Cart"
 name = "shopping-cart"
 size={25}
 style={{marginRight:10}}
 onPress = {() => {
  navData.navigation.navigate('Cart')
 }}
 
 />
 }
}


const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },

  imageContainer: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});





export default HomeScreen;