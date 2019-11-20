import React from "react";
import { connect } from "react-redux";
import { fetchUpcomingNFLGames, fetchCompletedNFLGames } from "../actions";
import GameBlock from './GameBlock';
import { Link } from "react-router-dom";
import history from '../history';

class Games extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        if (!sessionStorage.getItem("id")) {
            history.push("/");
        }
    }

    componentDidMount() {
        this.props.fetchUpcomingNFLGames();
        this.props.fetchCompletedNFLGames();
    }

    renderUpcomingGames() {
        return this.props.nfl.upcoming.map(game => {
            return (
                <div key={game.id}>{game.away_team} at {game.home_team}</div>
            );
        });
    }

    renderCompletedGames() {
        return this.props.nfl.completed.map(game => {
            return (
                <div key={game.id}>{game.away_team} at {game.home_team}</div>
            );
        });
    }

    renderGames(status) {
        return this.props.nfl[status].map(game => {
            return (
                // <div key={game.id}>{game.away_team} at {game.home_team}</div>
                <GameBlock key={game.id} game={game} />
            );
        });
    }

    render() {
        return (
            <div>
                <Link to="/home">HOME PAGE</Link>
                <div>{this.props.match.params.league}</div>
                <div><strong>UPCOMING GAMES</strong></div>
                <div>{this.props.nfl.upcoming ? this.renderGames('upcoming') : "Loading..."}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nfl: {
            upcoming: state.games.nfl.upcoming,
            completed: state.games.nfl.completed
        }
    };
};

export default connect(mapStateToProps, { fetchUpcomingNFLGames, fetchCompletedNFLGames })(Games);
