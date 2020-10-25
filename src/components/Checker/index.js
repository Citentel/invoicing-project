import React, {Component} from 'react';
import Swal from 'sweetalert2'
import './static/scss/index.css';
import {Redirect} from "react-router-dom";

class Checker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                dateCreate: null,
                dateDone: null,
                methodPay: true,
                timePay: true,
                wasPay: true
            },
            info: {},
            redirect: false,
        }
    }

    getData = (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    }

    checkAll = () => {
        if (this.getData('info') === null) {
            this.setInfoDefault();
        }
        if (this.getData('contractor') === null) {
            Swal.fire({
                title: 'Brak kontrahenta',
                text: 'Dokument musi zawierać kontrahenta',
                icon: 'error',
                confirmButtonColor: '#4caf50',
                confirmButtonText: 'Rozumiem',
                allowOutsideClick: false
            });
        } else if (this.getData('trader') === null) {
            Swal.fire({
                title: 'Brak sprzedawcy',
                text: 'Dokument musi zawierać sprzedawce',
                icon: 'error',
                confirmButtonColor: '#4caf50',
                confirmButtonText: 'Rozumiem',
                allowOutsideClick: false
            });
        } else if (this.getData('products') === null) {
            Swal.fire({
                title: 'Brak produktów',
                text: 'Dokument musi zawierać przynajmniej 1 produkt',
                icon: 'error',
                confirmButtonColor: '#4caf50',
                confirmButtonText: 'Rozumiem',
                allowOutsideClick: false
            });
        } else {
            this.setState({redirect: true});
        }
    }

    setInfoDefault = () => {
        const getValuesFromForm = () => {
            const formValues = {};

            for (const key in this.state.form) {
                const input = document.querySelector(`.input--${key}`);
                formValues[key] = input.value;
            }

            return formValues;
        }

        const formValues = getValuesFromForm();
        let data;

        if (sessionStorage.getItem('info') === null) {
            data = formValues;
            sessionStorage.setItem('info', JSON.stringify(data));
        } else {
            data = JSON.parse(sessionStorage.getItem('info'));
            data = formValues;
            sessionStorage.setItem('info', JSON.stringify(data));
        }
        this.setState({info: data});
    }

    render = () => {
        if (this.state.redirect === true) {
            return (
                <Redirect to="/wystaw_dokument"/>
            );
        }
        return (
            <div className="checker">
                <input className="input input--submit" type="submit" value="Wystaw dokument" onClick={this.checkAll}/>
            </div>
        );
    }
}

export default Checker;