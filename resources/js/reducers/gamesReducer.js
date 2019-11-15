import { FETCH_UPCOMING_NFL_GAMES } from "../actions/types";

const INITIAL_STATE = {
    nfl: {
        upcoming: null,
        completed: null
    },
    nba: {
        upcoming: null,
        completed: null
    },
    mlb: {
        upcoming: null,
        completed: null
    },
    nhl: {
        upcoming: null,
        completed: null
    },
    cfb: {
        upcoming: null,
        completed: null
    },
    cbb: {
        upcoming: null,
        completed: null
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_UPCOMING_NFL_GAMES:
            let newState = {...state};
            newState.nfl.upcoming = action.payload;
            return newState;
        default:
            return state;
    }
}