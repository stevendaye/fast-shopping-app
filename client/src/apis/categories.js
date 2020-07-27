import axios from "axios";

const SAVE_CATEGORIES_URL = "/categories/save";
const LIST_CATEGORIES_URL = "/categories/list";
const SAVE_PRODUCT_CATEGORIES_URL = "/categories/save/product-categories";

const saveCategories = async categories => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ categories });

    return await axios.post(SAVE_CATEGORIES_URL, body, config);
};

const saveProductCategories = async productCategories => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ productCategories });

    return await axios.post(SAVE_PRODUCT_CATEGORIES_URL, body, config);
};

const listCategories = async () => {
    return await axios.get(LIST_CATEGORIES_URL);
};

export { saveCategories, saveProductCategories, listCategories };
