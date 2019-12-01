import { OPEN_SIDEBAR, LOG_IN_LOADING, CLOSE_OVERLAY, LOG_IN, LOG_OUT } from "../actions/types";

const INITIAL_STATE = {
    showOverlay: false,
    showSidebar: false,
    showLoading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
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
                showLoading: false
            };
        default:
            return state;
    }
}