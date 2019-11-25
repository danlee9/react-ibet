import React from 'react';
import { connect } from "react-redux";

import { deselectLeagues, fetchUserInfo, getTransactions, addTransaction, setLoggedIn } from "../actions";

class Transactions extends React.Component {
    constructor(props) {
        super(props);
        if (!sessionStorage.getItem('id')) {
            history.push('/');
        } else {
            if (!this.props.loggedIn) {
                let id = sessionStorage.getItem('id');
                let token = sessionStorage.getItem('token');
                this.props.setLoggedIn(id, token);
            }
        }
    }

    componentDidMount() {
        this.props.deselectLeagues();
        this.props.fetchUserInfo(sessionStorage.getItem('id'));
        this.props.getTransactions();
    }

    renderTransactions() {
        if (this.props.transactions.length) {
            return this.props.transactions.map(transaction => {
                return <p>{transaction.amount}</p>
            });
        } else {
            return "Loading...";
        }
    }

    render() {
        return (
            <div>
                <p>Bankroll: {this.props.bankroll}</p>
                <p>Money in Play: {this.props.money_in_play}</p>
                <div className="ui divider"></div>
                {this.renderTransactions()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        transactions: state.transactions,
        bankroll: state.user.bankroll,
        money_in_play: state.user.money_in_play,
        loggedIn: state.auth.loggedIn
    };
};

export default connect(mapStateToProps, { deselectLeagues, fetchUserInfo, getTransactions, addTransaction, setLoggedIn })(Transactions);