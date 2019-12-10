import {
    GET_TRANSACTIONS,
    OPEN_TRANSACTION_MODAL,
    SHOW_TRANSACTION_LOADING,
    PLACE_TRANSACTION,
    PLACE_BET,
    HIDE_TRANSACTION_MODAL,
    CHANGE_TRANSACTIONS_PAGE
} from "../actions/types";
import { parsePageParameter } from "../utilities";

const INITIAL_STATE = {
    transactions: [],
    retrieved: false,
    showTransactionModal: false,
    transactionType: '',
    transactionLoading: false,
    transactionPlaced: false,
    first_page_url: '',
    last_page_url: '',
    next_page_url: '',
    prev_page_url: '',
    current_page: null,
    last_page: null
};

export default (state = INITIAL_STATE, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_TRANSACTIONS:
            // newState.transactions = action.payload;
            // newState.retrieved = true;
            // return newState;
            let { data, first_page_url, last_page_url, next_page_url, prev_page_url, current_page, last_page, path } = action.payload;
            first_page_url = first_page_url ? `/transactions/${parsePageParameter(first_page_url, path)}` : '/';
            last_page_url = last_page_url ? `/transactions/${parsePageParameter(last_page_url, path)}` : '/';
            next_page_url = next_page_url ? `/transactions/${parsePageParameter(next_page_url, path)}` : '/';
            prev_page_url = prev_page_url ? `/transactions/${parsePageParameter(prev_page_url, path)}` : '/';
            newState = {...newState, transactions: data, retrieved: true, first_page_url, last_page_url, next_page_url, prev_page_url, current_page, last_page }
            return newState;
        case CHANGE_TRANSACTIONS_PAGE:
            newState.retrieved = false;
            return newState;
        case OPEN_TRANSACTION_MODAL:
            return {
                ...state,
                transactionType: action.payload,
                showTransactionModal: true,
                transactionPlaced: false
            };
        case SHOW_TRANSACTION_LOADING:
            return { ...state, transactionLoading: true };
        case PLACE_TRANSACTION:
            newState.transactions.push(action.payload);
            newState.transactionLoading = false;
            newState.transactionPlaced = true;
            return newState;
        case PLACE_BET:
            let transaction = {
                id: action.payload.transaction_id,
                user_id: action.payload.user_id,
                bet_id: action.payload.id,
                type: action.payload.bet_type,
                amount: action.payload.wager,
                in_play: true,
                created_at: action.payload.created_at
            };
            newState.transactions.push(transaction);
            return newState;
        case HIDE_TRANSACTION_MODAL:
            return { ...state, showTransactionModal: false, transactionPlaced: false, transactionLoading: false };
        default:
            return state;
    }
};
