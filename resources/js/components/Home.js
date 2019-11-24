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
            <div className="ui centered grid">
                <div className="twelve wide center aligned column">
                    <div className="ui raised segment">
                        <h1><i class="icon user outline"></i> Hello {this.props.name}!</h1>
                        <h3>Your bankroll is ${this.props.bankroll} and have ${this.props.money_in_play} in play</h3>
                        <div>
                            <Link to="/bets" className="ui button primary">Bet History</Link> <Link to="/transactions" className="ui button positive">Transactions</Link>
                        </div>
                        <div>
                            <button onClick={this.onLogOut} className="ui button">Log Out</button>
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
    { logOut, fetchUserInfo }
)(Home);