import { 
    LOG_IN, 
    LOG_OUT, 
    FETCH_USER_INFO,
    SELECT_LEAGUE,
    DESELECT_LEAGUES,
    FETCH_UPCOMING_GAMES, 
    FETCH_COMPLETED_GAMES, 
    FETCH_BETS,
    SELECT_BET,
    SHOW_BET_LOADING,
    PLACE_BET,
    HIDE_BET_MODAL,
    GET_TRANSACTIONS,
    PLACE_TRANSACTION,
    OPEN_SIDEBAR,
    LOG_IN_LOADING,
    CLOSE_OVERLAY,
    SHOW_TRANSACTION_LOADING,
    OPEN_TRANSACTION_MODAL,
    HIDE_TRANSACTION_MODAL,
    LOG_IN_FAIL,
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    REGISTER,
    SHOW_FORM_LOADING,
    HIDE_FORM_LOADING
} from "./types";
import history from '../history';

export const setLoggedIn = (id, token) =>  {
    return {
        type: LOG_IN,
        payload: {
            id,
            token
        }
    }
}

export const logIn = (email, password) => async (dispatch) => {
    const user = await axios.post('/login', {email, password});
    if (user.data.success) {
        const id = user.data.id;
        const token = user.data.token;
        const payload = { id, token };
        dispatch({type: LOG_IN, payload});
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('token', token); // for use with api authentication when retrieving user data
        history.push('/home');
    } else {
        dispatch({type: LOG_IN_FAIL});
    }
}

export const logOut = () => async (dispatch) => {
    dispatch({type: LOG_OUT});
    await axios.post('/logout');
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

export const register = data => async dispatch => {
    dispatch({type: SHOW_FORM_LOADING});
    const res = await axios.post('/register', data);
    if (res.data.success) {
        dispatch({type: REGISTER});
    } else {
        let errObj = { type: 'error', header: 'Failed to register', items: res.data.error }
        dispatch({type: SHOW_MESSAGE, payload: errObj});
        dispatch({type: HIDE_FORM_LOADING});
    }
}

export const selectLeague = league => {
    return {
        type: SELECT_LEAGUE,
        payload: league
    };
}

export const deselectLeagues = () => {
    return {
        type: DESELECT_LEAGUES
    };
}

export const fetchUpcomingGames = league => async dispatch => {
    const response = await axios.get(`/api/games/${league}/upcoming`);
    dispatch({type: FETCH_UPCOMING_GAMES, payload: {games: response.data, league}});
}

export const fetchCompletedGames = league => async dispatch => {
    const response = await axios.get(`/api/games/${league}/completed`);
    dispatch({type: FETCH_COMPLETED_GAMES, payload: {games: response.data, league}});
}

export const fetchBets = () => async dispatch => {
    const token = sessionStorage.getItem('token');
    // const response = {data: ['test message', 'blah']};
    const response = await axios.get(`/api/bets?api_token=${token}`);
    dispatch({type: FETCH_BETS, payload: response.data});
}

export const selectBet = bet => {
    return {
        type: SELECT_BET,
        payload: bet
    };
}

export const showBetLoading = () => {
    return {
        type: SHOW_BET_LOADING
    }
}

export const placeBet = data => async dispatch => {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(`/api/bets?api_token=${token}`, data);
    dispatch({type: PLACE_BET, payload: response.data});
}

export const hideBetModal = () => {
    return {
        type: HIDE_BET_MODAL
    }
}

export const getTransactions = () => async dispatch => {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`/api/transactions?api_token=${token}`);
    dispatch({type: GET_TRANSACTIONS, payload: response.data});
}

export const openTransactionModal = transactionType => {
    return {
        type: OPEN_TRANSACTION_MODAL,
        payload: transactionType
    }
}

export const showTransactionLoading = () => {
    return {
        type: SHOW_TRANSACTION_LOADING
    };
}

export const placeTransaction = data => async dispatch => {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(`/api/transactions?api_token=${token}`, data);
    dispatch({type: PLACE_TRANSACTION, payload: response.data});
}

export const hideTransactionModal = () => {
    return {
        type: HIDE_TRANSACTION_MODAL
    }
}

export const openSidebar = () => {
    return {
        type: OPEN_SIDEBAR
    }
}

export const loginLoading = () => {
    return {
        type: LOG_IN_LOADING
    }
}

export const closeOverlay = () => {
    return {
        type: CLOSE_OVERLAY
    }
}

export const showMessage = (msgType, header, items) => {
    return {
        type: SHOW_MESSAGE,
        payload: {
            type: msgType,
            header,
            items
        }
    }
}

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    }
}