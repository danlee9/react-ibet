import { FETCH_BETS, PLACE_BET } from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_BETS:
            return action.payload;
        case PLACE_BET:
            return [...state, action.payload];
        default:
            return state;
    }
}