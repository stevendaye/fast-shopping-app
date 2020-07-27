import {
    CATEGORIES_SUCCESS, PRODUCT_CATEGORIES_SUCCESS,
    CATEGORIES_FAILED
} from "../types";

const initialState = {
    categories: [],
    productCategories: [],
    category: null,
    isLoading: true,
    error: null
};

const applySaveCategories = (state, payload) => ({
    ...state,
    categories: payload,
    isLoading: false
});

const applySaveProductCategories = (state, payload) => ({
    ...state,
    productCategories: payload.data,
    isLoading: false
});

const applyCategoriesFailed = (state, payload) => ({
    ...state,
    categories: [],
    productCategories: [],
    category: null,
    isLoading: false,
    error: payload.response.data
});

const categoriesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_SUCCESS:
            return applySaveCategories(state, payload);
        case PRODUCT_CATEGORIES_SUCCESS:
            return applySaveProductCategories(state, payload);
        case CATEGORIES_FAILED:
            return applyCategoriesFailed(state, payload);
        default:
            return state;
    }
};

export default categoriesReducer;
