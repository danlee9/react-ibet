import React from "react";
import { connect } from "react-redux";
import { logIn } from "../actions";
import { Link } from "react-router-dom";
import "./Login.css";
import history from '../history';

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log("Login.js:9", props);
        if (!props.isLoggedIn) {
            console.log("Login.js:11", 'not logged in');
        } else {
            console.log("Login.js:13", "logged in");
            history.push('/home');
        }
    }

    onLogin(userID) {
        this.props.logIn(userID);
        // console.log("Clicked the login");
        history.push('/home');
    }

    render() {
        return (
            <div className="ui center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <div className="content">Log-in to your account!!!!</div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="E-mail address"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="ui fluid large teal submit button" onClick={() => this.onLogin("userID")}>
                                Login
                            </div>
                        </div>
                        <div className="ui error message"></div>
                    </form>
                    <div className="ui message">
                        New to us? <a href="#">Sign Up</a> <Link to="/home">To Home Page</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(
    mapStateToProps,
    { logIn }
)(Login);
