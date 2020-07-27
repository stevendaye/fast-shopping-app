import {
    PRODUCTS_SAVE, PRODUCT_CHECK, PRODUCTS_LIST,
    PRODUCTS_FAILED, PRODUCTS_SUCCESS
} from "../types";

const doSaveProducts = payload => ({
    type: PRODUCTS_SAVE,
    payload
});

const doCheckProduct = id => ({
    type: PRODUCT_CHECK,
    payload: id
});

const doListProducts = payload => ({
    type: PRODUCTS_LIST,
    payload
});

const doFailProducts = error => ({
    type: PRODUCTS_FAILED,
    payload: error
});

const doSucceedProducts = payload => ({
    type: PRODUCTS_SUCCESS,
    payload
});

export {
    doSaveProducts, doCheckProduct, doListProducts,
    doFailProducts, doSucceedProducts
};
