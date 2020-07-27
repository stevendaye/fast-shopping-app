import { put, call } from "redux-saga/effects";
import { doShowNotification } from "../actions/notifications";

import { doSucceedSaveUser, doSucceedCheckUser, doFailUser } from "../actions/auth";
import { saveUser, checkUser } from "../apis/auth";

function* handleSaveUser(action) {
    try {
        const { payload } = action;
        const result = yield call(saveUser, payload);
        yield put(doSucceedSaveUser(result.data));
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            for(let error of errors) {
                yield put(doShowNotification({
                    message: error.message || error.msg, alert: "danger"
                }));
            }
        }
        yield put(doFailUser(err));
    }
}

function* handleCheckUser(action) {
    try {
        const { payload } = action;
        const result = yield call(checkUser, payload);
        yield put(doSucceedCheckUser(result.data));
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            for(let error of errors) {
                yield put(doShowNotification({
                    message: error.message, alert: "danger"
                }));
            }
        }
        yield put(doFailUser(err));
    }
}

export { handleSaveUser, handleCheckUser };
