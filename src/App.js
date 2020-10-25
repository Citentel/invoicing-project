import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './static/scss/app.css';
import Select from "./components/Select";
import AddSelect from "./components/AddSelect";
import Products from "./components/Products";
import Info from "./components/Info";
import Checker from "./components/Checker";
import Document from "./components/Document";

class App extends Component {

    restart = () => {
        localStorage.clear();
        sessionStorage.clear();
        this.setState(this.state);
    }

    render = () => {
        return (
            <div className="app">
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path="/" >
                                <div>
                                    <p className="container__restart" onClick={this.restart}>Restart App</p>
                                    <h1 className="container__headline container__headline--1">
                                        Wystaw dokument
                                    </h1>
                                    <Select type="contractor"/>
                                    <Select type="trader"/>
                                    <Products/>
                                    <Info/>
                                    <Checker/>
                                </div>
                            </Route>
                            <Route exact path="/dodaj_kontrahenta">
                                <h1 className="container__headline container__headline--1">
                                    Dodaj kontrahenta
                                </h1>
                                <AddSelect type="contractor"/>
                            </Route>
                            <Route exact path="/dodaj_sprzedawce">
                                <h1 className="container__headline container__headline--1">
                                    Dodaj sprzedawce
                                </h1>
                                <AddSelect type="trader"/>
                            </Route>
                            <Route exact path="/wystaw_dokument">
                                <Document/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;