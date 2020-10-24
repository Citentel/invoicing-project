import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import './static/scss/index.css';

class Trader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            traders: this.getTraders(),
            redirect: false
        }
    }

    getTraders = () => {
        return JSON.parse(localStorage.getItem('traders'));
    }

    handleRedirect = () => {
        this.setState({redirect: true})
    }

    handleChange = (e) => {
        const nip = e.target.value;
        this.setDataPdf(nip);
    }

    setDataPdf = (nip) => {
        let dataPdf = {};

        if (sessionStorage.getItem('dataPDF') === null) {
            dataPdf.trader = this.state.traders[nip];
            sessionStorage.setItem('dataPDF', JSON.stringify(dataPdf));
        } else {
            dataPdf = JSON.parse(sessionStorage.getItem('dataPDF'));
            dataPdf.trader = this.state.traders[nip];
            sessionStorage.setItem('dataPDF', JSON.stringify(dataPdf));
        }
    }

    getOptions = () => {
        const traders = this.state.traders;
        let options = [];
        for (const key in traders) {
            options.push(<option key={options.length} value={key}>NIP: {traders[key].nip}, Nazwa: {traders[key].name}</option>)
        }

        return options;
    }

    render = () => {
        if (this.state.redirect === true) {
            return (
                <Redirect to="/dodaj_sprzedawce"/>
            );
        } else if (this.state.traders === null) {
            return (
                <div className="trader">
                    <h2 className="trader__headline trader__headline--2">Sprzedawca</h2>
                    <input className="input input--submit" type="submit" value="Dodaj Sprzedawce"
                           onClick={this.handleRedirect}/>
                    <p>Brak sprzedawców</p>
                </div>
            );
        } else {
            const options = this.getOptions();
            return (
                <div className="trader">
                    <h2 className="trader__headline trader__headline--2">Sprzedawca</h2>
                    <div className="select">
                        <label className="label label--traders" htmlFor="traders">Wybierz sprzedawce</label>
                        <select className="input input--select" name="traders" id="traders" onChange={this.handleChange}>
                            <option value="null">Wybierz sprzedawce</option>
                            {options}
                        </select>
                    </div>
                    <input className="input input--submit" type="submit" value="Dodaj Sprzedawce"
                           onClick={this.handleRedirect}/>
                </div>
            );
        }
    }
}

export default Trader;