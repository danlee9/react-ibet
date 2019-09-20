import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Test from './Test';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Making changes</div>

                            <div className="card-body"><Test/></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}