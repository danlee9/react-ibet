import React from 'react';
import { connect } from "react-redux";
import { logOut, fetchUserInfo } from "../actions";
import { Link } from "react-router-dom";

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

    render() {
        return (
            <div className="ui center aligned grid">
                <h1>Hello {this.props.name}!</h1>
                <Link to="/bets">Bet History</Link>
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
        bankroll: state.user.bankroll
    };
};

export default connect(
    mapStateToProps,
    { logOut, fetchUserInfo }
)(Home);