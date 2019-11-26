import React from 'react';
import ReactDOM from 'react-dom';
import './Overlay.css';

const Overlay = props => {
    let classes = `ui overlay ${props.open ? 'show dimmer active' : ''}`;
    return ReactDOM.createPortal(
        <div className={classes} onClick={props.close} style={{position: 'fixed'}}>
            <div className="ui massive text loader" style={{color: 'dodgerblue'}}>
                <strong>Loading</strong>
            </div>
        </div>,
        document.querySelector('#overlay')
    );
}

export default Overlay;