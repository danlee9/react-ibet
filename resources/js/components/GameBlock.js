import React from 'react';
import './GameBlock.css'
import Modal from './Modal';
import { connect } from "react-redux";
import { placeBet } from "../actions";

class GameBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            data: {},
            betAmount: '',
            toWin: '',
            selectedBet: {
                id: null,
                side: null,
                rubric: null,
                odds: null
            }
        };
    }

    toggleBlock = () => {
        console.log('toggling');
        const wrapper = document.querySelector(`.id-${this.props.game.id}`);
        wrapper.classList.toggle('hidden');
    }

    renderBetModal(bet) {
        let { side, rubric, odds } = bet;
        let title = `${side} ${rubric} (${this.convertEuroOdds(odds)})`;
        if (this.state.showModal) {
            return (
                <Modal 
                    title={title}
                    content={this.renderContent(odds)}
                    actions={this.renderActions(bet)}
                    onDismiss={this.hideBetModal}
                />
            );
        }
    }

    renderContent(odds) {
        return (
            <span>Risk <input type="number" value={this.state.betAmount} onChange={(e) => this.wagerInput(e, odds)}/>
            to Win <input type="number" value={this.state.toWin} onChange={(e) => this.winInput(e, odds)}/></span>
        );
    }

    wagerInput = (e, odds) => {
        let betAmount = e.target.value;
        let toWin;
        if (betAmount != '') {
            betAmount = +betAmount;
            toWin = betAmount * (odds - 1);
        } else {
            toWin = '';
        }
        // betAmount = betAmount.toFixed(2);
        // toWin = toWin.toFixed(2);
        this.setState({ betAmount, toWin });
    }

    winInput = (e, odds) => {
        let toWin = e.target.value;
        let betAmount;
        if (toWin != '') {
            toWin = +toWin;
            betAmount = toWin * (odds - 1);
        } else {
            betAmount = '';
        }
        // betAmount = betAmount.toFixed(2);
        // toWin = toWin.toFixed(2);
        this.setState({ betAmount, toWin });
    }

    renderActions(bet) {
        return (
            <>
                <button onClick={() => this.placeBet(bet, this.state.betAmount)} className="ui primary button">BET!!!</button>
                {/* <Link to="/" className="ui button">Cancel</Link> */}
                <button className="ui button" onClick={this.hideBetModal}>Cancel</button>
            </>
        );
    }

    showBetModal = (id, side, rubric, odds) => {
        let bet = { id, side, rubric, odds }
        this.setState({ showModal: true, selectedBet: bet });
    }

    hideBetModal = () => {
        this.setState({ showModal: false, selectedBet: {
            id: null,
            side: null,
            rubric: null,
            odds: null
        }});
    }

    placeBet(bet, wager) {
        let { id, side, rubric, odds } = bet;
        let data;
        if (side === "over" || side === "under") {
            data = {
                id,
                bet_type: 'over_under',
                over_under: rubric,
                position: side,
                odds,
                wager
            }
        } else if (rubric === 'ML') {
            data = {
                id,
                bet_type: 'moneyline',
                team: side,
                odds,
                wager
            }
        } else {
            data = {
                id,
                bet_type: 'point_spread',
                team: side,
                spread: rubric,
                odds,
                wager
            }
        }
        console.log(data);
        // let token = sessionStorage.getItem('token');
        // axios.post(`/api/bets?api_token=${token}`, data).then(res => {
        //     console.log(res);
        // });
        this.props.placeBet(data);
    }

    renderDate(time) {
        let date = new Date(time * 1000);
        return date.toLocaleString();
    }

    renderPointSpread(id, team, spread, odds) {
        let formattedSpread = this.formatPointSpread(spread);
        let convertedOdds = this.convertEuroOdds(odds);
        return <div>{team} {formattedSpread} ({convertedOdds}) {this.renderBetArea(id, team, spread, odds)}</div>
    }

    formatPointSpread(spread) {
        if (spread && spread[0] !== '-') {
            return `+${spread}`;
        } else if (spread) {
            return spread;
        } else {
            return "N/A";
        }
    }

    renderMoneyline(id, team, odds) {
        let convertedOdds = this.convertEuroOdds(odds);
        return <div>{team} ML ({convertedOdds}) {this.renderBetArea(id, team, 'ML', odds)}</div>
    }

    renderOverUnder(id, position, total = "N/A", odds) {
        let convertedOdds = this.convertEuroOdds(odds);
        return <div>{position} {total} ({convertedOdds}) {this.renderBetArea(id, position, total, odds)}</div>
    }

    renderBetArea(id, side, rubric, odds) {
        let disabled = !odds; // will return true if no odds
        return <button disabled={disabled} onClick={() => this.showBetModal(id, side, rubric, odds)}>BET!</button>;
    }

    convertEuroOdds(odds) {
        if (!odds) {
            return "N/A";
        }
        if (odds < 2) {
            let num = odds - 1;
            return '-' + Math.round((1/num) * 100);
        } else {
            return '+' + Math.round((odds - 1) * 100);
        }
    }

    render() {
        let { game } = this.props;
        let { id } = game;
        let convert = this.convertEuroOdds;
        return (
            <div className="game-block">
                <div className="game-info" onClick={this.toggleBlock}>
                    <div>{this.renderDate(game.unix_start_time)}</div>
                    <div>{game.away_team}</div>
                    <div>{game.home_team}</div>
                </div>
                <div className="ui divider"></div>
                <div className={`bet-info hidden id-${id}`}>
                    {/* <div>{game.away_team} {this.formatPointSpread(game.away_point_spread)} ({convert(game.away_point_odds)}) <button>BET</button></div>
                    <div>{game.home_team} {this.formatPointSpread(game.home_point_spread)} ({convert(game.home_point_odds)}) <button>BET</button></div>
                    <div>{game.away_team} ML ({convert(game.away_moneyline)}) <button>BET</button></div>
                    <div>{game.home_team} ML ({convert(game.home_moneyline)}) <button>BET</button></div>
                    <div>OVER {game.over_under || "N/A"} ({convert(game.over_odds)}) <button>BET</button></div>
                    <div>UNDER {game.over_under || "N/A"} ({convert(game.under_odds)}) <button>BET</button></div> */}
                    {this.renderPointSpread(id, game.away_team, game.away_point_spread, game.away_point_odds)}
                    {this.renderPointSpread(id, game.home_team, game.home_point_spread, game.home_point_odds)}
                    {this.renderMoneyline(id, game.away_team, game.away_moneyline)}
                    {this.renderMoneyline(id, game.home_team, game.home_moneyline)}
                    {this.renderOverUnder(id, "over", game.over_under, game.over_odds)}
                    {this.renderOverUnder(id, "under", game.over_under, game.under_odds)}
                    {this.renderBetModal(this.state.selectedBet)}
                </div>
            </div>
        );
    }
}

export default connect(null, { placeBet })(GameBlock);