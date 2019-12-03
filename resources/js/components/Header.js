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
                        <Link to="/games/nba" className={league == 'nba' ? 'selected' : ''}>NBA</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/">MLB</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/">NHL</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/">CFB</Link>
                    </div>
                    <div className="two wide center aligned column sports-league">
                        <Link to="/">CBB</Link>
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