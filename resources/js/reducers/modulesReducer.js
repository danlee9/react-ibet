import {
    OPEN_SIDEBAR,
    LOG_IN_LOADING,
    CLOSE_OVERLAY,
    LOG_IN,
    LOG_OUT,
    LOG_IN_FAIL,
    SHOW_MESSAGE,
    HIDE_MESSAGE
} from "../actions/types";

const INITIAL_STATE = {
    showOverlay: false,
    showSidebar: false,
    showLoading: false,
    message: {
        show: false,
        type: '',
        content: ''
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return { ...state, showOverlay: true, showSidebar: true };
        case LOG_IN_LOADING:
        case LOG_OUT:
            return { ...state, showOverlay: true, showLoading: true };
        case LOG_IN:
        case CLOSE_OVERLAY:
            return INITIAL_STATE;
        case LOG_IN_FAIL:
            return { ...INITIAL_STATE, message: {show: true, type: 'error', content: 'Login Failed'} };
        case SHOW_MESSAGE:
            let { type, content } = action.payload;
            return { ...state, message: { show: true, type, content } };
        case HIDE_MESSAGE:
            return { ...state, message: { show: false, type: '', content: '' } }
        default:
            return state;
    }
};
