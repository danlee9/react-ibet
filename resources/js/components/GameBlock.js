import React from "react";
import "./GameBlock.css";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { selectBet, placeBet } from "../actions";
import { formatDate } from "../utilities";

class GameBlock extends React.Component {
    state = {
        showBlock: false,
        betAmount: "",
        toWin: "",
        btn1: <span>Test</span>,
        btn2: <span>Test</span>,
        btn3: <span>Test</span>,
        btn4: <span>Test</span>,
        btn5: <span>Test</span>,
        btn6: <span>Test</span>,
        loaded: false
    };

    // timeOut = 'placeholder'; // no longer this time container to clear because you fixed the leak

    toggleBlock = () => {
        this.setState({
            showBlock: !this.state.showBlock
        });
    };

    showBetModal = (id, side, rubric, odds) => {
        let bet = { id, side, rubric, odds };
        this.props.selectBet(bet);
    };

    renderDate(time, dateFunc) {
        let dateInput = time * 1000;
        return dateFunc(dateInput);
    }

    renderPointSpread(team, spread, odds) {
        let formattedSpread = this.formatPointSpread(spread);
        let convertedOdds = this.convertEuroOdds(odds);
        let pointSpread = `${team} ${formattedSpread} (${convertedOdds})`;
        return <div className="eight wide column">{pointSpread}</div>;
    }

    formatPointSpread(spread) {
        // ==========DATA_TYPE_CHANGE========
        // if (spread && spread[0] !== "-") {
        //     return `+${spread}`;
        // } else if (spread) {
        //     return spread;
        // } else {
        //     return "PS";
        // }
        if (spread && spread > 0) {
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

    renderBetButtonArea = (id, side, rubric, odds, bettingOpen) => {
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

    // setAsyncTimeout = (cb, timeout = 0) => new Promise(resolve => {
    //     setTimeout(() => {
    //         cb();
    //         resolve();
    //     }, timeout);
    // });

    renderAllBets = async (game, bettingOpen) => {
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
        var btn1, btn2, btn3, btn4, btn5, btn6;
        // const btns = await new Promise(resolve => {
        //     this.timeOut = setTimeout(() => {
        //         btn1 = this.renderBetButtonArea(id, away_team, away_point_spread, away_point_odds, bettingOpen);
        //         btn2 = this.renderBetButtonArea(id, home_team, home_point_spread, home_point_odds, bettingOpen);
        //         btn3 = this.renderBetButtonArea(id, away_team, 'ML', away_moneyline, bettingOpen);
        //         btn4 = this.renderBetButtonArea(id, home_team, 'ML', home_moneyline, bettingOpen);
        //         btn5 = this.renderBetButtonArea(id, "over", over_under, over_odds, bettingOpen);
        //         btn6 = this.renderBetButtonArea(id, "under", over_under, under_odds, bettingOpen);
        //         resolve({btn1, btn2, btn3, btn4, btn5, btn6})
        //     }, 750)
        // });
        const btns = await new Promise(resolve => {
            setTimeout(() => {
                btn1 = this.renderBetButtonArea(id, away_team, away_point_spread, away_point_odds, bettingOpen);
                btn2 = this.renderBetButtonArea(id, home_team, home_point_spread, home_point_odds, bettingOpen);
                btn3 = this.renderBetButtonArea(id, away_team, 'ML', away_moneyline, bettingOpen);
                btn4 = this.renderBetButtonArea(id, home_team, 'ML', home_moneyline, bettingOpen);
                btn5 = this.renderBetButtonArea(id, "over", over_under, over_odds, bettingOpen);
                btn6 = this.renderBetButtonArea(id, "under", over_under, under_odds, bettingOpen);
                resolve({btn1, btn2, btn3, btn4, btn5, btn6})
            }, 1500)
        });
        this.setState({...btns, loaded: true})
    }

    // componentWillUnMount() {
    //     clearTimeout(this.timeOut); // no longer needed because you find the leak
    // }

    getDateFromUnix(timestamp) {
        let a = new Date(timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let time = date + ' ' + month + ' ' + year;
        return time;
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
        var awayImgSrc, homeImgSrc;
        game.teams.forEach(team => {
            if (team.full_name === away_team) {
                awayImgSrc = `/img/${team.image_source}`;
            } else if (team.full_name === home_team) {
                homeImgSrc = `/img/${team.image_source}`;
            }
        });
        // have to check for this otherwise this.renderAllBets will run infinitely
        if (!this.state.loaded)
            this.renderAllBets(game, bettingOpen);

        return (
            <div className={`game-block game-block-${id} ui segments`}>
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
                                {this.renderDate(game.unix_start_time, formatDate)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="eight wide column">
                                <img className="ui middle aligned image" src={awayImgSrc} style={{height: '40px', marginRight: '7px'}} />
                                <span style={{fontSize: '16px', display: 'inline-block', height: '40px', lineHeight: '40px'}}>{away_team}</span>
                            </div>
                            <div className="eight wide right aligned column">
                                <strong style={{fontSize: '16px', display: 'inline-block', height: '40px', lineHeight: '40px'}}>{topText}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="eight wide column">
                                <img className="ui middle aligned image" src={homeImgSrc} style={{height: '40px', marginRight: '7px'}} />
                                <span style={{fontSize: '16px', display: 'inline-block', height: '40px', lineHeight: '40px'}}>{home_team}</span>
                            </div>
                            <div className="eight wide right aligned column">
                                <strong style={{fontSize: '16px', display: 'inline-block', height: '40px', lineHeight: '40px'}}>{bottomText}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <CSSTransition in={this.state.showBlock} classNames='slide' timeout={300}>
                    <div className={`bet-info bet-info-${id} ui segment`}>
                        <div className="ui middle aligned vertically padded grid">
                            {/* <div className="row">
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
                            </div> */}
                            <div className="row">
                                {this.renderPointSpread(away_team, away_point_spread, away_point_odds)}
                                {this.state.btn1}
                            </div>
                            <div className="row">
                                {this.renderPointSpread(home_team, home_point_spread, home_point_odds)}
                                {this.state.btn2}
                            </div>
                            <div className="row">
                                {this.renderMoneyline(away_team, away_moneyline)}
                                {this.state.btn3}
                            </div>
                            <div className="row">
                                {this.renderMoneyline(home_team, home_moneyline)}
                                {this.state.btn4}
                            </div>
                            <div className="row">
                                {this.renderOverUnder("over", over_under, over_odds)}
                                {this.state.btn5}
                            </div>
                            <div className="row">
                                {this.renderOverUnder("under", over_under, under_odds)}
                                {this.state.btn6}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default connect(null, { selectBet, placeBet })(GameBlock);
