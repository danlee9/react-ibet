import React from "react";
import { connect } from "react-redux";
import { Transition } from "semantic-ui-react";
import { selectLeague, fetchUpcomingGames, fetchCompletedGames, setLoggedIn } from "../actions";
import GameBlock from './GameBlock';
import history from '../history';
import './Games.css';

class Games extends React.Component {
    constructor(props) {
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
        // this.props.fetchCompletedGames(league); // might just not have this as a feature
    }

    getDateFromUnix(timestamp) {
        let a = new Date(timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let time = date + ' ' + month + ' ' + year;
        return time;
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
        let leagueState = this.props[league];
        const getDateFromUnix = this.getDateFromUnix;
        if (leagueState[status]) {
            if (leagueState[status].length) {
                // return leagueState[status].map(game => {
                //     return (
                //         <GameBlock key={game.id} game={game} />
                //     );
                // });
                return leagueState[status].filter(game => {
                    let gameDate = getDateFromUnix(game.unix_start_time)
                    let gameDateObj = new Date(gameDate);
                    let currentTimeObj = new Date();
                    let currentDate = getDateFromUnix(currentTimeObj.getTime() / 1000); // divide by 1000 to get Unix time
                    let currentDateObj = new Date(currentDate);
                    return gameDateObj.getTime() === currentDateObj.getTime();
                }).map(game => {
                    return (
                        <GameBlock key={game.id} game={game} />
                    );
                });
            } else {
                return <h1 style={{textAlign: 'center', color: 'dodgerblue'}}>No games currently</h1>
            }
        } else if (leagueState.offSeason) {
            return <h1 style={{textAlign: 'center', color: 'dodgerblue'}}>{leagueState.offSeason}</h1>
        }
    }

    render() {
        let { league } = this.props.match.params;
        let gamesRetrieved = false;
        if (this.props[league].upcoming || this.props[league].offSeason) {
            gamesRetrieved = true;
        }
        return (
            <div className="ui centered grid">
                <div className="row">
                    <div className="eight wide column center aligned" style={{marginTop: '1rem', marginBottom: '1rem'}}>
                        <div className="ui blue segment">
                            <strong>UPCOMING GAMES</strong>
                        </div>
                    </div>
                </div>
                <div className="twelve wide column games-section-container">
                    <Transition visible={!gamesRetrieved} animation='fade' duration={500}>
                        <div className="wrapper-div-that-disappears">
                            <div className="absolute-position-container loader-container">
                                <div className="ui active massive text loader" style={{color: 'dodgerblue'}}>
                                    <strong>Loading</strong>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <Transition visible={gamesRetrieved} animation='fade up' duration={500}>
                        <div className="absolute-position-container game-blocks-container">
                            {this.renderGames(league, 'upcoming')}
                        </div>
                    </Transition>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        league: state.games.league,
        nfl: {
            upcoming: state.games.nfl.upcoming,
            completed: state.games.nfl.completed,
            offSeason: state.games.nfl.offSeason
        },
        nba: {
            upcoming: state.games.nba.upcoming,
            completed: state.games.nba.completed,
            offSeason: state.games.nba.offSeason
        },
        mlb: {
            upcoming: state.games.mlb.upcoming,
            completed: state.games.mlb.completed,
            offSeason: state.games.mlb.offSeason
        },
        nhl: {
            upcoming: state.games.nhl.upcoming,
            completed: state.games.nhl.completed,
            offSeason: state.games.nhl.offSeason
        },
        cfb: {
            upcoming: state.games.cfb.upcoming,
            completed: state.games.cfb.completed,
            offSeason: state.games.cfb.offSeason
        },
        cbb: {
            upcoming: state.games.cbb.upcoming,
            completed: state.games.cbb.completed,
            offSeason: state.games.cbb.offSeason
        },
        loggedIn: state.auth.loggedIn
    };
};

export default connect(mapStateToProps, { selectLeague, fetchUpcomingGames, fetchCompletedGames, setLoggedIn })(Games);
