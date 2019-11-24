import React from 'react';
import './TopRow.css';

class TopRow extends React.Component {
    constructor(props) {
        super(props);
    }

    renderButton() {
        return <img src="/img/hamburger-button.png" alt="" className="hamburger" onClick={this.props.open}/>;
    }

    render() {
        return (
            <div style={{padding: '10px'}}>
                {this.renderButton()}
            </div>
        );
    }
}

export default TopRow;