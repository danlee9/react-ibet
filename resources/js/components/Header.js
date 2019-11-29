import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            league: null
        };
    }

    render() {
        const { league } = this.props;
        return (
            <div className="ui centered padded grid leagues">
                <div className="row">
                    <div className="two wide center aligned column sports-league">
                        <Link to="/games/nfl" className={league == 'nfl' ? 'selected' : ''}>NFL</Link>
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
    return { league: state.games.league };
};

export default connect(mapStateToProps)(Header);