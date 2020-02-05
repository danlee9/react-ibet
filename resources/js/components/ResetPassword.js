import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        if (sessionStorage.getItem('id')) {
            history.push('/home');
        }
        this.state = {
            email: ''
        };
        // this.props.hideMessage();
    }

    onInputChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value}); // make sure to set input name correctly
    }

    sendResetPasswordLink = e => {
        e.preventDefault();
        const { email } = this.state;
        console.log(email);
        axios.post('/password/email', { email }).then(res => {
            console.log(res);
        });
    }

    render() {
        return (
            <div className="ui center aligned grid">
                <div className="row">
                    <div className="six wide column">
                        <form className="ui form">
                            <div className="ui left aligned segment dodgerblue">
                                <div className="field">
                                    <label style={{textAlign: 'center'}}>Get Reset Password Link</label>
                                    <div className="ui left icon input">
                                        <i className="user icon"></i>
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder="E-mail address"
                                            value={this.state.email}
                                            onChange={this.onInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="ui two column middle aligned grid">
                                    <div className="column">
                                        <button className="ui blue submit button" onClick={this.sendResetPasswordLink}>Send Link</button>
                                    </div>
                                    <div className="right aligned column"><Link to="/">Back to Home Page</Link></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;