import { put, delay } from "redux-saga/effects";
import uuid from "uuid/dist/v4";
import { doSetNotification, doRemoveNotification } from "../actions/notifications";

const id = uuid();
const timeout = 5000;

function* handleNotification(action) {
    const { payload: { message, alert } } = action;
    yield put(doSetNotification(id, message, alert));
    yield delay(timeout);
    yield put(doRemoveNotification(id));
}

export default handleNotification;
