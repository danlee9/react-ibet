import React from 'react';
import { connect } from "react-redux";
import { deselectLeagues, fetchBets, setLoggedIn } from "../actions";
import BetBlock from './BetBlock';

class Bets extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        if (!sessionStorage.getItem("id")) {
            history.push("/");
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
        this.props.fetchBets();
    }

    renderBets() {
        console.log(this.props.bets);
        if (this.props.bets) {
            // return this.props.bets.map(bet => {
            //     let game = `${bet.game.away_team} at ${bet.game.home_team}`;
            //     let side, rubric;
            //     let odds = this.convertEuroOdds(bet.odds);
            //     let { bet_type } = bet;
            //     if (bet_type == 'moneyline' || bet_type =='point_spread') {
            //         side = bet.team;
            //         if (bet_type == 'moneyline')
            //             rubric = 'ML';
            //         else
            //             rubric = bet.point_spread;
            //     } else {
            //         side = bet.position;
            //         rubric = bet.over_under;
            //     }
            //     return (
            //         <div key={bet.id} style={{border: '1px solid black'}}>
            //             <p><strong>{game}</strong></p>
            //             <p>{side} {rubric} ({odds}) status: {bet.status}</p>
            //         </div>
            //     );
            // });
            // this.props.bets.reverse();
            return this.props.bets.map(bet => {
                return <BetBlock bet={bet} key={bet.id} />
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
            <div className="ui centered grid">
                <div className="row">
                    <div className="eight wide column center aligned">
                        <div className="ui horizontal segments">
                            <div className="ui blue segment"><strong>Pending Bets</strong></div>
                            <div className="ui segment"><strong>Completed Bets</strong></div>
                        </div>
                    </div>
                </div>
                <div className="twelve wide column">
                    {this.renderBets()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        bets: state.bets,
        loggedIn: state.auth.loggedIn 
    };
};

export default connect(mapStateToProps, {deselectLeagues, fetchBets, setLoggedIn})(Bets);