import React from 'react';
import { connect } from "react-redux";
import './TopRow.css';

class TopRow extends React.Component {
    constructor(props) {
        super(props);
    }

    renderButton() {
        let style, clickFunction;
        if (!this.props.loggedIn) {
            style = { opacity: 0.5 };
            clickFunction = () => {};
        } else {
            style = { opacity: 1 };
            clickFunction = this.props.open;
        }
        return <img src="/img/hamburger-button.png" alt="" className="hamburger" onClick={clickFunction} style={style}/>;
    }

    render() {
        return (
            <div style={{padding: '10px', position: "fixed", zIndex: '5'}} className="ui compact image segment">
                {this.renderButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { loggedIn: state.auth.loggedIn };
};

export default connect(mapStateToProps)(TopRow);