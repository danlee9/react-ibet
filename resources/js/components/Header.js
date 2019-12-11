import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './Header.css'
import history from '../history';
import { showMessage } from "../actions";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            league: null
        };
    }

    goToPage = (e, league) => {
        e.preventDefault();
        if (this.props.loggedIn) {
            history.push(`/games/${league}`);
        } else {
            this.props.showMessage('warning', 'Must be logged in to access page');
        }
    }

    render() {
        const { league } = this.props;
        return (
            <div className="ui centered padded grid leagues">
                <div className="row">
                    <div className="two wide center aligned column sports-league">
                        <Link to="/games/nfl" className={league == 'nfl' ? 'selected' : ''} onClick={(e) => this.goToPage(e, 'nfl')}>NFL</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/games/nba" className={league == 'nba' ? 'selected' : ''} onClick={(e) => this.goToPage(e, 'nba')}>NBA</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/games/mlb" className={league == 'mlb' ? 'selected' : ''} onClick={(e) => this.goToPage(e, 'mlb')}>MLB</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/games/nhl" className={league == 'nhl' ? 'selected' : ''} onClick={(e) => this.goToPage(e, 'nhl')}>NHL</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/games/cfb" className={league == 'cfb' ? 'selected' : ''} onClick={(e) => this.goToPage(e, 'cfb')}>CFB</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/games/cbb" className={league == 'cbb' ? 'selected' : ''} onClick={(e) => this.goToPage(e, 'cbb')}>CBB</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        league: state.games.league,
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(mapStateToProps, { showMessage })(Header);