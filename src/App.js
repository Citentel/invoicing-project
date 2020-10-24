import React from 'react';
import './static/scss/app.css';
import Contractor from "./components/Contractor";

export default function App() {
    return (
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
