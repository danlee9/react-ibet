import React from 'react';
import ReactDOM from 'react-dom';
import './Overlay.css';

const Overlay = props => {
    let classes = `overlay ${props.open ? 'show' : ''}`;
    return ReactDOM.createPortal(
        <div className={classes} onClick={props.close}></div>,
        document.querySelector('#overlay')
    );
}

export default Overlay;