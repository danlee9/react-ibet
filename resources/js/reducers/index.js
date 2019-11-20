import { combineReducers } from "redux";
import authReducer from './authReducer';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';
import betsReducer from './betsReducer';
import transactionsReducer from './transactionsReducer';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    games: gamesReducer,
    bets: betsReducer,
    transactions: transactionsReducer
});