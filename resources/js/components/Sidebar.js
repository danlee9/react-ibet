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
            <a className="item">
                <i className="block layout icon"></i>
                Topics
            </a>
            <a className="item">
                <i className="smile icon"></i>
                Friends
            </a>
        </div>,
        document.querySelector('#sidebar')
    );
}

export default Sidebar;