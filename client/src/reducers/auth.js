import {
    USER_SAVE_SUCCESS, USER_CHECK_SUCCESS,
    USER_CLEAR, USER_FAILED
} from "../types";

const initialState = {
    user: null,
    isLoading: true,
    error: null
};

const applyHandleUser = (state, payload) => ({
    ...state,
    user: payload,
    isLoading: false
});

const applyClearUser = state => ({
    ...state,
    user: null,
    isLoading: false,
    error: null
});

const applyUserFailed = (state, payload) => ({
    ...state,
    user: null,
    isLoading: false,
    error: payload.response.data
});

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_SAVE_SUCCESS:
        case USER_CHECK_SUCCESS:
            return applyHandleUser(state, payload);
        case USER_CLEAR:
            return applyClearUser(state);
        case USER_FAILED:
            return applyUserFailed(state, payload);
        default:
            return state;
    }
};

export default authReducer;
