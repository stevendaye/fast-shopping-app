import { PRODUCTS_SUCCESS, PRODUCTS_FAILED } from "../types";

const initialState = {
    page: null,
    pages: null,
    hitsPerPage: null,
    products: [],
    product: null,
    isLoading: true,
    error: null
}

const applyHandleProducts = (state, payload) => ({
    ...state,
    ...payload,
    isLoading: false
});

const applyProductsFailed = (state, payload) => ({
    ...state,
    products: [],
    isLoading: false,
    error: payload.response.data
});

const productsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCTS_SUCCESS:
            return applyHandleProducts(state, payload);
        case PRODUCTS_FAILED:
            return applyProductsFailed(state, payload);
        default:
            return state;
    }
};

export default productsReducer;
