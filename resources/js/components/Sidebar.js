import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

const Sidebar = props => {
    let classes = `ui left demo vertical inverted sidebar push pull labeled icon menu ${props.open ? 'visible' : ''}`;
    return ReactDOM.createPortal(
        <div className={classes}>
            <Link className="item" to="/home" onClick={props.close}>
                <i className="home icon"></i>
                Home
            </Link>
            <Link className="item" to="/games/nfl" onClick={props.close}>
                <i className="football ball icon"></i>
                Games
            </Link>
            <Link className="item" to="/bets" onClick={props.close}>
                {/* <i className="archive icon"></i> */}
                <i className="chart line icon"></i>
                Bets
            </Link>
            <Link className="item" to="/transactions" onClick={props.close}>
                <i className="credit card icon"></i>
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