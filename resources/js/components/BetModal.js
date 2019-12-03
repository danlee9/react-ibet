import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Transition } from "semantic-ui-react";

import { showBetLoading, placeBet, hideBetModal } from "../actions";

class BetModal extends React.Component {
    state = {
        betAmount: "",
        toWin: "",
        confirmShown: false,
        loading: false
    }

    constructTitle(bet) {
        let { side, rubric, odds } = bet;
        if (side === 'over' || side === 'under')
            side = side[0].toUpperCase() + side.slice(1);
        else if (rubric !== 'ML')
            rubric = this.formatPointSpread(rubric);

        if (odds < 2) {
            let num = odds - 1;
            odds = "-" + Math.round((1 / num) * 100);
        } else {
            odds = "+" + Math.round((odds - 1) * 100);
        }
        return `${side} ${rubric} (${odds})`;
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

    hideBetModal = () => {
        this.setState({
            betAmount: "",
            toWin: "",
            confirmShown: false
        });
        this.props.hideBetModal();
    };

    showConfirmButton = () => {
        this.setState({
            confirmShown: true
        });
    }

    wagerInputPress = (e, odds) => {
        let betAmount = e.target.value;
        let toWin;
        if (betAmount != "") {
            betAmount = +betAmount;
            toWin = betAmount * (odds - 1);
        } else {
            toWin = "";
        }
        // betAmount = betAmount.toFixed(2);
        // toWin = toWin.toFixed(2);
        this.setState({ betAmount, toWin });
    };

    winInputPress = (e, odds) => {
        let toWin = e.target.value;
        let betAmount;
        if (toWin != "") {
            toWin = +toWin;
            betAmount = toWin / (odds - 1);
        } else {
            betAmount = "";
        }
        // betAmount = betAmount.toFixed(2);
        // toWin = toWin.toFixed(2);
        this.setState({ betAmount, toWin });
    };

    placeBet(bet, wager) {
        let { id, side, rubric, odds } = bet;
        let data;
        if (side === "over" || side === "under") {
            data = {
                id,
                bet_type: "over_under",
                over_under: rubric,
                position: side,
                odds,
                wager
            };
        } else if (rubric === "ML") {
            data = {
                id,
                bet_type: "moneyline",
                team: side,
                odds,
                wager
            };
        } else {
            data = {
                id,
                bet_type: "point_spread",
                team: side,
                spread: rubric,
                odds,
                wager
            };
        }
        console.log(data);
        this.props.showBetLoading();
        this.props.placeBet(data);
    }

    render() {
        let { selectedBet, betLoading, betPlaced } = this.props;
        let { betAmount, toWin } = this.state;
        let style = {
            left: '50%',
            top: '25%',
            transform: 'translate(-50%, -50%)',
        };

        //#a9d5de   #2185d0
        //rgb(169, 213, 222)
        //rgb(26, 105, 164)
        //#1a69a4
        //rgb(73, 164, 232)
        return ReactDOM.createPortal(
            <>
                <Transition visible={this.props.showBetModal} animation='fade' duration={400}>
                    <div className="ui active dimmer" style={{position: 'fixed', width: '100%', height: '100%', zIndex: 999}}></div>
                </Transition>
                <Transition visible={this.props.showBetModal} animation='scale' duration={400}>
                    <div onClick={this.hideBetModal} className="ui active" style={{position: 'fixed', width: '100%', height: '100%', zIndex: 1000}}>
                        <div onClick={e => e.stopPropagation()} className="ui small modal active" style={style}>
                            <div className="header" style={{backgroundColor: 'rgb(73, 164, 232)', color: 'white', padding: '1rem 1.5rem'}}>
                                <div className="ui two column grid">
                                    <div className="column">{this.constructTitle(selectedBet)}</div>
                                    {/* <div className="column"><p>Test</p></div> */}
                                </div>
                            </div>
                            <div className="content">
                                <span className="ui labeled input">
                                    <label htmlFor="risk" className="ui label">Risk $</label>
                                    <input
                                        type="number"
                                        value={betAmount}
                                        onChange={e => this.wagerInputPress(e, selectedBet.odds)}
                                        id="risk"
                                    />
                                    <label htmlFor="toWin" className="ui label">To Win $</label>
                                    <input
                                        type="number"
                                        value={toWin}
                                        onChange={e => this.winInputPress(e, selectedBet.odds)}
                                        id="toWin"
                                    />
                                </span>
                            </div>
                            <div className="actions" style={{position: 'relative', width: '100%', height: '4.5rem', padding: 0}}>
                                <Transition visible={!this.state.confirmShown} animation='fade' duration={400}>
                                    <div style={{position: 'absolute', textAlign: 'right', width: '100%', padding: '1rem'}}>
                                        <button className="ui button" onClick={this.hideBetModal} style={{width: '84px'}}>
                                            Cancel
                                        </button>
                                        <button
                                            onClick={this.showConfirmButton}
                                            className="ui blue basic button"
                                            style={{width: '95px', textAlign: 'center'}}
                                        >                                    
                                            BET <i className="right chevron icon"></i>
                                        </button>
                                    </div>
                                </Transition>
                                <Transition visible={this.state.confirmShown} animation='fade' duration={400}>
                                    <div style={{position: 'absolute', textAlign: 'right', width: '100%', padding: '1rem'}}>
                                        <button className="ui button" onClick={this.hideBetModal} style={{width: '84px'}}>
                                            {betPlaced ? 'Exit' : 'Cancel'}
                                        </button>
                                        <button
                                            onClick={() => this.placeBet(selectedBet, betAmount)}
                                            className={`ui primary button ${betLoading ? 'loading' : ''}`}
                                            style={{width: '95px', textAlign: 'center'}}
                                            disabled={betPlaced}
                                        >                                    
                                            {betPlaced ? 'Success!' : 'Confirm'}
                                        </button>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </Transition>
            </>,
            document.querySelector('#bet-modal')
        );
    }
}

// style={{position: 'absolute'}}
// style={{position: 'relative', width: '100%', height: '100%'}}

const mapStateToProps = state => {
    return {
        selectedBet: state.bets.selectedBet,
        showBetModal: state.bets.showBetModal,
        betLoading: state.bets.betLoading,
        betPlaced: state.bets.betPlaced
    };
};

export default connect(mapStateToProps, { showBetLoading, placeBet, hideBetModal })(BetModal);