import { FETCH_USER_INFO } from "../actions/types";

const INITIAL_STATE = {
    name: '',
    email: '',
    bankroll: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_INFO:
            let { name, email, bankroll } = action.payload;
            return { ...state, name, email, bankroll };
        default:
            return state;
    }
}