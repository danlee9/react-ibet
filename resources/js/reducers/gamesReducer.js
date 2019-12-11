import { SELECT_LEAGUE, DESELECT_LEAGUES, FETCH_UPCOMING_GAMES, FETCH_COMPLETED_GAMES } from "../actions/types";

const INITIAL_STATE = {
    league: '',
    nfl: {
        upcoming: null,
        completed: null,
        offSeason: null
    },
    nba: {
        upcoming: null,
        completed: null,
        offSeason: null
    },
    mlb: {
        upcoming: null,
        completed: null,
        offSeason: null
    },
    nhl: {
        upcoming: null,
        completed: null,
        offSeason: null
    },
    cfb: {
        upcoming: null,
        completed: null,
        offSeason: null
    },
    cbb: {
        upcoming: null,
        completed: null,
        offSeason: null
    }
}

export default (state = INITIAL_STATE, action) => {
    let newState = {...state};
    if (action.payload) {
        var { games, league, offSeason } = action.payload;
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
            newState[league].offSeason = offSeason;
            return newState;
        case FETCH_COMPLETED_GAMES:
            newState[league].completed = games;
            return newState;
        default:
            return state;
    }
}