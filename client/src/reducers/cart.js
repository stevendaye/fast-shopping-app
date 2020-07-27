import {
    CART_ADD, CART_REMOVE,
    CART_UPDATE_SUBTOTAL, CART_SET_QUANTITY,
    CART_IN_PROGRESS, CART_CLEAR
} from "../types";

const initialState = {
    products: [],
    subtotal: null,
    inProgress: true
};

const applyAddToCart = (state, payload) => ({
    ...state,
    products: [payload, ...state.products],
});

const applyRemoveFromCart = (state, payload) => {
    const rest = state.products.filter(
        product => product.product_id !== payload
    );
    return {
        ...state,
        products: rest
    };
};

const applyUpdateSubtotal = (state, payload) => ({
    ...state,
    subtotal: payload
});

const applySetQuantity = (state, payload) => {
    // Update the whole product array adding a quantity key
    const { productId, quantity } = payload;
    let product = state.products.filter(
        product => product.product_id === productId
    );
    product = {...product[0], quantity: quantity };

    const rest = state.products.filter(
        product => product.product_id !== productId
    );
    const products = [product, ...rest];

    // Calculate the subtotal
    let total = 0
    for (let product of products) {
        total += (product.unit_price * product.quantity);
    }
    
    return {
        ...state,
        products: products,
        subtotal: total
    };
};

const applySetInProgress = (state, payload) => ({
    ...state,
    inProgress: payload
});

const applyClearCart = state => ({
    ...state,
    products: [],
    subtotal: null,
    inProgress: false,
});

const cartReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ADD:
            return applyAddToCart(state, payload);
        case CART_REMOVE:
            return applyRemoveFromCart(state, payload);
        case CART_UPDATE_SUBTOTAL:
            return applyUpdateSubtotal(state, payload);
        case CART_SET_QUANTITY:
            return applySetQuantity(state, payload);
        case CART_IN_PROGRESS:
            return applySetInProgress(state, payload);
        case CART_CLEAR:
            return applyClearCart(state);
        default:
            return state;
    }
};

export default cartReducer;
