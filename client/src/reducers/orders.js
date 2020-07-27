import { ORDERS_SUCCESS, ORDERS_CLEAR, ORDERS_FAILED } from "../types";

const initialState = {
    orders: [],
    order: null,
    isLoading: true,
    error: null
};

const applySaveOrders = (state, payload) => ({
    ...state,
    order: payload,
    isLoading: false
});

const applyOrdersFailed = (state, payload) => ({
    ...state,
    orders: [],
    order: null,
    isLoading: false,
    error: payload
});

const ordersReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ORDERS_SUCCESS:
            return applySaveOrders(state, payload);
        case ORDERS_CLEAR:
        case ORDERS_FAILED:
            return applyOrdersFailed(state, payload);
        default:
            return state;
    }
};

export default ordersReducer;
