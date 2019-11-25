import React from "react";
import { connect } from "react-redux";
import { selectLeague, fetchUpcomingGames, fetchCompletedGames, setLoggedIn } from "../actions";
import GameBlock from './GameBlock';
import { Link } from "react-router-dom";
import history from '../history';

class Games extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        if (!sessionStorage.getItem("id")) {
            history.push("/");
        } else {
            if (!this.props.loggedIn) {
                let id = sessionStorage.getItem('id');
                let token = sessionStorage.getItem('token');
                this.props.setLoggedIn(id, token);
            }
        }
    }

    componentDidMount() {
        let { league } = this.props.match.params;
        this.props.selectLeague(league);
        this.props.fetchUpcomingGames(league);
        this.props.fetchCompletedGames(league);
    }

    renderUpcomingGames(league) {
        return this.props[league].upcoming.map(game => {
            return (
                <div key={game.id}>{game.away_team} at {game.home_team}</div>
            );
        });
    }

    renderCompletedGames(league) {
        return this.props[league].completed.map(game => {
            return (
                <div key={game.id}>{game.away_team} at {game.home_team}</div>
            );
        });
    }

    renderGames(league, status) {
        return this.props[league][status].map(game => {
            return (
                // <div key={game.id}>{game.away_team} at {game.home_team}</div>
                <GameBlock key={game.id} game={game} />
            );
        });
    }

    render() {
        let { league } = this.props;
        let gamesRetrieved = false;
        if (league && this.props[league].upcoming) {
            gamesRetrieved = true;
        }
        return (
            <div className="ui centered grid">
                <div className="row">
                    <div className="eight wide column center aligned">
                        <div className="ui blue segment">
                            <strong>UPCOMING GAMES</strong>
                        </div>
                    </div>
                </div>
                <div className="twelve wide column">{gamesRetrieved ? this.renderGames(league, 'upcoming') : "Loading..."}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        league: state.games.league,
        nfl: {
            upcoming: state.games.nfl.upcoming,
            completed: state.games.nfl.completed
        },
        nba: {
            upcoming: state.games.nba.upcoming,
            completed: state.games.nba.completed
        },
        mlb: {
            upcoming: state.games.mlb.upcoming,
            completed: state.games.mlb.completed
        },
        nhl: {
            upcoming: state.games.nhl.upcoming,
            completed: state.games.nhl.completed
        },
        cfb: {
            upcoming: state.games.cfb.upcoming,
            completed: state.games.cfb.completed
        },
        cbb: {
            upcoming: state.games.cbb.upcoming,
            completed: state.games.cbb.completed
        },
        loggedIn: state.auth.loggedIn
    };
};

export default connect(mapStateToProps, { selectLeague, fetchUpcomingGames, fetchCompletedGames, setLoggedIn })(Games);
