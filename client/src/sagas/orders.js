import { put, call } from "redux-saga/effects";
import { doSucceedOrders, doFailOrders } from "../actions/orders";
import { saveOrders } from "../apis/orders";
import { doClearCart } from "../actions/cart";

function* handleSaveOrders(action) {
    try {
        const { payload: { user_id, products, order } } = action;
        const result = yield call(saveOrders, user_id, products, order);
        yield put(doSucceedOrders(result.data));
        yield put(doClearCart());
    } catch (err) {
        yield put(doFailOrders(err));
    }
}

export { handleSaveOrders };
