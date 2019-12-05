import { SELECT_LEAGUE, DESELECT_LEAGUES, FETCH_UPCOMING_GAMES, FETCH_COMPLETED_GAMES } from "../actions/types";

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
    if (action.payload) {
        var { games, league } = action.payload;
    }
    switch (action.type) {
        case SELECT_LEAGUE:
            newState.league = action.payload;
            return newState;
        case DESELECT_LEAGUES:
            newState.league = '';
            return newState;
        case FETCH_UPCOMING_GAMES:
            newState[league].upcoming = games;
            return newState;
        case FETCH_COMPLETED_GAMES:
            newState[league].completed = games;
            return newState;
        default:
            return state;
    }
}