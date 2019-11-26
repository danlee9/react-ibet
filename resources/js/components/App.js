import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Login from "./Login";
import Home from './Home';
import Bets from './Bets';
import Header from './Header';
import Menu from './Menu';
import Games from './Games';
import Transactions from './Transactions';
import history from "../history";
import TopRow from './TopRow';
import Sidebar from './Sidebar';
import Overlay from './Overlay';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    openSidebar = () => {
        if (this.state.open) {
            this.setState({ open: false });
        } else {
            this.setState({ open: true });
            let wrapper = document.querySelector('.overlay');
            wrapper.classList.toggle('active');
            wrapper.classList.toggle('dimmer');
        }
    }

    close = () => {
        this.setState({ open: false });
        let wrapper = document.querySelector('.overlay');
        wrapper.classList.toggle('active');
        wrapper.classList.toggle('dimmer');
    }

    render() {
        return (
            <div>
                <Overlay open={this.state.open} close={this.close}/>
                <TopRow open={this.openSidebar}/>
                <div className="ui container" id="main" style={{paddingTop: '60px'}}>
                    <Router history={history}>
                        <Route render={({location}) => (
                            <div>
                                <Sidebar open={this.state.open}/>
                                <Header />
                                <TransitionGroup className="transition-group">
                                    <CSSTransition key={location.key} timeout={300} classNames='fade'>
                                        <div className="route-section">
                                            <Switch location={location}>                                            
                                                <Route path="/" exact component={Login} />
                                                <Route path="/home" exact component={Home} />
                                                <Route path="/bets" exact component={Bets} />
                                                <Route path="/transactions" exact component={Transactions} />
                                                <Route path="/menu" exact component={Menu} />
                                                <Route path="/games/:league" component={Games} />
                                            </Switch>
                                        </div>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                            )}
                        />
                    </Router>
                    {/* <Router history={history}>
                        <Sidebar open={this.state.open}/>
                        <Header />
                        <Switch location={location}>                                            
                            <Route path="/" exact component={Login} />
                            <Route path="/home" exact component={Home} />
                            <Route path="/bets" exact component={Bets} />
                            <Route path="/transactions" exact component={Transactions} />
                            <Route path="/menu" exact component={Menu} />
                            <Route path="/games/:league" component={Games} />
                        </Switch>
                    </Router> */}
                </div>
            </div>
        );
    }
}

export default App;
