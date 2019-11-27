import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

const Sidebar = props => {
    let classes = `ui left demo vertical inverted sidebar push pull labeled icon menu ${props.open ? 'visible' : ''}`;
    return ReactDOM.createPortal(
        <div className={classes}>
            <Link className="item" to="/home">
                <i className="home icon"></i>
                Home
            </Link>
            <Link className="item" to="/games/nfl">
                <i class="football ball icon"></i>
                Games
            </Link>
            <Link className="item" to="/bets">
                <i class="archive icon"></i>
                Bets
            </Link>
            <Link className="item" to="/transactions">
                <i class="credit card icon"></i>
                Transactions
            </Link>
            <a className="item" onClick={props.logOut}>
                <i className="sign-out icon"></i>
                Sign Out
            </a>
        </div>,
        document.querySelector('#sidebar')
    );
}

export default Sidebar;