import React from "react";
import { connect } from "react-redux";
import { logIn, loginLoading } from "../actions";
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

    onLogin(e) {
        e.preventDefault();
        let {email, password} = this.state;
        this.props.loginLoading();
        this.props.logIn(email, password);
    }

    render() {
        let { showLoginAlert } = this.props;
        return (
            <div className="ui center aligned grid">
                <div className="column login">
                    <h2 className="ui teal image header reduce-margin-top">
                        <div className="content">Log-in to your account</div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment dodgerblue">
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
                            <button className="ui fluid large blue submit button" onClick={e => this.onLogin(e)}>
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="ui message">
                        New to us? <a href="#">Sign Up</a>
                    </div>
                    <div class={`ui warning message ${showLoginAlert ? 'visible' : 'hidden'}`}>
                        <i class="close icon"></i>
                        <div class="header">
                            You have to login before you can do that!
                        </div>
                    </div>
                    {/* <div className="ui error message">
                        <i class="close icon"></i>
                        <div class="header">
                            There were some errors with your submission
                        </div>
                        <ul class="list">
                            <li>You must include both a upper and lower case letters in your password.</li>
                            <li>You need to select your home country.</li>
                        </ul>
                    </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        loggedIn: state.auth.loggedIn,
        showLoginAlert: state.modules.showLoginAlert
    };
};

export default connect(
    mapStateToProps,
    { logIn, loginLoading }
)(Login);
