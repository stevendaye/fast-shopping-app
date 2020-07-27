import {
    NOTIFICATION_SHOW,
    NOTIFICATION_SET, NOTIFICATION_REMOVE
} from "../types";

const doShowNotification = payload => ({
    type: NOTIFICATION_SHOW,
    payload
});

const doSetNotification = (id, message, alert) => ({
    type: NOTIFICATION_SET,
    payload: { id, message, alert }
});

const doRemoveNotification = id => ({
    type: NOTIFICATION_REMOVE,
    payload: id
});

export {
    doShowNotification,
    doSetNotification, doRemoveNotification
};
