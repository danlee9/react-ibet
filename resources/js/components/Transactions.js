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
            console.log(this.props.transactions);
            return this.props.transactions.map(transaction => {
                let { type } = transaction;
                let title = '';
                let icon = ''
                switch (type) {
                    case 'wager':
                        title = 'Wager';
                        icon = 'angle right';
                        break;
                    case 'bet_win':
                        title = "Bet Winnings";
                        icon = 'trophy';
                        break;
                }

                // gift or shopping basket for withdrawal
                // credit card for deposit
                
                return (
                    <div className="item middle aligned" key={transaction.id}>
                        {/* <div className="right floated middle aligned content">{transaction.amount}</div>
                        <i className={`${icon} icon`}></i>
                        <div className="content">
                            <div className="header">Date</div>
                            <div className="description">{title}</div>
                        </div> */}
                        
                        {/* <div className="content">
                            <div className="header"><div className="right floated middle aligned content">Date</div></div>
                            <div className="description"><div className="right floated middle aligned content">{transaction.amount}</div><i className={`${icon} icon`}></i> {title}</div>
                        </div> */}
                        <div className="right floated content">
                            <div className="header">Date</div>
                            <div className="description">{transaction.amount}</div>
                        </div>
                        <div className="middle aligned content">
                            <i className={`${icon} icon`}></i> {title}
                        </div>
                    </div>
                )
            });
        } else {
            return "Loading...";
        }
    }

    render() {
        return (
            <div className="ui centered grid">
                <div className="row">
                    <div className="eight wide column center aligned" style={{marginTop: '1rem', marginBottom: '1rem'}}>
                        <div className="ui blue segment">
                            <strong>Transactions</strong>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="twelve wide column">
                    <p>Bankroll: {this.props.bankroll}</p>
                    <p>Money in Play: {this.props.money_in_play}</p>
                    </div>
                </div>
                <div className="row" style={{paddingTop: '0', paddingBottom: '0'}}>
                    <div className="twelve wide column">
                        <div className="ui divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="twelve wide column">
                        <div className="ui huge divided list">
                            {this.renderTransactions()}
                        </div>
                    </div>
                </div>                
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