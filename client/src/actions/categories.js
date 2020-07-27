import {
    CATEGORIES_SAVE, PRODUCT_CATEGORIES_SAVE,
    CATEGORY_CHECK, CATEGORIES_LIST,
    CATEGORIES_FAILED, CATEGORIES_SUCCESS,
    PRODUCT_CATEGORIES_SUCCESS
} from "../types";

const doSaveCategories = payload => ({
    type: CATEGORIES_SAVE,
    payload
});

const doSaveProductCategories = payload => ({
    type: PRODUCT_CATEGORIES_SAVE,
    payload
});

const doCheckCategory = id => ({
    type: CATEGORY_CHECK,
    payload: id
});

const doListCategories = () => ({
    type: CATEGORIES_LIST
});

const doFailCategories = error => ({
    type: CATEGORIES_FAILED,
    payload: error
});

const doSucceedCategories = payload => ({
    type: CATEGORIES_SUCCESS,
    payload
});

const doSucceedProductCategories = payload => ({
    type: PRODUCT_CATEGORIES_SUCCESS,
    payload
});

export {
    doSaveCategories, doSaveProductCategories,
    doCheckCategory, doListCategories, doFailCategories,
    doSucceedCategories, doSucceedProductCategories
};
