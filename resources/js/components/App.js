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
import TopRow from './TopRow';
import Sidebar from './Sidebar';
import Overlay from './Overlay';

// const App = () => {
//     return (
//         <div>
//             <TopRow />
//             <div className="ui container" id="main">
//                 <Router history={history}>
//                     <Header />
//                     <Switch>
//                         <Route path="/" exact component={Login} />
//                         <Route path="/home" exact component={Home} />
//                         <Route path="/bets" exact component={Bets} />
//                         <Route path="/transactions" exact component={Transactions} />
//                         <Route path="/menu" exact component={Menu} />
//                         <Route path="/games/:league" component={Games} />
//                     </Switch>
//                 </Router>
//             </div>
//         </div>
//     );
// };

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
        }
    }

    close = () => {
        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <Overlay open={this.state.open} close={this.close}/>
                <TopRow open={this.openSidebar}/>
                <div className="ui container" id="main">
                    <Router history={history}>
                        <Sidebar open={this.state.open}/>
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
            </div>
        );
    }
}

export default App;
