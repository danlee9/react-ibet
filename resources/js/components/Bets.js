import React from 'react';
import { connect } from "react-redux";
import { Transition } from "semantic-ui-react";
import { deselectLeagues, fetchBets, setLoggedIn } from "../actions";
import BetBlock from './BetBlock';
import './Bets.css';
import history from '../history';

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
        return this.props.bets.map(bet => {
            return <BetBlock bet={bet} key={bet.id} />
        });
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
        let { betsRetrieved } = this.props;
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
                <div className="twelve wide column bets-container">
                    <Transition visible={!betsRetrieved} animation='fade' duration={300}>
                        <div className="wrapper-div-that-disappears">
                            <div className="absolute-position-container loader-container">
                                <div className="ui active massive text loader" style={{color: 'dodgerblue'}}>
                                    <strong>Loading</strong>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <Transition visible={betsRetrieved} animation='fade up' duration={300}>
                        <div className="absolute-position-container">
                            {this.renderBets()}
                        </div>
                    </Transition>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        bets: state.bets.bets,
        betsRetrieved: state.bets.betsRetrieved,
        loggedIn: state.auth.loggedIn
    };
};

export default connect(mapStateToProps, {deselectLeagues, fetchBets, setLoggedIn})(Bets);