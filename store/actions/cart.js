export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_CART_QTY = 'CHANGE_CART_QTY';
export const SELECTED_SHIPPING = 'SELECTED_SHIPPING';
export const SELECT_PAYMENT_METHOD = 'SELECT_PAYMENT_METHOD';

export const addToCart = product => {
    return {type: ADD_TO_CART, product: product};
}

export const removeFromCart = productId => {
    return {type: REMOVE_FROM_CART, pid: productId};
}

export const changeCartQty = (productId, qty) => {
    return {type: CHANGE_CART_QTY, pid: productId, qty: qty};
}

export const selectedShipping = (data) => {
    return {type: SELECTED_SHIPPING, selected_shipping: data};
}

export const selectedPaymentMethod = (data) => {
    return {type: SELECT_PAYMENT_METHOD, selected_payment_method: data};
}