import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchAll as rootSaga } from "../sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers";

const saga = createSagaMiddleware();
const middleware = [saga];

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ["ordersState"],
    whitelist: ["productsState", "cartState"]
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, undefined, applyMiddleware(...middleware));
const persistor = persistStore(store);
saga.run(rootSaga);

export { store, persistor };
