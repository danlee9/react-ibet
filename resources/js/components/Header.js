import React from 'react';
import { Link } from "react-router-dom";
import './Header.css'

class Header extends React.Component {
    logOut() {
        axios.post('/logout').then(res => {
            console.log(res);
            location.reload();
        });
        // console.log('hello');
    }

    render() {
        return (
            <div className="ui padded grid leagues">
                <div className="row">
                    <div className="two wide column sports-league"></div>
                    <div className="two wide column sports-league"><Link to="/games/nfl">NFL</Link></div>
                    <div className="two wide column sports-league"><Link to="/games/nba">NBA</Link></div>
                    <div className="two wide column sports-league">MLB</div>
                    <div className="two wide column sports-league">NHL</div>
                    <div className="two wide column sports-league">CFB</div>
                    <div className="two wide column sports-league">CBB</div>
                    <div className="two wide column sports-league"></div>
                </div>
            </div>
        );
    }
}

export default Header;