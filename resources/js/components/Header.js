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
            <div className="ui centered padded grid leagues">
                <div className="row">
                    <div className="two wide center aligned column sports-league"><Link to="/games/nfl">NFL</Link></div>
                    <div className="two wide center aligned column sports-league"><Link to="/games/nba">NBA</Link></div>
                    <div className="two wide center aligned column sports-league"><Link to="/">MLB</Link></div>
                    <div className="two wide center aligned column sports-league"><Link to="/">NHL</Link></div>
                    <div className="two wide center aligned column sports-league"><Link to="/">CFB</Link></div>
                    <div className="two wide center aligned column sports-league"><Link to="/">CBB</Link></div>
                </div>
            </div>
        );
    }
}

export default Header;