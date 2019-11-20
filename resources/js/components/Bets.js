import React from 'react';
import { connect } from "react-redux";
import { fetchBets } from "../actions";

class Bets extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        if (!sessionStorage.getItem("id")) {
            history.push("/");
        }
    }

    componentDidMount() {
        this.props.fetchBets();
    }

    renderBets() {
        console.log(this.props.bets);
        if (this.props.bets) {
            return this.props.bets.map(bet => {
                let game = `${bet.game.away_team} at ${bet.game.home_team}`;
                let side, rubric;
                let odds = this.convertEuroOdds(bet.odds);
                let bet_type = { bet };
                if (bet_type == 'moneyline' || bet_type =='point_spread') {
                    side = bet.team;
                    if (bet_type == 'moneyline')
                        rubric = 'ML';
                    else
                        rubric = bet.point_spread;
                } else {
                    side = bet.position;
                    rubric = bet.over_under;
                }
                return <p key={bet.id}>{game} {side} {rubric} {odds}</p>
            });
        } else {
            return "Loading...";
        }
    }

    convertEuroOdds(odds) {
        if (odds < 2) {
            let num = odds - 1;
            return '-' + Math.round((1/num) * 100);
        } else {
            return '+' + Math.round((odds - 1) * 100);
        }
    }

    render() {
        return (
            <div>
                {this.renderBets()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { bets: state.bets };
};

export default connect(mapStateToProps, {fetchBets})(Bets);