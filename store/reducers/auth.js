import {
  AUTHENTICATE,
  LOGOUT,
  CREATE_SHIPPING,
  UPDATE_SHIPPING,
  DELETE_SHIPPING,
  DEFAULT_SHIPPING
  ,SET_DEFAULT_SHIPPING,
  SHIPPING_ADDRESS
} from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHIPPING:
      return {
        ...state,
        updatedShipping: action.payload,
      };
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case CREATE_SHIPPING:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case DELETE_SHIPPING: {
        return {
            ...state,
            shippingAddressDeleted: action.payload
        }
    };
    
    case DEFAULT_SHIPPING:
      return {
        ...state,
        defaultShippingId: action.payload
      }
    
    case SET_DEFAULT_SHIPPING:
      return {
        ...state,
        setShipping: action.payload
      }
    case SHIPPING_ADDRESS:
      return {
        ...state,
        shipping_addresses:action.payload
      }

    case LOGOUT:
      return initialState;
      
    default:
      return state;
  }
};
