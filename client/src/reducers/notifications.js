import { NOTIFICATION_SET, NOTIFICATION_REMOVE } from "../types";

const initialState = {};

const applySetNotification = (state, payload) => {
    const { id } = payload;
    return { ...state, [id]: payload };
};

const applyRemoveNotification = (state, payload) => {
    const { [payload]: notificationToRemove, ...restNotifications } = state;
    return restNotifications;
};

const notificationsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case NOTIFICATION_SET:
            return applySetNotification(state, payload);
        case NOTIFICATION_REMOVE:
            return applyRemoveNotification(state, payload);
        default:
            return state;
    }
};

export default notificationsReducer;
