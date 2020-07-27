import axios from "axios";

const SAVE_ORDERS_URL = "/orders/save";
const LIST_ORDERS_URL = "/orders/list";

const saveOrders = async (user_id, products, order) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ user_id, products, order });

    return await axios.post(SAVE_ORDERS_URL, body, config);
};

const listOrders =  async () => {
    return await axios.get(LIST_ORDERS_URL);
};

export { saveOrders, listOrders };
