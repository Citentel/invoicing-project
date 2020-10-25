import React, {Component} from 'react';
import moment from 'moment';
import './static/scss/index.css';

class Info extends Component {

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
        }
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
            if (infoElement !== null) {
                infoElement.classList.add('info--error');
            }
            input.classList.add('input--invalid');

            if (this.state.form[inputName] !== false) {
                // eslint-disable-next-line
                this.state.form[inputName] = false;
                this.reloadState();
            }
        } else {
            if (input.classList.contains('input--invalid')) {
                input.classList.remove('input--invalid');
            }
            if (infoElement !== null) {
                if (infoElement.classList.contains('info--error')) {
                    infoElement.classList.remove('info--error');
                }
            }
            if (this.state.form[inputName] !== true) {
                // eslint-disable-next-line
                this.state.form[inputName] = true;
                this.reloadState();
            }
            this.setData();
        }
    }

    setData = () => {
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
        const actualDate = moment().format('YYYY-MM-DD');
        return (
            <div className="info info__container">
                <h2 className="info__headline info__headline--2">Dodatkowe informacje</h2>
                <div className="form">
                    <div className="form__box form__box--dateCreate">
                        <label className="label label--dateCreate" htmlFor="dateCreate">Data wystawienia:*</label>
                        <input name="dateCreate" className="input input--dateCreate" type="date"
                               defaultValue={actualDate}
                               onChange={this.handleChange}/>
                        <p className="info info--dateCreate">Pole nie może być puste</p>
                    </div>
                    <div className="form__box form__box--dateDone">
                        <label className="label label--dateDone" htmlFor="dateDone">Data wykonania usługi lub
                            dostawy:*</label>
                        <input name="dateDone" className="input input--dateDone" type="date"
                               onChange={this.handleChange} defaultValue={actualDate}/>
                        <p className="info info--dateDone">Pole nie może być puste</p>
                    </div>
                    <div className="form__box form__box--methodPay">
                        <label className="label label--methodPay" htmlFor="methodPay">Metoda płatności:*</label>
                        <select className="input input--methodPay" name="methodPay" id="methodPay"
                                onChange={this.handleChange} defaultValue="money">
                            <option defaultValue="money">Gotówka</option>
                            <option defaultValue="card">Przelew na konto</option>
                        </select>
                    </div>
                    <div className="form__box form__box--timePay">
                        <label className="label label--timePay" htmlFor="timePay">Czas na zapłatę:*</label>
                        <select className="input input--timePay" name="timePay" id="timePay"
                                onChange={this.handleChange} defaultValue="7">
                            <option defaultValue="0">0 dni</option>
                            <option defaultValue="1">1 dzień</option>
                            <option defaultValue="3">3 dni</option>
                            <option defaultValue="5">5 dni</option>
                            <option defaultValue="7">7 dni</option>
                        </select>
                    </div>
                    <div className="form__box form__box--wasPay">
                        <label className="label label--wasPay" htmlFor="wasPay">Zapłacono:*</label>
                        <input name="wasPay" className="input input--wasPay" type="number" defaultValue="0" min="0"
                               onChange={this.handleChange}/>
                        <p className="info info--wasPay">Pole nie może być puste</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;