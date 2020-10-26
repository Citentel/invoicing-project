import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import './static/scss/index.css';

class Select extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: this.texts[this.props.type],
            data: this.getData(),
            redirect: false
        }
    }

    texts = {
        trader: {
            className: 'trader',
            redirect: 'sprzedawce',
            headline: 'Sprzedawca',
            submit: 'sprzedawce',
            paragraf: 'sprzedawców',
        },
        contractor: {
            className: 'contractor',
            redirect: 'kontrahenta',
            headline: 'Kontrahent',
            submit: 'kontrahenta',
            paragraf: 'kontrahentów',
        }
    }

    getData = () => {
        return JSON.parse(localStorage.getItem(`${this.props.type}s`));
    }

    handleRedirect = () => {
        this.setState({redirect: true})
    }

    handleChange = (e) => {
        const nip = e.target.value;
        this.setDataPdf(nip);
    }

    setDataPdf = (nip) => {
        let dataPdf;

        if (sessionStorage.getItem(this.state.type.className) === null) {
            dataPdf = this.state.data[nip];
            sessionStorage.setItem(this.state.type.className, JSON.stringify(dataPdf));
        } else {
            dataPdf = JSON.parse(sessionStorage.getItem(this.state.type.className));
            dataPdf = this.state.data[nip];
            sessionStorage.setItem(this.state.type.className, JSON.stringify(dataPdf));
        }
    }

    getOptions = () => {
        const data = this.state.data;
        let options = [];
        for (const key in data) {
            options.push(<option key={options.length} value={key}>NIP: {data[key].nip}, Nazwa: {data[key].name}</option>)
        }

        return options;
    }

    render = () => {
        if (this.state.redirect === true) {
            return (
                <Redirect to={`/dodaj_${this.state.type.redirect}`}/>
            );
        } else if (this.state.data === null) {
            return (
                <div className="select select__container">
                    <h2 className="headline headline--2">{this.state.type.headline}</h2>
                    <div className="form">
                        <div className="form__box">
                            <input className="input input--submit" type="submit" value={`Dodaj ${this.state.type.submit}`}
                                   onClick={this.handleRedirect}/>
                        </div>
                    </div>
                    <p>{`Brak ${this.state.type.paragraf}`}</p>
                </div>
            );
        } else {
            const options = this.getOptions();
            return (
                <div className="select select__container">
                    <h2 className="headline headline--2">{this.state.type.headline}</h2>
                    <div className="form">
                        <div className="form__box">
                            <label className="label label--select" htmlFor="select">{`Wybierz ${this.state.type.submit}`}</label>
                            <select className="input input--select" name="select" id="select" onChange={this.handleChange}>
                                <option value="null">{`Wybierz ${this.state.type.submit}`}</option>
                                {options}
                            </select>
                        </div>
                        <div className="form__box">
                            <input className="input input--submit" type="submit" value={`Dodaj ${this.state.type.submit}`}
                                   onClick={this.handleRedirect}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Select;