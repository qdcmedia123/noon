import {ADD_TO_CART, REMOVE_FROM_CART, CHANGE_CART_QTY } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            const imageUri = addedProduct.imageUri;
            const deliveryInfo = addedProduct.deliveryInfo;
            const soldBy = addedProduct.ownerId;

            //console.log('this is action');
            //console.log(action);
            let updatedOrNewCartItem;
            if(state.items[addedProduct.id]){
                // Already have product need to update 
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + (+addedProduct.qty),
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice,
                    imageUri,
                    deliveryInfo,
                    soldBy
                );
            } else {
                // Create new product and add t cart
                updatedOrNewCartItem = new CartItem(
                                                    +addedProduct.qty,
                                                    productPrice,
                                                    productTitle,
                                                    +(productPrice * addedProduct.qty).toFixed(2),
                                                    imageUri,
                                                    deliveryInfo,
                                                    soldBy
                                                ) 
            }
            
            return {
                ...state,
                items:{...state.items, [addedProduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + productPrice * (+addedProduct.qty)
        }
        case REMOVE_FROM_CART: 
          const selectedCartItem = state.items[action.pid];
          const currentQty = selectedCartItem.quantity;
          let updatedCartItems;
          if(currentQty > 1) {
              let updatedCartItem = new CartItem(
                  selectedCartItem.quantity -1,
                  selectedCartItem.productPrice,
                  selectedCartItem.productTitle,
                  selectedCartItem.sum - selectedCartItem.productPrice
              );
            updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
               
          } else {
              updatedCartItems = {...state.items};
              delete(updatedCartItems[action.pid]);
          }

          return{
              ...state,
              items: updatedCartItems,
              totalAmount: state.totalAmount - selectedCartItem.productPrice,
          }

          console.log(selectedCartItem);
          
        case CHANGE_CART_QTY:
            const selectedCartItemCQ = state.items[action.pid];
            console.log(selectedCartItemCQ);
            console.log(action.qty)
            let updatedCartItemsCQ;
            let updatedCartItemCQ = new CartItem(
                parseInt(action.qty),
                selectedCartItemCQ.productPrice,
                selectedCartItemCQ.productTitle,
                selectedCartItemCQ.productPrice * action.qty,
                selectedCartItemCQ.imageUri,
                selectedCartItemCQ.deliveryInfo,
                selectedCartItemCQ.soldBy
            )
            updatedCartItemsCQ = {...state.items, [action.pid]: updatedCartItemCQ }

            return {
                ...state,
                items: updatedCartItemsCQ,
                totalAmount: selectedCartItemCQ.productPrice * action.qty
            }
            
            
    }

   return state;
}