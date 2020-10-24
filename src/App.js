import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './static/scss/app.css';
import AddContractor from "./components/AddContractor";
import Select from "./components/Select";
import AddTrader from "./components/AddTrader";

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
                                    <Select type="contractor"/>
                                    <Select type="trader"/>
                                </div>
                            </Route>
                            <Route exact path="/dodaj_kontrahenta">
                                <h1 className="container__headline container__headline--1">
                                    Dodaj kontrahenta
                                </h1>
                                <AddContractor/>
                            </Route>
                            <Route exact path="/dodaj_sprzedawce">
                                <h1 className="container__headline container__headline--1">
                                    Dodaj sprzedawce
                                </h1>
                                <AddTrader/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;