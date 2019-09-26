import { LOG_IN, LOG_OUT } from "./types";

export const logIn = userID => {
    return {
        type: LOG_IN,
        payload: userID
    };
};

export const logOut = () => {
    return {
        type: LOG_OUT
    };
};
