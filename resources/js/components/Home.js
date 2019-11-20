import React from 'react';
import { connect } from "react-redux";
import { logOut, fetchUserInfo } from "../actions";
import { Link } from "react-router-dom";
import history from '../history';

class Home extends React.Component {
    constructor(props) {
        super(props);
        if (!sessionStorage.getItem('id')) {
            history.push('/');
        }
    }

    componentDidMount() {
        this.props.fetchUserInfo(sessionStorage.getItem('id'));
    }

    onLogOut = () => {
        this.props.logOut();
    }

    // className="ui center aligned grid"
    render() {
        return (
            <div>
                <h1>Hello {this.props.name}!</h1>
                <p>Your bankroll is ${this.props.bankroll} and have ${this.props.money_in_play} in play</p>
                <Link to="/bets">Bet History</Link>
                <br/>
                <Link to="/transactions">Transactions</Link>
                <br/>
                <button onClick={this.onLogOut}>Log Out</button>
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
    { logOut, fetchUserInfo }
)(Home);