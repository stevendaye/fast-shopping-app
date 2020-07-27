// @desc Notification Action Types
const NOTIFICATION_SHOW = "NOTIFICATION_SHOW";
const NOTIFICATION_SET = "NOTIFICATION_SET";
const NOTIFICATION_REMOVE = "NOTIFICATION_REMOVE";

// @desc Users Action Types
const USER_SAVE = "USER_SAVE";
const USER_CHECK = "USER_CHECK";
const USER_CLEAR = "USER_CLEAR";
const USER_FAILED = "USER_FAILED";
const USER_SAVE_SUCCESS = "USER_SAVE_SUCCESS";
const USER_CHECK_SUCCESS = "USER_CHECK_SUCCESS";

// @desc Products Action Types
const PRODUCTS_SAVE = "PRODUCTS_SAVE";
const PRODUCT_CHECK = "PRODUCT_CHECK";
const PRODUCTS_LIST = "PRODUCTS_LIST";
const PRODUCTS_FAILED = "PRODUCTS_FAILED";
const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";

// @desc Categories Actions Types
const CATEGORIES_SAVE = "CATEGORIES_SAVE";
const CATEGORY_CHECK = "CATEGORY_CHECK";
const CATEGORIES_LIST = "CATEGORIES_LIST";
const CATEGORIES_FAILED = "CATEGORIES_FAILED";
const CATEGORIES_SUCCESS = "CATEGORIES_SUCCESS";
const PRODUCT_CATEGORIES_SAVE = "PRODUCT_CATEGORIES_SAVE";
const PRODUCT_CATEGORIES_SUCCESS = "PRODUCT_CATEGORIES_SUCCESS";

// @desc Orders Action Types
const ORDERS_SAVE = "ORDERS_SAVE";
const ORDER_CHECK = "ORDER_CHECK";
const ORDERS_LIST = "ORDERS_LIST";
const ORDERS_CLEAR = "ORDERS_CLEAR";
const ORDERS_FAILED = "ORDERS_FAILED";
const ORDERS_SUCCESS = "ORDERS_SUCCESS";

// @desc Cart Action Types
const CART_ADD = "CART_ADD";
const CART_REMOVE = "CART_REMOVE";
const CART_UPDATE_SUBTOTAL = "CART_UPDATE_SUBTOTAL";
const CART_SET_QUANTITY = "CART_SET_QUANTITY";
const CART_IN_PROGRESS = "CART_IN_PROGRESS";
const CART_CLEAR = "CART_CLEAR";

export {
    NOTIFICATION_SHOW, NOTIFICATION_SET, NOTIFICATION_REMOVE,

    USER_SAVE, USER_CHECK, USER_CLEAR,
    USER_SAVE_SUCCESS, USER_CHECK_SUCCESS,
    USER_FAILED,

    PRODUCTS_SAVE, PRODUCT_CHECK, PRODUCTS_LIST,
    PRODUCTS_FAILED,PRODUCTS_SUCCESS,

    CATEGORIES_SAVE, CATEGORY_CHECK, CATEGORIES_LIST,
    PRODUCT_CATEGORIES_SAVE, PRODUCT_CATEGORIES_SUCCESS,
    CATEGORIES_FAILED, CATEGORIES_SUCCESS,

    ORDERS_SAVE, ORDER_CHECK, ORDERS_LIST,
    ORDERS_FAILED, ORDERS_SUCCESS, ORDERS_CLEAR,

    CART_ADD, CART_REMOVE,
    CART_UPDATE_SUBTOTAL, CART_SET_QUANTITY,
    CART_IN_PROGRESS, CART_CLEAR
};