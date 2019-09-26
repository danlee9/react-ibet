import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from './Home';
import Test from './Test';
import history from "../history";
import Header from './Header';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/test" exact component={Test} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
