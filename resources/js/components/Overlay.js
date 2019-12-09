import React from 'react';
import ReactDOM from 'react-dom';
import { Transition } from "semantic-ui-react";
import './Overlay.css';

const Overlay = props => {
    let classes = `ui overlay ${props.open ? 'show dimmer active' : ''}`;
    return ReactDOM.createPortal(
        <Transition visible={props.open} animation='fade' duration={400}>
            <div className={classes} onClick={props.close} style={{position: 'fixed'}}>
                <div className={`ui massive text loader ${props.loading ? '' : 'hidden'}`} style={{color: 'dodgerblue'}}>
                    <strong>Loading</strong>
                </div>
            </div>
        </Transition>,
        document.querySelector('#overlay')
    );
}

export default Overlay;