import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Transition } from "semantic-ui-react";
import { placeTransaction, showTransactionLoading, hideTransactionModal } from "../actions";
import './TransactionModal.css';

class TransactionModal extends React.Component {
    state = {
        amount: '',
        confirmShown: false,
        loading: false
    }

    hideTransactionModal = () => {
        this.setState({
            amount: "",
            toWin: "",
            confirmShown: false
        });
        this.props.hideTransactionModal();
    };

    inputPress = (e) => {
        let amount = e.target.value;
        this.setState({amount});
    }

    showConfirmButton = () => {
        this.setState({
            confirmShown: true
        });
    }

    placeTransaction(amount) {
        var type;
        if (this.props.transactionType == 'deposit') {
            type = 'deposit';
        } else {
            type = 'withdrawal';
            amount = -1 * amount;
        }
        let data = {
            amount,
            type
        };
        this.props.showTransactionLoading();
        this.props.placeTransaction(data);
    }

    render() {
        let { transactionType, transactionLoading, transactionPlaced } = this.props;
        let { amount } = this.state;
        if (transactionType)
            transactionType = transactionType[0].toUpperCase() + transactionType.slice(1);
        let modalStyle = {
            left: '50%',
            top: '25%',
            transform: 'translate(-50%, -50%)',
        };
        let buttonWidth = transactionType == 'deposit' ? '114px' : '126px';
        return ReactDOM.createPortal(
            <>
                <Transition visible={this.props.showTransactionModal} animation='fade' duration={400}>
                    <div className="ui active dimmer" style={{position: 'fixed', width: '100%', height: '100%', zIndex: 999}}></div>
                </Transition>
                <Transition visible={this.props.showTransactionModal} animation='scale' duration={400}>
                    <div onClick={this.hideTransactionModal} className="ui active" style={{position: 'fixed', width: '100%', height: '100%', zIndex: 1000}}>
                        <div onClick={e => e.stopPropagation()} className="ui mini modal active" style={modalStyle}>
                            <div className="header" style={{backgroundColor: 'rgb(73, 164, 232)', color: 'white', padding: '1rem 1.5rem'}}>
                                {/* <div className="ui two column grid">
                                    <div className="column"><strong>Bankroll:</strong> ${this.props.bankroll}</div>
                                </div> */}
                                <div className="ui grid">
                                    <div className="sixteen wide column"><strong>Bankroll:</strong> ${this.props.bankroll}</div>
                                </div>
                            </div>
                            <div className="content">
                                <span className="ui labeled input">
                                    <label htmlFor="amount" className="ui label">Amount $</label>
                                    <input
                                        type="number"
                                        value={this.state.amount}
                                        onChange={e => this.inputPress(e)}
                                        id="amount"
                                    />
                                </span>
                            </div>
                            <div className="actions transaction-actions">
                                <Transition visible={!this.state.confirmShown} animation='fade' duration={400}>
                                    <div style={{position: 'absolute', textAlign: 'right', width: '100%', padding: '1rem'}}>
                                        <button className="ui button" onClick={this.hideTransactionModal}>
                                            Cancel
                                        </button>
                                        <button
                                            onClick={this.showConfirmButton}
                                            className="ui blue basic button"
                                            style={{width: buttonWidth, textAlign: 'center'}}
                                        >                                    
                                            {transactionType} <i className="right chevron icon"></i>
                                        </button>
                                    </div>
                                </Transition>
                                <Transition visible={this.state.confirmShown} animation='fade' duration={400}>
                                    <div style={{position: 'absolute', textAlign: 'right', width: '100%', padding: '1rem'}}>
                                        <button className="ui button" onClick={this.hideTransactionModal}>
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => this.placeTransaction(amount)}
                                            className={`ui primary button ${transactionLoading ? 'loading' : ''}`}
                                            style={{width: buttonWidth, textAlign: 'center'}}
                                            disabled={transactionPlaced}
                                        >                                    
                                            {transactionPlaced ? 'Success!' : 'Confirm'}
                                        </button>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </Transition>
            </>,
            document.querySelector('#transaction-modal')
        );
    }
}

const mapStateToProps = state => {
    return {
        showTransactionModal: state.transactions.showTransactionModal,
        transactionType: state.transactions.transactionType,
        transactionLoading: state.transactions.transactionLoading,
        transactionPlaced: state.transactions.transactionPlaced,
        bankroll: state.user.bankroll
    };
};

export default connect(mapStateToProps, { placeTransaction, showTransactionLoading, hideTransactionModal })(TransactionModal);