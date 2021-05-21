import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ClockCircleOutlined } from '@ant-design/icons';
import './FlightCard.scss';

const FlightCard = ({ flight }) => {
   
    let date = new Date(flight.flight.legs[0].segments[0].departureDate);
    let date2 = new Date(flight.flight.legs[0].segments.length > 1 ? flight.flight.legs[0].segments[1].arrivalDate : flight.flight.legs[0].segments[0].arrivalDate);
    let date3 = new Date(flight.flight.legs[1].segments[0].departureDate);
    let date4 = new Date(flight.flight.legs[1].segments.length > 1 ? flight.flight.legs[1].segments[1].arrivalDate : flight.flight.legs[1].segments[0].arrivalDate);

    const handleTimeConvert = useCallback(duration => {
        let hours = Math.floor(duration / 60);
        let minutes = duration - (hours * 60);
        return `${hours} ч ${minutes} мин`;
    }, []);

    return (
        <div className="flightCard--wrapper">
            <div className="flightCard__header">
                <p className="flightCard__header__title">{flight.flight.carrier.caption}</p>
                <div className="flightCard__header__priceBlock">
                    <p className="flightCard__header__price">{flight.flight.price.total.amount} &#8381;</p>
                    <p className="flightCard__header__desc">Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <div className="flightCard__info--wrapper">
                <div className="flightCard__airportInfo">
                    {flight.flight.legs[0].segments.length > 1 ?
                        <p>{flight.flight.legs[0].segments[0].departureCity.caption}, {flight.flight.legs[0].segments[0].departureAirport.caption} <span>({flight.flight.legs[0].segments[0].departureAirport.uid})</span> -&gt; {flight.flight.legs[0].segments[1]?.arrivalCity?.caption}, {flight.flight.legs[0].segments[1]?.arrivalAirport?.caption} <span>({flight.flight.legs[0].segments[1]?.arrivalAirport?.uid})</span></p>
                        :
                        <p>{flight.flight.legs[0].segments[0].departureCity.caption}, {flight.flight.legs[0].segments[0].departureAirport.caption} <span>({flight.flight.legs[0].segments[0].departureAirport.uid})</span> -&gt; {flight.flight.legs[0].segments[0].arrivalCity.caption}, {flight.flight.legs[0].segments[0].arrivalAirport.caption} <span>({flight.flight.legs[0].segments[0].arrivalAirport.uid})</span></p>
                    }
                </div>
                <div className="flightCard__timeInfo">
                    <p>{`${date.getHours()}:${date.getMinutes()}`} <span>18 авг. вт</span></p>
                    <p>
                        <ClockCircleOutlined style={{ color: 'black', margin: '2px' }} />
                        {handleTimeConvert(flight.flight.legs[0].duration)}
                    </p>
                    <p><span>19 авг. ср </span>{`${date2.getHours()}:${date2.getMinutes()}`}</p>
                </div>
            </div>
            <div className="flightCard__transferInfo">{flight.flight.legs[0].segments.length > 1 ? "1 пересадка" : ""}</div>
            <div className="flightCard__companyInfo">
                <p>Рейс выполняет: {flight.flight.legs[0].segments[0].airline.caption}</p>
            </div>
            <div className="flightCard__info--wrapper">
                <div className="flightCard__airportInfo">
                    {flight.flight.legs[1].segments.length > 1 ?
                        <p>{flight.flight.legs[1].segments[0]?.departureCity?.caption}, {flight.flight.legs[1].segments[0]?.departureAirport?.caption} <span>({flight.flight.legs[1].segments[0]?.departureAirport?.uid})</span> -&gt; {flight.flight.legs[1].segments[1]?.arrivalCity?.caption}, {flight.flight.legs[1].segments[1]?.arrivalAirport?.caption} <span>({flight.flight.legs[1].segments[1]?.arrivalAirport?.uid})</span></p>
                        :
                        <p>{flight.flight.legs[1].segments[0]?.departureCity?.caption}, {flight.flight.legs[1].segments[0]?.departureAirport?.caption} <span>({flight.flight.legs[1].segments[0]?.departureAirport?.uid})</span> -&gt; {flight.flight.legs[1].segments[0]?.arrivalCity?.caption}, {flight.flight.legs[1].segments[0]?.arrivalAirport?.caption} <span>({flight.flight.legs[1].segments[0]?.arrivalAirport?.uid})</span></p>
                        }
                </div>
                <div className="flightCard__timeInfo">
                    <p className="flightCard__timeInfo__departure">{`${date3.getHours()}:${date3.getMinutes()}`} <span>19 авг. ср</span></p>
                    <p>
                        <ClockCircleOutlined style={{ color: 'black', margin: '2px' }} />
                        {handleTimeConvert(flight.flight.legs[1].duration)}
                    </p>
                    <p className="flightCard__timeInfo__arrival"><span>20 авг. чт </span>{`${date4.getHours()}:${date4.getMinutes()}`}</p>
                </div>
            </div>
            <div className="flightCard__transferInfo">{flight.flight.legs[1].segments.length > 1 ? "1 пересадка" : ""}</div>
            <div className="flightCard__companyInfo">
                <p>Рейс выполняет: {flight.flight.legs[1].segments[0].airline.caption}</p>
            </div>
            <button className="flightCard__button">Выбрать</button>
        </div >
    )
}

FlightCard.propTypes = {
    flight: PropTypes.object
}

export default FlightCard;