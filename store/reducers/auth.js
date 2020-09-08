import {
  AUTHENTICATE,
  LOGOUT,
  CREATE_SHIPPING,
  UPDATE_SHIPPING,
  DELETE_SHIPPING
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
        token: action.token,
        userId: action.userId,
      };
    case CREATE_SHIPPING:
      return {
        shippingAddress: action.payload,
      };
    case DELETE_SHIPPING: {
        return {
            ...state,
            shippingAddressDeleted: action.payload
        }
    };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
