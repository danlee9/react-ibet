import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Transition } from "semantic-ui-react";
import { deselectLeagues, fetchBets, changeBetsPage, setLoggedIn } from "../actions";
import BetBlock from './BetBlock';
import './Bets.css';
import history from '../history';

class Bets extends React.Component {
    constructor(props) {
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
        if (this.props.betsRetrieved) {
            this.props.changeBetsPage();
        }
        let { page } = this.props.match.params;
        this.props.deselectLeagues();
        this.props.fetchBets(page);
    }

    renderBets() {
        console.log(this.props.bets);
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
        let { betsRetrieved, current_page, last_page } = this.props;
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
                        {/* <div className="ui horizontal segments">
                            <div className="ui blue segment"><strong>Pending Bets</strong></div>
                            <div className="ui segment"><strong>Completed Bets</strong></div>
                        </div> */}
                        <div className="ui blue segment">
                            <strong>Previous Bets</strong>
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
                        <div className="absolute-position-container bet-blocks-container">
                            {this.renderBets()}
                            <div className="ui centered grid">
                                <div className="row">
                                    <Link to="/bets" className={`ui blue ${leftBtnsDisabled ? 'disabled' : ''} button`}>
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
        );
    }
}

const mapStateToProps = state => {
    return { 
        bets: state.bets.bets,
        betsRetrieved: state.bets.betsRetrieved,
        loggedIn: state.auth.loggedIn,
        first_page_url: state.bets.first_page_url,
        last_page_url: state.bets.last_page_url,
        next_page_url: state.bets.next_page_url,
        prev_page_url: state.bets.prev_page_url,
        current_page: state.bets.current_page,
        last_page: state.bets.last_page
    };
};

export default connect(mapStateToProps, {deselectLeagues, fetchBets, changeBetsPage, setLoggedIn})(Bets);