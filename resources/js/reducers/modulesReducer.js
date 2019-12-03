import { OPEN_SIDEBAR, LOG_IN_LOADING, CLOSE_OVERLAY, LOG_IN, LOG_OUT, LOG_IN_ALERT } from "../actions/types";

const INITIAL_STATE = {
    showOverlay: false,
    showSidebar: false,
    showLoading: false,
    showLoginAlert: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN_ALERT:
            return {...state, showLoginAlert: true};
        case OPEN_SIDEBAR:
            return {...state, showOverlay: true, showSidebar: true};
        case LOG_IN_LOADING:
        case LOG_OUT:
            return {...state, showOverlay: true, showLoading: true};
        case LOG_IN:
        case CLOSE_OVERLAY:
            return {
                showOverlay: false,
                showSidebar: false,
                showLoading: false,
                showLoginAlert: false
            };
        default:
            return state;
    }
}