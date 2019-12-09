import { FETCH_USER_INFO, PLACE_BET, PLACE_TRANSACTION } from "../actions/types";

const INITIAL_STATE = {
    name: '',
    email: '',
    bankroll: 0,
    money_in_play: 0
}

export default (state = INITIAL_STATE, action) => {
    let newState = {...state};
    switch (action.type) {
        case FETCH_USER_INFO:
            return action.payload;
        case PLACE_BET:
            newState.bankroll -= action.payload.wager;
            newState.money_in_play += action.payload.wager;
            return newState;
        case PLACE_TRANSACTION:
            newState.bankroll += +action.payload.amount;
            return newState;
        default:
            return state;
    }
}