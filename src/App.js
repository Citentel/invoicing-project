import React, {Component} from 'react';
import './static/scss/app.css';
import Contractor from "./components/Contractor";

class App extends Component {
    render = () => (
        <div className="app">
            <div className="container">
                <h1 className="container__headline container__headline--1">
                    Wystaw dokument
                </h1>
                <Contractor/>
            </div>
        </div>
    );
}

export default App;