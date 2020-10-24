import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './static/scss/app.css';
import AddContractor from "./components/AddContractor";
import Contractor from "./components/Contractor";

class App extends Component {
    render = () => {
        return (
            <div className="app">
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path="/" >
                                <div>
                                    <h1 className="container__headline container__headline--1">
                                        Wystaw dokument
                                    </h1>
                                    <Contractor/>
                                </div>
                            </Route>
                            <Route exact path="/dodaj_kontrahenta">
                                <h1 className="container__headline container__headline--1">
                                    Dodaj kontrahenta
                                </h1>
                                <AddContractor/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;