import axios from "axios";

const SAVE_PRODUCTS_URL = "/products/save";
const LIST_PRODUCTS_URL = "/products/list";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

const saveProducts = async products => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ products });

    return await axios.post(SAVE_PRODUCTS_URL, body, config);
};

const listProducts = async (page, hitsPerPage) => {
    return await axios.get(
        `${LIST_PRODUCTS_URL}?${PARAM_PAGE}${page}&${PARAM_HPP}${hitsPerPage}`
    );
};

export { saveProducts, listProducts };
