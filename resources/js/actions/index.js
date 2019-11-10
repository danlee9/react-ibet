import { LOG_IN, LOG_OUT, FETCH_USER_INFO } from "./types";
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
    let { name, email, bankroll } = response.data;
    const payload = { name, email, bankroll };
    console.log(payload);
    dispatch({type: FETCH_USER_INFO, payload});
}