import { takeEvery } from "redux-saga/effects";

import {
    NOTIFICATION_SHOW,
    USER_SAVE, USER_CHECK,
    PRODUCTS_SAVE, PRODUCTS_LIST,
    CATEGORIES_SAVE, PRODUCT_CATEGORIES_SAVE, CATEGORIES_LIST,
    ORDERS_SAVE
} from "../types";

import handleNotification from "./notifications";
import { handleSaveUser, handleCheckUser } from "./auth";
import { handleSaveProducts, handleListProducts } from "./products";

import {
    handleSaveCategories, handleSaveProductCategories,
    handleListCategories
} from "./categories";

import { handleSaveOrders } from "./orders";

function* watchAll() {
    yield takeEvery(NOTIFICATION_SHOW, handleNotification);

    yield takeEvery(USER_SAVE, handleSaveUser);
    yield takeEvery(USER_CHECK, handleCheckUser);

    yield takeEvery(PRODUCTS_SAVE, handleSaveProducts);
    yield takeEvery(PRODUCTS_LIST, handleListProducts);

    yield takeEvery(CATEGORIES_SAVE, handleSaveCategories);
    yield takeEvery(PRODUCT_CATEGORIES_SAVE, handleSaveProductCategories);
    yield takeEvery(CATEGORIES_LIST, handleListCategories);

    yield takeEvery(ORDERS_SAVE, handleSaveOrders);
}

export { watchAll };
