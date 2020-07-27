import { put, call } from "redux-saga/effects";
import { doSucceedProducts, doFailProducts } from "../actions/products";
import { saveProducts, listProducts } from "../apis/products";

function* handleSaveProducts(action) {
    try {
        const { payload } = action;
        yield call(saveProducts, payload);
    } catch (err) {
        yield put(doFailProducts(err));
    }
}

function* handleListProducts(action) {
    try {
        const { payload: { page, hitsPerPage } } = action;
        const result = yield call(listProducts, page, hitsPerPage);
        yield put(doSucceedProducts(result.data));
    } catch (err) {
        yield put(doFailProducts(err));
    }
}

export { handleSaveProducts, handleListProducts };
