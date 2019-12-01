import React from "react";
import { connect } from "react-redux";
import { logIn } from "../actions";
import { Link } from "react-router-dom";
import "./Login.css";
import history from '../history';
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        if (sessionStorage.getItem('id')) {
            history.push('/home');
        }
        this.state = {
            email: '',
            password: ''
        };
    }

    onInputChange(e, name) {
        let obj = {};
        obj[name] = e.target.value;
        this.setState(obj);
    }

    onLogin() {
        let {email, password} = this.state;
        this.props.logIn(email, password);
    }

    render() {
        return (
            <div className="ui center aligned grid">
                <div className="column login">
                    <h2 className="ui teal image header reduce-margin-top">
                        <div className="content">Log-in to your account</div>
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
                                        value={this.state.email}
                                        onChange={(e) => this.onInputChange(e, 'email')}
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
                                        value={this.state.password}
                                        onChange={(e) => this.onInputChange(e, 'password')}
                                    />
                                </div>
                            </div>
                            <div className="ui fluid large teal submit button" onClick={() => this.onLogin()}>
                                Login
                            </div>
                        </div>
                        <div className="ui error message"></div>
                    </form>
                    <div className="ui message">
                        New to us? <a href="#">Sign Up</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { loggedIn: state.auth.loggedIn };
};

export default connect(
    mapStateToProps,
    { logIn }
)(Login);
