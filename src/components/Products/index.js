import React, {Component} from 'react';
import './static/scss/index.css';

class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: null,
                count: null,
                netto: null,
                vat: null,
                brutto: null
            },
            isValid: false,
            data: this.getData(),
        }
    }

    handleChange = (e) => {
        const input = e.target;
        const inputName = input.name;
        const inputValue = input.value
        this.isEmpty(input, inputName, inputValue);
        this.changeValue(input, inputName, inputValue);
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
        }
    }

    isValid = () => {
        let counter = 5;
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
        let data = [];

        if (localStorage.getItem('products') === null) {
            data[0] = formValues;
            localStorage.setItem('products', JSON.stringify(data));
        } else {
            data = JSON.parse(localStorage.getItem('products'));
            data.push(formValues);
            localStorage.setItem('products', JSON.stringify(data));
        }

        for (const key in this.state.form) {
            const input = document.querySelector(`.input--${key}`);

            if (key === 'count') {
                input.value = 1;
            } else if (key === 'netto') {
                input.value = 0;
            } else if (key !== 'vat') {
                input.value = '';
            }
        }
        this.setState({products: data});
    }

    changeValue = (input, inputName, inputValue) => {
        if (inputName === 'netto') {
            const VAT = (100 + parseInt(document.querySelector('.input--vat').value)) / 100;
            const bruttoInput = document.querySelector('.input--brutto');
            const bruttoValue = (inputValue * VAT);
            bruttoInput.value = bruttoValue;
        } else if (inputName === 'vat') {
            const VAT = (100 + parseInt(document.querySelector('.input--vat').value)) / 100;
            const bruttoInput = document.querySelector('.input--brutto');
            const bruttoValue = (parseFloat(document.querySelector('.input--netto').value) * VAT);
            bruttoInput.value = bruttoValue;
        }
    }

    getData = () => {
        return JSON.parse(localStorage.getItem('products'));
    }

    getProducts = (type = false) => {
        let data = this.state.data;
        if (type === true) {
            data = this.state.products;
        }

        let products = [];

        for (const key in data) {
            products.push(
                <div key={key} className="list__row list__row--item">
                    <div className="list__col list__col--name">{data[key].name}</div>
                    <div className="list__col list__col--count">{data[key].count}</div>
                    <div className="list__col list__col--vat">{data[key].vat}</div>
                    <div className="list__col list__col--netto">{data[key].netto}</div>
                    <div className="list__col list__col--brutto">{data[key].brutto}</div>
                    <div className="list__col list__col--button" name={key} onClick={this.handleDelete}>&#8855;</div>
                </div>
            );
        }

        return products;
    }

    handleDelete = (e) => {
        const elementId = e.target.name;
        let data = JSON.parse(localStorage.getItem('products'));
        data.splice(elementId, 1);
        localStorage.setItem('products', JSON.stringify(data));
        this.setState({products: data});
    }

    render = () => {
        let products = this.getProducts();
        if (this.state.products !== undefined) {
            products = this.getProducts(true)
        }

        if (products.length === 0) {
            products = <p>Brak produktów</p>;
        }
        return (
            <div className="products products__container">
                <h2 className="products__headline products__headline--2">Produkt</h2>
                <div className="form">
                    <div className="form__box--row">
                        <div className="form__box form__box--name">
                            <label className="label label--name" htmlFor="name">Nazwa produktu:*</label>
                            <input name="name" className="input input--name" type="text" onChange={this.handleChange}/>
                            <p className="info info--name">Pole nie może być puste</p>
                        </div>
                        <div className="form__box form__box--count">
                            <label className="label label--count" htmlFor="count">Ilość:*</label>
                            <input name="count" className="input input--count" type="number" min="1" defaultValue="1"
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form__box--row">
                        <div className="form__box form__box--netto">
                            <label className="label label--netto" htmlFor="netto">Kwota netto:*</label>
                            <input name="netto" className="input input--netto" type="number" min="0" defaultValue="0"
                                   onChange={this.handleChange}/>
                            <p className="info info--netto">Pole nie może być puste</p>
                        </div>
                        <div className="form__box form__box--vat">
                            <label className="label label--vat" htmlFor="vat">Stawka VAT:*</label>
                            <select className="input input--vat" name="vat" id="vat" onChange={this.handleChange}>
                                <option value="23">23%</option>
                                <option value="19">19%</option>
                                <option value="10">10%</option>
                                <option value="5">5%</option>
                                <option value="0">0%</option>
                            </select>
                        </div>
                        <div className="form__box form__box--brutto">
                            <label className="label label--brutto" htmlFor="brutto">Kwota brutto:*</label>
                            <input name="brutto" className="input input--brutto" type="number" min="0"
                                   onChange={this.handleChange} disabled/>
                            <p className="info info--brutto">Pole nie może być puste</p>
                        </div>
                    </div>
                    <div className="form__box form__box--submit">
                        <input className="input input--submit" type="submit" value="Dodaj produkt"
                               onClick={this.isValid}/>
                    </div>
                </div>
                <h2 className="products__headline products__headline--2">Lista produktów</h2>
                <div className="list">
                    <div className="list__row list__row--title">
                        <div className="list__col list__col--name">Nazwa produktu</div>
                        <div className="list__col list__col--count">Ilość</div>
                        <div className="list__col list__col--vat">VAT</div>
                        <div className="list__col list__col--netto">Netto</div>
                        <div className="list__col list__col--brutto">Brutto</div>
                        <div className="list__col list__col--button">&nbsp;</div>
                    </div>
                    {products}
                </div>
            </div>
        );
    }
}

export default Products;