import { GET_TRANSACTIONS, ADD_TRANSACTION, PLACE_BET } from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return action.payload;
        case ADD_TRANSACTION:
            return [...state, action.payload];
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
            return [...state, transaction];    
        default:
            return state;
    }
}