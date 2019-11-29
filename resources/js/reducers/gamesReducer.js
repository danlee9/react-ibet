import { SELECT_LEAGUE, DESELECT_LEAGUES, FETCH_UPCOMING_NFL_GAMES, FETCH_COMPLETED_NFL_GAMES } from "../actions/types";

const INITIAL_STATE = {
    league: '',
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
    let newState = {...state};
    switch (action.type) {
        case SELECT_LEAGUE:
            console.log('selecting league')
            newState.league = action.payload;
            return newState;
        case DESELECT_LEAGUES:
            newState.league = '';
            return newState;
        case FETCH_UPCOMING_NFL_GAMES:
            newState.nfl.upcoming = action.payload;
            return newState;
        case FETCH_COMPLETED_NFL_GAMES:
            newState.nfl.completed = action.payload;
            return newState;
        default:
            return state;
    }
}