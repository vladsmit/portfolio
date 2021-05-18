import React from 'react';
import './FlightCard.scss';
import { ClockCircleOutlined } from '@ant-design/icons';

const FlightCard = ({ transfer }) => {
    return (
        <div className="flightCard--wrapper">
            <div className="flightCard__header">
                <img src="../../assets/lot-airlines.png" alt="logo" />
                <div className="flightCard__header__priceBlock">
                    <p className="flightCard__header__price">21049 &#8381;</p>
                    <p className="flightCard__header__desc">Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <div className="flightCard__info--wrapper">
                <div className="flightCard__airportInfo">
                    <p>Москва, ШЕРЕМЕТЬЕВО <span>(SVO)</span> -&gt; ЛОНДОН, Лондон, Хитроу <span>(LHR)</span></p>
                </div>
                <div className="flightCard__timeInfo">
                    <p>20:40 <span>18 авг. вт</span></p>
                    <p>
                        <ClockCircleOutlined style={{ color: 'black', margin: '2px' }} />
                        14 ч 45 мин
                    </p>
                    <p><span>19 авг. ср </span>09:25</p>
                </div>
            </div>
            <div className="flightCard__transferInfo">{ transfer ? "1 пересадка" : "" }</div>
            <div className="flightCard__companyInfo">
                <p>Рейс выполняет: LOT Polish Airlines</p>
            </div>
            <div className="flightCard__info--wrapper">
                <div className="flightCard__airportInfo">
                    <p>ЛОНДОН, Лондон, Хитроу <span>(LHR)</span> -&gt; Москва, ШЕРЕМЕТЬЕВО <span>(SVO)</span></p>
                </div>
                <div className="flightCard__timeInfo">
                    <p className="flightCard__timeInfo__departure">18:10 <span>19 авг. ср</span></p>
                    <p>
                        <ClockCircleOutlined style={{ color: 'black', margin: '2px' }} />
                        23 ч 35 мин
                    </p>
                    <p className="flightCard__timeInfo__arrival"><span>20 авг. чт </span>19:45</p>
                </div>
            </div>
            <div className="flightCard__transferInfo">{ transfer ? "1 пересадка" : "" }</div>
            <div className="flightCard__companyInfo">
                <p>Рейс выполняет: LOT Polish Airlines</p>
            </div>
            <button className="flightCard__button">Выбрать</button>
        </div >
    )
}

export default FlightCard;