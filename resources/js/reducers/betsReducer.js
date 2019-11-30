import { FETCH_BETS, SELECT_BET, SHOW_LOADING, PLACE_BET, HIDE_BET_MODAL } from "../actions/types";

const INITIAL_STATE = {
    bets: [],
    selectedBet: {
        id: null,
        side: null,
        rubric: null,
        odds: null
    },
    betsRetrieved: false,
    showBetModal: false,
    betLoading: false
}

export default (state = INITIAL_STATE, action) => {
    let newState = {...state};
    switch (action.type) {
        case FETCH_BETS:
            newState.bets = action.payload;
            newState.betsRetrieved = true;
            return newState;
        case SELECT_BET:
            newState.selectedBet = action.payload;
            newState.showBetModal = true;
            return newState;
        case SHOW_LOADING:
            newState.betLoading = true;
            return newState;
        case PLACE_BET:
            newState.bets.push(action.payload);
            newState.betLoading = false;
            return newState;
        case HIDE_BET_MODAL:
            newState.showBetModal = false;
            return newState;
        default:
            return state;
    }
}