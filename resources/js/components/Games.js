import React from "react";
import { connect } from "react-redux";
import { Grid, Transition, Button } from "semantic-ui-react";
import { selectLeague, fetchUpcomingGames, fetchCompletedGames, setLoggedIn } from "../actions";
import GameBlock from './GameBlock';
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
        this.state = { visible: true };
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
        // if (league && this.props[league].upcoming) {
        //     return this.props[league][status].map(game => {
        //         return (
        //             <GameBlock key={game.id} game={game} />
        //         );
        //     });
        // }
        // return "Loading...";
        if (this.props[league].upcoming) {
            console.log('rendering');
            return this.props[league][status].map(game => {
                return (
                    <GameBlock key={game.id} game={game} />
                );
            });
        }
    }

    toggleVisibility = () =>
        this.setState((prevState) => ({ visible: !prevState.visible }))

    render() {
        let { league } = this.props.match.params;
        const { visible } = this.state
        return (
            <div className="ui centered grid">
                <div className="row">
                    <div className="eight wide column center aligned">
                        <div className="ui blue segment">
                            <strong>UPCOMING GAMES</strong>
                        </div>
                    </div>
                </div>
                {/* <div className="twelve wide column">{this.renderGames(league, 'upcoming')}</div> */}
                <Transition.Group duration={500}>
                    <div className="twelve wide column">{this.renderGames(league, 'upcoming')}</div>
                </Transition.Group>
                {/* <Button
                content={visible ? 'Hide' : 'Show'}
                onClick={this.toggleVisibility}
                />
                <Transition visible={visible} animation='scale' duration={500}>
                    <Grid.Column>TEST</Grid.Column>
                </Transition> */}
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
