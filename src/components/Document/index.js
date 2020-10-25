import React, {Component} from 'react';
import './static/scss/index.css';

class Document extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: this.getData('info'),
            contractor: this.getData('contractor'),
            trader: this.getData('trader'),
            products: this.getData('products'),
            count: 0,
        }
    }

    getData = (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    }

    numerDocument = () => {
        const date = this.state.info.dateCreate.split('-');
        return `nr DOC/${date[0]}/${date[1]}`;
    }

    createPartner = (type) => {
        const partner = this.state[type];
        const response = [];

        response.push(<p className="partners__box--paragraf">{partner.name}</p>);
        response.push(<p className="partners__box--paragraf">{partner.address}</p>);
        response.push(<p className="partners__box--paragraf">{partner.zipcode} {partner.city}</p>);
        response.push(<p className="partners__box--paragraf">{partner.country}</p>);
        response.push(<p className="partners__box--paragraf">NIP: {partner.nip}</p>);

        return response;
    }

    showAccountNum = () => {
        const partner = this.state.contractor;
        const response = [];

        if (this.state.info.methodPay === 'Przelew na konto') {
            response.push(<p className="partners__box--paragraf">{`Numer konta: ${partner.accountNum}`}</p>);
        }

        return response;
    }

    getProducts = () => {

        const data = this.state.products;
        let products = [];
        let count = 0;
        for (const key in data) {
            products.push(
                <div key={key} className="list__row list__row--item">
                    <div className="list__col list__col--name">{data[key].name}</div>
                    <div className="list__col list__col--count">{data[key].count}</div>
                    <div className="list__col list__col--vat">{data[key].vat}</div>
                    <div className="list__col list__col--netto">{data[key].netto}</div>
                    <div className="list__col list__col--brutto">{data[key].brutto}</div>
                </div>
            );

            count += parseFloat(data[key].brutto);
        }

        this.state.count = count;
        return products;
    }

    render = () => {
        console.log(this.state);
        return (
            <div className="document">
                <div className="header">
                    <p className="header--paragraf">Faktura</p>
                    <p className="header--paragraf">{this.numerDocument()}</p>
                </div>
                <div className="partners">
                    <div className="partners__box partners__box--trader">
                        <p className="partners__box--paragraf partners__box--title">Sprzedawca</p>
                        {this.createPartner('trader')}
                    </div>
                    <div className="partners__box partners__box--contractor">
                        <p className="partners__box--paragraf partners__box--title">Nabywca</p>
                        {this.createPartner('contractor')}
                    </div>
                </div>
                <div className="info">
                    <div className="info__box">
                        <p className="info__box--paragraf">{`Data wystawienia: ${this.state.info.dateCreate}`}</p>
                        <p className="info__box--paragraf">{`Data dostawy/usługi: ${this.state.info.dateDone}`}</p>
                    </div>
                    <div className="info__box">
                        <p className="info__box--paragraf">{`Termin płatności: ${this.state.info.timePay}`}</p>
                        <p className="info__box--paragraf">{`Sposób płatności: ${this.state.info.methodPay}`}</p>
                        {this.showAccountNum()}
                    </div>
                </div>
                <div className="product">
                    <div className="list">
                        <div className="list__row list__row--title">
                            <div className="list__col list__col--name">Nazwa produktu</div>
                            <div className="list__col list__col--count">Ilość</div>
                            <div className="list__col list__col--vat">VAT</div>
                            <div className="list__col list__col--netto">Netto</div>
                            <div className="list__col list__col--brutto">Brutto</div>
                        </div>
                        {this.getProducts()}
                    </div>
                </div>
                <div className="footer">
                    <p className="footer--paragraf">{`Zapłacono: ${this.state.info.wasPay}`}</p>
                    <p className="footer--paragraf">{`Pozostało do zapłaty: ${this.state.count - parseFloat(this.state.info.wasPay)}`}</p>
                </div>
            </div>
        );
    }
}

export default Document;