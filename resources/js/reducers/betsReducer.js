import { FETCH_BETS, SELECT_BET, SHOW_BET_LOADING, PLACE_BET, HIDE_BET_MODAL, CHANGE_BETS_PAGE } from "../actions/types";
import { parsePageParameter } from "../utilities";

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
    betLoading: false,
    betPlaced: false,
    first_page_url: '',
    last_page_url: '',
    next_page_url: '',
    prev_page_url: '',
    current_page: null,
    last_page: null
}

export default (state = INITIAL_STATE, action) => {
    let newState = {...state};
    switch (action.type) {
        case FETCH_BETS:
            // newState.bets = action.payload;
            // newState.betsRetrieved = true;
            // return newState;
            let { data, first_page_url, last_page_url, next_page_url, prev_page_url, current_page, last_page, path } = action.payload;
            first_page_url = first_page_url ? `/bets/${parsePageParameter(first_page_url, path)}` : '/';
            last_page_url = last_page_url ? `/bets/${parsePageParameter(last_page_url, path)}` : '/';
            next_page_url = next_page_url ? `/bets/${parsePageParameter(next_page_url, path)}` : '/';
            prev_page_url = prev_page_url ? `/bets/${parsePageParameter(prev_page_url, path)}` : '/';
            newState = {...newState, bets: data, betsRetrieved: true, first_page_url, last_page_url, next_page_url, prev_page_url, current_page, last_page }
            return newState;
        case CHANGE_BETS_PAGE:
            newState.betsRetrieved = false;
            return newState;
        case SELECT_BET:
            newState.selectedBet = action.payload;
            newState.showBetModal = true;
            newState.betPlaced = false;
            return newState;
        case SHOW_BET_LOADING:
            newState.betLoading = true;
            return newState;
        case PLACE_BET:
            newState.bets.push(action.payload);
            newState.betLoading = false;
            newState.betPlaced = true;
            return newState;
        case HIDE_BET_MODAL:
            newState.showBetModal = false;
            return newState;
        default:
            return state;
    }
}