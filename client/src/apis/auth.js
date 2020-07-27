import axios from "axios";

const SAVE_USER_URL = "/users/save";
const CHECK_USER_URL = "/users/check";

const saveUser = async user => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ user });
    
    return await axios.post(SAVE_USER_URL, body, config);
};

const checkUser = async email => {
    return await axios.get(`${CHECK_USER_URL}/${email}`);
};

export { saveUser, checkUser };
