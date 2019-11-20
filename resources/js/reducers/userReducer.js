import { FETCH_USER_INFO, PLACE_BET } from "../actions/types";

const INITIAL_STATE = {
    name: '',
    email: '',
    bankroll: 0,
    money_in_play: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_INFO:
            return action.payload;
        case PLACE_BET:
            let newState = {...state};
            newState.bankroll -= action.payload.wager;
            newState.money_in_play += action.payload.wager;
            return newState;
        default:
            return state;
    }
}