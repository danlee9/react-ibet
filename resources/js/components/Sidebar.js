import React from 'react';
import ReactDOM from 'react-dom';

const Sidebar = props => {
    let classes = `ui left demo vertical inverted sidebar push labeled icon menu ${props.open ? 'visible' : ''}`;
    return ReactDOM.createPortal(
        <div className={classes}>
            <a className="item">
                <i className="home icon"></i>
                Home
            </a>
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