import PRODUCTS from '../../data/dummy-data';

import {SET_PRODUCTS} from '../actions/products';

// Models 
import Product from '../../models/product';

const initialState = {
    availableProducts: [],
    userProducts: [],
}

export default(state = initialState, action) => {
    
    switch(action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            };
    }

    return state;
}