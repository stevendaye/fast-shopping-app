import { combineReducers } from "redux";
import notificationsReducer from "./notifications";
import authReducer from "./auth";
import productsReducer from "./products";
import cartReducer from "./cart";
import categoriesReducer from "./categories";
import ordersReducer from "./orders";

const rootReducer = combineReducers({
    notificationsState: notificationsReducer,
    authState: authReducer,
    productsState: productsReducer,
    cartState: cartReducer,
    categoriesState: categoriesReducer,
    ordersState: ordersReducer
});

export default rootReducer;
