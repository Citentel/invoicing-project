import React from 'react';
import './static/scss/index.css';

export default function Contractor() {
    return (
        <div className="contractor">
            <h2 className="contractor__headline contractor__headline--2">
                Kontrahent
            </h2>
            <div className="form">
                <div className="form__box form__box--nip">
                    <label className="label label--nip" htmlFor="nip">NIP:*</label>
                    <input className="input input--nip" type="text" />
                </div>
                <div className="form__box form__box--name">
                    <label className="label label--name" htmlFor="name">Nazwa:*</label>
                    <input className="input input--name" type="text" />
                </div>
                <div className="form__box form__box--address">
                    <label className="label label--address" htmlFor="address">Ulica, numer domu / lokalu:*</label>
                    <input className="input input--address" type="text" />
                </div>
                <div className="form__box--row">
                    <div className="form__box form__box--zipcode">
                        <label className="label label--zipcode" htmlFor="zipcode">Kod pocztowy:*</label>
                        <input className="input input--zipcode" type="text" />
                    </div>
                    <div className="form__box form__box--city">
                        <label className="label label--city" htmlFor="city">Miejscowość:*</label>
                        <input className="input input--city" type="text" />
                    </div>
                </div>
                <div className="form__box form__box--country">
                    <label className="label label--country" htmlFor="country">Kraj:*</label>
                    <input className="input input--country" type="text" />
                </div>
            </div>
        </div>
    );
}