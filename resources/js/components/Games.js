import React from "react";
import { connect } from "react-redux";
import { fetchUpcomingNFLGames } from "../actions";

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
    }

    renderUpcomingGames() {
        return this.props.nfl.upcoming.map(game => {
            return (
                <div key={game.id}>{game.away_team} at {game.home_team}</div>
            );
        });
    }

    render() {
        return (
            <div>
                <div>{this.props.match.params.league}</div>
                <div>{this.props.nfl.upcoming ? this.renderUpcomingGames() : "Loading..."}</div>
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

export default connect(mapStateToProps, { fetchUpcomingNFLGames })(Games);
