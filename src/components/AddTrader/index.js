import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Swal from 'sweetalert2'
import './static/scss/index.css';

class AddTrader extends Component {

    state = {
        form: {
            nip: null,
            name: null,
            address: null,
            zipcode: null,
            city: null,
            country: null
        },
        isValid: false,
        redirect: false,
        wasConfirm: null,
    }

    handleChange = (e) => {
        const input = e.target;
        const inputName = input.name;
        const inputValue = input.value
        this.isEmpty(input, inputName, inputValue);
    }

    reloadState = () => {
        this.setState(this.state);
    }

    isEmpty = (input, inputName, inputValue) => {
        const infoElement = document.querySelector(`.info--${inputName}`);
        if (inputValue.length === 0) {
            infoElement.classList.add('info--error');
            input.classList.add('input--invalid');

            if (this.state.form[inputName] !== false) {
                this.state.form[inputName] = false;
                this.reloadState();
            }
        } else {
            if (input.classList.contains('input--invalid')) {
                input.classList.remove('input--invalid');
            }
            if (infoElement.classList.contains('info--error')) {
                infoElement.classList.remove('info--error');
            }
            if (this.state.form[inputName] !== true) {
                this.state.form[inputName] = true;
                this.reloadState();
            }
        }
    }

    isValid = () => {
        let counter = 6;
        for (const key in this.state.form) {
            const input = document.querySelector(`.input--${key}`);
            const inputName = input.name;
            const inputValue = input.value;
            this.isEmpty(input, inputName, inputValue);
            if (this.state.form[key] === true) {
                counter--;
            }
        }

        if (counter === 0) {
            this.setState({isValid: true});
            this.setTrader();
        }
    }

    setTrader = () => {
        const getValuesFromForm = () => {
            const formValues = {};

            for (const key in this.state.form) {
                const input = document.querySelector(`.input--${key}`);
                formValues[key] = input.value;
            }

            return formValues;
        }

        const formValues = getValuesFromForm();
        let traders = {}

        if (localStorage.getItem('traders') === null) {
            traders[formValues.nip] = formValues;
            localStorage.setItem('traders', JSON.stringify(traders));
            this.setState({redirect: true});
        } else {
            traders = JSON.parse(localStorage.getItem('traders'));
            if (traders[formValues.nip] === undefined || traders[formValues.nip] === null) {
                traders[formValues.nip] = formValues;
                localStorage.setItem('traders', JSON.stringify(traders));
                this.setState({redirect: true});
            } else {
                Swal.fire({
                    title: 'Niepoprawny NIP',
                    html: `Sprzedawca o numerze NIP <b>${formValues.nip}</b> już istnieje. Proszę podaj inny numer NIP, lub wróć do strony głównej`,
                    icon: 'error',
                    showCancelButton: true,
                    cancelButtonColor: '#f44336',
                    confirmButtonColor: '#4caf50',
                    cancelButtonText: 'Wracam',
                    confirmButtonText: 'Poprawiam',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        const input = document.querySelector('.input--nip');
                        input.value = '';
                    } else if (result.isDismissed) {
                        this.setState({isValid: false});
                        this.setState({redirect: true});
                        this.setState({wasConfirm: true});
                    }
                });
            }
        }
    }

    createRedirect = () => {
        for (const key in this.state.form) {
            const input = document.querySelector(`.input--${key}`);
            input.value = '';
        }
        if (this.state.isValid === true) {
            this.setState({wasConfirm: false});
            Swal.fire({
                title: 'Sprzedawca dodany poprawnie',
                icon: 'success',
                confirmButtonColor: '#4caf50',
                confirmButtonText: 'Ok',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.setState({wasConfirm: true});
                }
            });
        }
    }

    forceRedirect = () => {
        Swal.fire({
            title: 'Czy napewno chcesz wyjść?',
            icon: 'info',
            text: 'Po wyjściu dane nie zostaną zapisane',
            showCancelButton: true,
            cancelButtonColor: '#f44336',
            confirmButtonColor: '#4caf50',
            cancelButtonText: 'Zostaję',
            confirmButtonText: 'Wychodzę',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                this.setState({wasConfirm: true});
            }
        });
    }

    render = () => {
        if (this.state.redirect === true) {
            this.createRedirect();
            this.setState({redirect: false});
        }
        if (this.state.wasConfirm === true) {
            return (
                <Redirect to="/"/>
            );
        }
        return (
            <div className="addtrader">
                <h2 className="addtrader__headline addtrader__headline--2">Dane sprzedawcy</h2>
                <div className="form">
                    <div className="form__box form__box--nip">
                        <label className="label label--nip" htmlFor="nip">NIP:*</label>
                        <input name="nip" className="input input--nip" type="text" onChange={this.handleChange}/>
                        <p className="info info--nip">Pole nie może być puste</p>
                    </div>
                    <div className="form__box form__box--name">
                        <label className="label label--name" htmlFor="name">Nazwa:*</label>
                        <input name="name" className="input input--name" type="text" onChange={this.handleChange}/>
                        <p className="info info--name">Pole nie może być puste</p>
                    </div>
                    <div className="form__box form__box--address">
                        <label className="label label--address" htmlFor="address">Ulica, numer domu / lokalu:*</label>
                        <input name="address" className="input input--address" type="text"
                               onChange={this.handleChange}/>
                        <p className="info info--address">Pole nie może być puste</p>
                    </div>
                    <div className="form__box--row">
                        <div className="form__box form__box--zipcode">
                            <label className="label label--zipcode" htmlFor="zipcode">Kod pocztowy:*</label>
                            <input name="zipcode" className="input input--zipcode" type="text"
                                   onChange={this.handleChange}/>
                            <p className="info info--zipcode">Pole nie może być puste</p>
                        </div>
                        <div className="form__box form__box--city">
                            <label className="label label--city" htmlFor="city">Miejscowość:*</label>
                            <input name="city" className="input input--city" type="text" onChange={this.handleChange}/>
                            <p className="info info--city">Pole nie może być puste</p>
                        </div>
                    </div>
                    <div className="form__box form__box--country">
                        <label className="label label--country" htmlFor="country">Kraj:*</label>
                        <input name="country" className="input input--country" type="text"
                               onChange={this.handleChange}/>
                        <p className="info info--country">Pole nie może być puste</p>
                    </div>
                    <div className="form__box form__box--submit">
                        <input className="input input--submit" type="submit" value="Dodaj sprzedawce"
                               onClick={this.isValid}/>
                        <input className="input input--submit" type="submit" value="Powrót do strony głównej"
                               onClick={this.forceRedirect}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTrader;