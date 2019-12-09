import {
    GET_TRANSACTIONS,
    OPEN_TRANSACTION_MODAL,
    SHOW_TRANSACTION_LOADING,
    PLACE_TRANSACTION,
    PLACE_BET,
    HIDE_TRANSACTION_MODAL
} from "../actions/types";

const INITIAL_STATE = {
    transactions: [],
    retrieved: false,
    showTransactionModal: false,
    transactionType: '',
    transactionLoading: false,
    transactionPlaced: false
};

export default (state = INITIAL_STATE, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_TRANSACTIONS:
            newState.transactions = action.payload;
            newState.retrieved = true;
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
