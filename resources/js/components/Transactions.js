import React from 'react';
import { connect } from "react-redux";
import { Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { deselectLeagues, fetchUserInfo, getTransactions, changeTransactionsPage, setLoggedIn } from "../actions";
import { convertEuroOdds, formatDate } from "../utilities";
import history from '../history';

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
        if (this.props.retrieved) {
            this.props.changeTransactionsPage();
        }
        this.props.deselectLeagues();
        this.props.fetchUserInfo(sessionStorage.getItem('id'));
        let { page } = this.props.match.params;
        this.props.getTransactions(page);
    }

    getTransactionDate = (date, dateFunc) => {
        let dateInput = `${date} UTC`;
        return dateFunc(dateInput);
    }

    dateFormatShort = input => {
        let date = new Date(input * 1000);
        return date.toLocaleDateString();
    }

    formatPointSpread(spread) {
        if (spread && spread[0] !== "-") {
            return `+${spread}`;
        } else if (spread) {
            return spread;
        } else {
            return "PS";
        }
    }

    renderTransactions() {
        if (this.props.transactions.length) {
            console.log(this.props.transactions);
            return this.props.transactions.map(transaction => {
                let { type, bet } = transaction;
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
                    case 'deposit':
                        title = "Deposit";
                        icon = 'credit card outline';
                        break;
                    case 'withdrawal':
                        title = 'Withdrawal';
                        icon = 'shopping cart';
                        break;
                }

                var description = '';
                if (bet) {
                    var side, rubric;
                    var odds = convertEuroOdds(bet.odds);
                    var { bet_type } = bet;
                    if (bet_type == 'moneyline' || bet_type =='point_spread') {
                        side = bet.team;
                        if (bet_type == 'moneyline')
                            rubric = 'ML';
                        else
                            rubric = this.formatPointSpread(bet.point_spread);
                    } else {
                        side = bet.position;
                        side = side[0].toUpperCase() + side.slice(1); // capitalizes over and under
                        rubric = bet.over_under;
                    }
                    var gameDate = this.dateFormatShort(bet.game.unix_start_time);
                    description = `${side} ${rubric} (${odds}) ${gameDate}`;
                } else {
                    description = 'Account Transaction';
                }

                // gift or shopping basket for withdrawal
                // credit card for deposit

                let transactionDate = this.getTransactionDate(transaction.created_at, formatDate);
                var transactionAmount = transaction.amount;
                if (+transaction.amount > 0) {
                    transactionAmount = `+${transaction.amount}`;
                }
                
                return (
                    <div className="row" key={transaction.id}>
                        <div className="column">
                            <div className="ui list">
                                <div className="item">
                                    <i className={`${icon} icon`}></i>
                                    <div className="content">
                                        <div className="header" style={{marginBottom: '5px'}}>{title}</div>
                                        <div className="description">{description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right aligned column">
                            <div className="ui list">
                                <div className="item">
                                    <div className="content">
                                        <div className="header" style={{marginBottom: '5px'}}>{transactionDate}</div>
                                        <div className="description" style={{fontSize: '1.3em'}}>{transactionAmount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        } else {
            return <div className="row">No Transactions</div>;
        }
    }

    render() {
        let { retrieved, current_page, last_page} = this.props;
        var leftBtnsDisabled = false;
        var rightBtnsDisabled = false;
        if (current_page == '1')
            leftBtnsDisabled = true;
        if (current_page == last_page)
            rightBtnsDisabled = true;
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
                        <div className="ui two column grid">
                            <div className="column"><strong>Bankroll:</strong> ${this.props.bankroll}</div>
                            <div className="right aligned column"><strong>Money in Play:</strong> ${this.props.money_in_play}</div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{paddingTop: '0', paddingBottom: '0'}}>
                    <div className="twelve wide column">
                        <div className="ui divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="twelve wide column">
                        <Transition visible={!retrieved} animation='fade' duration={300}>
                            <div className="wrapper-div-that-disappears">
                                <div className="absolute-position-container loader-container">
                                    <div className="ui active massive text loader" style={{color: 'dodgerblue'}}>
                                        <strong>Loading</strong>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                        <Transition visible={retrieved} animation='fade' duration={300}>
                            <div className="absolute-position-container" style={{marginBottom: '150px'}}>
                                <div className="ui vertically divided two column grid">
                                    {this.renderTransactions()}
                                </div>
                                <div className="ui centered grid">
                                    <div className="row">
                                        <Link to="/transactions" className={`ui blue ${leftBtnsDisabled ? 'disabled' : ''} button`}>
                                            <i className="left chevron icon"></i>
                                        </Link>
                                        <Link to={this.props.prev_page_url} className={`ui blue ${leftBtnsDisabled ? 'disabled' : ''} button`}>Prev</Link>
                                        <Link to={this.props.next_page_url} className={`ui blue ${rightBtnsDisabled ? 'disabled' : ''} button`}>Next</Link>
                                        <Link to={this.props.last_page_url} className={`ui blue ${rightBtnsDisabled ? 'disabled' : ''} button`}>
                                            <i className="right chevron icon"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        transactions: state.transactions.transactions,
        retrieved: state.transactions.retrieved,
        bankroll: state.user.bankroll,
        money_in_play: state.user.money_in_play,
        loggedIn: state.auth.loggedIn,
        first_page_url: state.transactions.first_page_url,
        last_page_url: state.transactions.last_page_url,
        next_page_url: state.transactions.next_page_url,
        prev_page_url: state.transactions.prev_page_url,
        current_page: state.transactions.current_page,
        last_page: state.transactions.last_page
    };
};

export default connect(mapStateToProps, { deselectLeagues, fetchUserInfo, getTransactions, changeTransactionsPage, setLoggedIn })(Transactions);