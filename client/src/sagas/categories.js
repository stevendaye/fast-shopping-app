import { put, call } from "redux-saga/effects";
import {
    doSucceedCategories, doSucceedProductCategories,
    doFailCategories
} from "../actions/categories";
import {
    saveCategories, saveProductCategories,
    listCategories
} from "../apis/categories";

function* handleSaveCategories(action) {
    try {
        const { payload } = action;
        const result = yield call(saveCategories, payload);
        yield put(doSucceedCategories(result.datadata));
    } catch (err) {
        yield put(doFailCategories(err));
    }
}

function* handleSaveProductCategories(action) {
    try {
        const { payload } = action;
        const result = yield call(saveProductCategories, payload);
        yield put(doSucceedProductCategories(result.data));
    } catch (err) {
        yield put(doFailCategories(err));
    }
}

function* handleListCategories() {
    try {
        const result = yield call(listCategories);
        yield put(doSucceedCategories(result.data));
    } catch (err) {
        yield put(doFailCategories(err));
    }
}

export {
    handleSaveCategories, handleSaveProductCategories,
    handleListCategories
};
