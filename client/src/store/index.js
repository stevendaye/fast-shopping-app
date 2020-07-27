import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchAll as rootSaga } from "../sagas";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers";

const logger = createLogger();
const saga = createSagaMiddleware();
const middleware = [saga, logger];

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ["ordersState"],
    whitelist: ["productsState", "cartState"]
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, undefined, composeWithDevTools(applyMiddleware(...middleware)));
const persistor = persistStore(store);
saga.run(rootSaga);

export { store, persistor };
