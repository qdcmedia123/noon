import Product from '../../models/product';
// Dummy product 
import Data from '../../data/dummy-data';

export const SET_PRODUCTS = 'SET_PRODUCTS';



export const fetchProdcut= () => {
    return async (dispatch, getState) => {
        // any async code you want 
        //const userId = getState().auth.userId;
        const owernId = 'C2SmmNt7dBbSsiw4kZPBjbiSV4q1';

        try{
            const response = await fetch('https://mobileshop-458de.firebaseio.com/products.json');
            if(!response.ok) {
                throw new Error ('Something went wrong');
            }

            const resData = await response.json();
           
            // transfor to array 
            const loadedProducts = [];

            for(const key in resData) {
                loadedProducts.push(new Product(key,
                    resData[key].ownerId,
                    resData[key].title,                   
                    resData[key].imageUrl = Array(6).join(resData[key].imageUrl+'#split_from_here#').split('#split_from_here#'),                    
                    resData[key].description,
                    resData[key].price))
            }
            dispatch({
                type: SET_PRODUCTS,
                products:loadedProducts,
                userProducts:loadedProducts.filter(prod => prod.ownerId=== owernId)
              })

        } catch(err) {
            throw err;
        }

    } 
     
}