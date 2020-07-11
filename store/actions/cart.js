export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_CART_QTY = 'CHANGE_CART_QTY';

export const addToCart = product => {
    return {type: ADD_TO_CART, product: product};
}

export const removeFromCart = productId => {
    return {type: REMOVE_FROM_CART, pid: productId};
}

export const changeCartQty = (productId, qty) => {
    return {type: CHANGE_CART_QTY, pid: productId, qty: qty};
}