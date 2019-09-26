import React from 'react';
import { connect } from "react-redux";
import { logOut } from "../actions";
import { Link } from "react-router-dom";
import history from '../history';

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log("Login.js:8", props);
        if (!props.isLoggedIn) {
            console.log("Login.js:10", 'not logged in');
            history.push('/');
        } else {
            console.log("Login.js:13", "logged in");
        }
    }

    onLogOut = () => {
        this.props.logOut();
        history.push('/');
    }

    render() {
        return (
            <div className="ui center aligned grid">
                <h1>Test Page</h1>
                <Link to="/test">TEST PAGE</Link>
                <br/>
                <Link to="/">Login Page</Link>
                <br/>
                <button onClick={this.onLogOut}>Log Out</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(
    mapStateToProps,
    { logOut }
)(Home);