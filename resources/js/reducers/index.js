import { combineReducers } from "redux";
import authReducer from './authReducer';
import userReducer from './userReducer';
import gamesReducer from './gamesReducer';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    games: gamesReducer
});