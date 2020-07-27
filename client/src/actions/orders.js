import {
    ORDERS_SUCCESS, ORDERS_SAVE, ORDER_CHECK,
    ORDERS_LIST, ORDERS_FAILED, ORDERS_CLEAR
} from "../types"

const doSaveOrders = payload => ({
    type: ORDERS_SAVE,
    payload
});

const doSucceedOrders = payload => ({
    type: ORDERS_SUCCESS,
    payload
});

const doCheckOrder = id => ({
    type: ORDER_CHECK,
    payload: id
});

const doListOrders = () => ({
    type: ORDERS_LIST
});

const doClearOrder = () => ({
    type: ORDERS_CLEAR
});

const doFailOrders = error => ({
    type: ORDERS_FAILED,
    payload: error
});

export {
    doSucceedOrders,doSaveOrders, doCheckOrder,
    doListOrders, doFailOrders, doClearOrder
};
