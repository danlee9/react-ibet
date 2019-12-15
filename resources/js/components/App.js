import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { openSidebar, closeOverlay, logOut } from "../actions";

import Login from "./Login";
import Register from './Register';
import Home from './Home';
import Bets from './Bets';
import Header from './Header';
import Games from './Games';
import Transactions from './Transactions';
import history from "../history";
import TopRow from './TopRow';
import Sidebar from './Sidebar';
import Overlay from './Overlay';
import BetModal from './BetModal';
import TransactionModal from './TransactionModal';
import './App.css';

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         open: false
    //     };
    // }

    state = {
        open: false
    }

    openSidebar = () => {
        // if (this.state.open) {
        //     this.setState({ open: false });
        // } else {
        //     this.setState({ open: true });
        //     // let wrapper = document.querySelector('.overlay');
        //     // wrapper.classList.toggle('active');
        //     // wrapper.classList.toggle('dimmer');
        // }
        this.props.openSidebar();
    }

    close = () => {
        // this.setState({ open: false });
        // let wrapper = document.querySelector('.overlay');
        // wrapper.classList.toggle('active');
        // wrapper.classList.toggle('dimmer');
        if (!this.props.showLoading) {
            this.props.closeOverlay();
        }
    }

    logOut = () => {
        this.props.logOut();
    }

    render() {
        return (
            <div>
                <TopRow open={this.openSidebar}/>
                <Overlay open={this.props.showOverlay} loading={this.props.showLoading} close={this.close}/>
                <div className="ui container" id="main" style={{paddingTop: '60px'}}>
                    <Router history={history}>
                        <Route render={({location}) => (
                            <div>
                                <Sidebar open={this.props.showSideBar} logOut={this.logOut} close={this.close}/>
                                <Header />
                                <TransitionGroup className="transition-group">  
                                    <CSSTransition key={location.key} timeout={300} classNames='fade'>
                                        <div className="route-section">
                                            <Switch location={location}>                                            
                                                <Route path="/" exact component={Login} />
                                                {/* <Route path="/login" exact component={Login} /> */}
                                                <Route path="/register" exact component={Register} />
                                                <Route path="/home" exact component={Home} />
                                                <Route path="/bets" exact component={Bets} />
                                                <Route path="/bets/:page" exact component={Bets} />
                                                <Route path="/transactions" exact component={Transactions} />
                                                <Route path="/transactions/:page" exact component={Transactions} />
                                                <Route path="/games/:league" component={Games} />
                                            </Switch>
                                        </div>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                            )}
                        />
                    </Router>
                </div>
                <BetModal />
                <TransactionModal />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        showOverlay: state.modules.showOverlay,
        showSideBar: state.modules.showSidebar,
        showLoading: state.modules.showLoading
    };
};

export default connect(mapStateToProps, { openSidebar, closeOverlay, logOut })(App);
