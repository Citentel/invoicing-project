import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import './static/scss/index.css';

class Contractor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contractors: this.getContractor(),
            redirect: false
        }
    }

    getContractor = () => {
        return JSON.parse(localStorage.getItem('contractors'));
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
            dataPdf.contractor = this.state.contractors[nip];
            sessionStorage.setItem('dataPDF', JSON.stringify(dataPdf));
        } else {
            dataPdf = JSON.parse(sessionStorage.getItem('dataPDF'));
            dataPdf.contractor = this.state.contractors[nip];
            sessionStorage.setItem('dataPDF', JSON.stringify(dataPdf));
        }
    }

    getOptions = () => {
        const contractors = this.state.contractors;
        let options = [];
        for (const key in contractors) {
            options.push(<option key={options.length} value={key}>NIP: {contractors[key].nip}, Nazwa: {contractors[key].name}</option>)
        }

        return options;
    }

    render = () => {
        if (this.state.redirect === true) {
            return (
                <Redirect to="/dodaj_kontrahenta"/>
            );
        } else if (this.state.contractors === null) {
            return (
                <div className="contractor">
                    <h2 className="contractor__headline contractor__headline--2">Kontrahent</h2>
                    <input className="input input--submit" type="submit" value="Dodaj kontrahenta"
                           onClick={this.handleRedirect}/>
                    <p>Brak kontrahentów</p>
                </div>
            );
        } else {
            const options = this.getOptions();
            return (
                <div className="contractor">
                    <h2 className="contractor__headline contractor__headline--2">Kontrahent</h2>
                    <div className="select">
                        <label className="label label--contractors" htmlFor="contractors">Wybierz kontrahenta</label>
                        <select className="input input--select" name="contractors" id="contractors" onChange={this.handleChange}>
                            <option value="null">Wybierz kontrahenta</option>
                            {options}
                        </select>
                    </div>
                    <input className="input input--submit" type="submit" value="Dodaj kontrahenta"
                           onClick={this.handleRedirect}/>
                </div>
            );
        }
    }
}

export default Contractor;