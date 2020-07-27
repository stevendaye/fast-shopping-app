import {
    CART_ADD, CART_REMOVE,
    CART_UPDATE_SUBTOTAL, CART_SET_QUANTITY,
    CART_IN_PROGRESS, CART_CLEAR
} from "../types";

const doAddToCart = payload => ({
    type: CART_ADD,
    payload
});

const doRemoveFromCart = payload => ({
    type: CART_REMOVE,
    payload
});

const doUpdateSubtotal = payload => ({
    type: CART_UPDATE_SUBTOTAL,
    payload
});

const doSetQuantity = payload=> ({
    type: CART_SET_QUANTITY,
    payload
});

const doSetInProgress = inProgress => ({
    type: CART_IN_PROGRESS,
    payload: inProgress
});

const doClearCart = () => ({
    type: CART_CLEAR
});

export {
    doAddToCart, doRemoveFromCart,
    doUpdateSubtotal, doSetQuantity,
    doSetInProgress, doClearCart
};
