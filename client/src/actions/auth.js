import {
    USER_SAVE, USER_CHECK, USER_CLEAR,
    USER_SAVE_SUCCESS, USER_CHECK_SUCCESS,
    USER_FAILED
} from "../types";

const doSaveUser = payload => ({
    type: USER_SAVE,
    payload
});

const doSucceedSaveUser = payload => ({
    type: USER_SAVE_SUCCESS,
    payload
});

const doCheckUser = email => ({
    type: USER_CHECK,
    payload: email
});

const doSucceedCheckUser = payload => ({
    type: USER_CHECK_SUCCESS,
    payload
});

const doClearUser = () => ({
    type: USER_CLEAR
});

const doFailUser = error => ({
    type: USER_FAILED,
    payload: error
});

export {
    doSaveUser, doCheckUser,
    doSucceedSaveUser, doSucceedCheckUser,
    doClearUser, doFailUser
};
