import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './Overlay.css';

const Overlay = props => {
    let classes = `ui overlay ${props.open ? 'show dimmer active' : ''}`;
    return ReactDOM.createPortal(
        <TransitionGroup>
            <CSSTransition timeout={300} classNames='fade'>
                <div className={classes} onClick={props.close} style={{position: 'fixed'}}>
                    <div className="ui massive text loader" style={{color: 'dodgerblue'}}>
                        <strong>Loading</strong>
                    </div>
                </div>
            </CSSTransition>
        </TransitionGroup>,
        document.querySelector('#overlay')
    );
}

export default Overlay;