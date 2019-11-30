import React from 'react';
import { connect } from "react-redux";
import { deselectLeagues, logOut, fetchUserInfo, setLoggedIn } from "../actions";
import { Link } from "react-router-dom";
import history from '../history';

import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        if (!sessionStorage.getItem('id')) {
            history.push('/');
        } else {
            if (!this.props.loggedIn) {
                let id = sessionStorage.getItem('id');
                let token = sessionStorage.getItem('token');
                this.props.setLoggedIn(id, token);
                console.log('setting logged in');
            }
        }
    }

    componentDidMount() {
        this.props.deselectLeagues();
        this.props.fetchUserInfo(sessionStorage.getItem('id'));
    }

    onLogOut = () => {
        this.props.logOut();
    }

    // className="ui center aligned grid"
    render() {
        return (
            <div className="ui centered grid">
                <div className="twelve wide center aligned column">
                    <div className="ui raised segment">
                        <div className="ibet-icon">iBet</div>
                        <h1><i className="icon user outline"></i> Hello {this.props.name}!</h1>
                        <h3>Your bankroll is ${this.props.bankroll} and have ${this.props.money_in_play} in play</h3>
                        <div>
                            <Link to="/bets" className="ui button primary">Bet History</Link> <Link to="/transactions" className="ui button positive">Transactions</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        name: state.user.name,
        email: state.user.email,
        bankroll: state.user.bankroll,
        money_in_play: state.user.money_in_play
    };
};

export default connect(
    mapStateToProps,
    { deselectLeagues, logOut, fetchUserInfo, setLoggedIn }
)(Home);