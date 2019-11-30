import React from "react";
import "./GameBlock.css";
import Modal from "./Modal";
import { connect } from "react-redux";
import { selectBet, placeBet } from "../actions";

class GameBlock extends React.Component {
    state = {
        showModal: false,
        data: {},
        betAmount: "",
        toWin: "",
        selectedBet: {
            id: null,
            side: null,
            rubric: null,
            odds: null
        }
    };

    toggleBlock = () => {
        const wrapper = document.querySelector(
            `.bet-info-${this.props.game.id}`
        );
        wrapper.classList.toggle("hidden");
        const wrapper2 = document.querySelector(
            `.game-block-${this.props.game.id}`
        );
        wrapper2.classList.toggle("stacked");
    };

    showBetModal = (id, side, rubric, odds) => {
        let bet = { id, side, rubric, odds };
        this.props.selectBet(bet);
        // this.setState({ showModal: true, selectedBet: bet });
    };

    renderDate(time) {
        let dateObj = new Date(time * 1000);
        let weekdayStr = dateObj
            .toLocaleDateString(undefined, { weekday: "short" })
            .toUpperCase();
        let dateStr = dateObj.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
        let timeStr = dateObj.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: true});
        return (
            <span>
                {`${weekdayStr} ${dateStr}`} <strong>{timeStr}</strong>
            </span>
        );
    }

    renderPointSpread(team, spread, odds) {
        let formattedSpread = this.formatPointSpread(spread);
        let convertedOdds = this.convertEuroOdds(odds);
        let pointSpread = `${team} ${formattedSpread} (${convertedOdds})`;
        return <div className="eight wide column">{pointSpread}</div>;
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

    renderMoneyline(team, odds) {
        let convertedOdds = this.convertEuroOdds(odds);
        let moneyline = `${team} ML (${convertedOdds})`;
        return <div className="eight wide column">{moneyline}</div>;
    }

    renderOverUnder(position, total, odds) {
        position = position[0].toUpperCase() + position.slice(1);
        if (!total) total = '';
        let convertedOdds = this.convertEuroOdds(odds);
        let overUnder = `${position} ${total} (${convertedOdds})`;
        return <div className="eight wide column">{overUnder}</div>
    }

    renderBetButtonArea(id, side, rubric, odds, bettingOpen) {
        let disabled = true;
        if (odds && bettingOpen) {
            disabled = false;
        }
        let classes = `ui button primary ${disabled ? "disabled" : ""}`;
        return (
            <div className="eight wide right aligned column">
                <button
                    disabled={disabled}
                    className={classes}
                    onClick={() => this.showBetModal(id, side, rubric, odds)}
                >
                    BET!
                </button>
            </div>
        );
    }

    convertEuroOdds(odds) {
        if (!odds) {
            return "N/A";
        }
        if (odds < 2) {
            let num = odds - 1;
            return "-" + Math.round((1 / num) * 100);
        } else {
            return "+" + Math.round((odds - 1) * 100);
        }
    }

    render() {
        let { game } = this.props;
        let {
            id,
            away_team,
            home_team,
            away_moneyline,
            home_moneyline,
            away_point_spread,
            home_point_spread,
            away_point_odds,
            home_point_odds,
            over_under,
            over_odds,
            under_odds
        } = game;
        let topText = "N/A";
        let bottomText = "N/A";
        if (away_point_spread) {
            if (+away_point_spread < 0) {
                topText = away_point_spread;
                if (over_under) bottomText = `T:${over_under}`;
            } else {
                if (over_under) topText = `T:${over_under}`;
                bottomText = home_point_spread;
            }
        }
        let date = new Date();
        let bettingOpen = true;
        if (game.unix_start_time * 1000 < date.getTime()) {
            bettingOpen = false;
        }
        return (
            <div className={`game-block game-block-${id} ui stacked segments`}>
                <div
                    className={`game-info ui ${bettingOpen ? 'blue' : 'black'} segment`}
                    onClick={this.toggleBlock}
                >
                    <div className="ui grid">
                        <div className="row">
                            <div className="eight wide column">
                                <strong>{bettingOpen ? 'Betting Open' : 'Betting Closed'}</strong>
                            </div>
                            <div className="right aligned eight wide column">
                                {this.renderDate(game.unix_start_time)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="eight wide column">{away_team}</div>
                            <div className="eight wide right aligned column">
                                <strong>{topText}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="eight wide column">{home_team}</div>
                            <div className="eight wide right aligned column">
                                <strong>{bottomText}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`bet-info hidden bet-info-${id} ui segment`}>
                    <div className="ui middle aligned grid">
                        <div className="row">
                            {this.renderPointSpread(away_team, away_point_spread, away_point_odds)}
                            {this.renderBetButtonArea(id, away_team, away_point_spread, away_point_odds, bettingOpen)}
                        </div>
                        <div className="row">
                            {this.renderPointSpread(home_team, home_point_spread, home_point_odds)}
                            {this.renderBetButtonArea(id, home_team, home_point_spread, home_point_odds, bettingOpen)}
                        </div>
                        <div className="row">
                            {this.renderMoneyline(away_team, away_moneyline)}
                            {this.renderBetButtonArea(id, away_team, 'ML', away_moneyline, bettingOpen)}
                        </div>
                        <div className="row">
                            {this.renderMoneyline(home_team, home_moneyline)}
                            {this.renderBetButtonArea(id, home_team, 'ML', home_moneyline, bettingOpen)}
                        </div>
                        <div className="row">
                            {this.renderOverUnder("over", over_under, over_odds)}
                            {this.renderBetButtonArea(id, "over", over_under, over_odds, bettingOpen)}
                        </div>
                        <div className="row">
                            {this.renderOverUnder("under", over_under, under_odds)}
                            {this.renderBetButtonArea(id, "under", over_under, under_odds, bettingOpen)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { selectBet, placeBet })(GameBlock);
