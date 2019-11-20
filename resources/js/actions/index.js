import { 
    LOG_IN, 
    LOG_OUT, 
    FETCH_USER_INFO, 
    FETCH_UPCOMING_NFL_GAMES, 
    FETCH_COMPLETED_NFL_GAMES, 
    FETCH_BETS,
    PLACE_BET,
    GET_TRANSACTIONS,
    ADD_TRANSACTION
} from "./types";
import history from '../history';

export const logIn = (email, password) => async (dispatch) => {
    const user = await axios.post('/login', {email, password});
    const id = user.data.id;
    const token = user.data.token;
    const payload = { id, token };
    dispatch({type: LOG_IN, payload});
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('token', token); // for use with api authentication when retrieving user data
    history.push('/home');
}

export const logOut = () => async (dispatch) => {
    await axios.post('/logout');
    dispatch({type: LOG_OUT});
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
    location.reload('/'); // hard refresh because for someone weird reason laravel isn't liking multiple requests login from SPA
}

export const fetchUserInfo = id => async (dispatch) => {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`/api/user/${id}?api_token=${token}`);
    let { name, email, bankroll, money_in_play } = response.data;
    const payload = { name, email, bankroll, money_in_play };
    dispatch({type: FETCH_USER_INFO, payload});
}

export const fetchUpcomingNFLGames = () => async dispatch => {
    const response = await axios.get('/api/games/nfl/upcoming');
    dispatch({type: FETCH_UPCOMING_NFL_GAMES, payload: response.data});
}

export const fetchCompletedNFLGames = () => async dispatch => {
    const response = await axios.get('/api/games/nfl/completed');
    dispatch({type: FETCH_COMPLETED_NFL_GAMES, payload: response.data});
}

export const fetchBets = () => async dispatch => {
    const token = sessionStorage.getItem('token');
    // const response = {data: ['test message', 'blah']};
    const response = await axios.get(`/api/bets?api_token=${token}`);
    dispatch({type: FETCH_BETS, payload: response.data});
    console.log('hello from the actions');
}

export const placeBet = data => async dispatch => {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(`/api/bets?api_token=${token}`, data);
    console.log(response.data);
    dispatch({type: PLACE_BET, payload: response.data});
}

export const getTransactions = () => async dispatch => {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`/api/transactions?api_token=${token}`);
    dispatch({type: GET_TRANSACTIONS, payload: response.data});
}

export const addTransaction = data => async dispatch => {
    const token = sessionStorage.getItem('token');
}