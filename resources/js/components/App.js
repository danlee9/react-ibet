import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Login from "./Login";
import Home from './Home';
import Bets from './Bets';
import Header from './Header';
import Menu from './Menu';
import Games from './Games';
import Transactions from './Transactions';
import history from "../history";

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/bets" exact component={Bets} />
                    <Route path="/transactions" exact component={Transactions} />
                    <Route path="/menu" exact component={Menu} />
                    <Route path="/games/:league" component={Games} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
