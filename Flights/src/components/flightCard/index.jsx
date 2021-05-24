import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ClockCircleOutlined } from '@ant-design/icons';
import './FlightCard.scss';

const FlightCard = ({ flight }) => {

    const handleGetTime = useCallback(dateInfo => {
        let date = new Date(dateInfo);
        let hours = date.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return `${hours}:${minutes}`;
    }, []);

    const handleGetDate = useCallback(dateInfo => {
        let weekDays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
        let months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
        let date = new Date(dateInfo);
        let day = date.getDate();
        let weekDay = date.getDay();
        for (let i = 0; i < weekDays.length; i++) {
            if (weekDay === i) {
                weekDay = weekDays[i];
            }
        }
        let month = date.getMonth();
        for (let i = 0; i < months.length; i++) {
            if (month === i) {
                month = months[i];
            }
        }
        return `${day} ${month}. ${weekDay}`;
    }, []);

    const handleTimeDurationConvert = useCallback(duration => {
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
                        <p>{flight.flight.legs[0].segments[0].departureCity.caption}{flight.flight.legs[0].segments[1]?.arrivalCity?.caption ? "," : ""} {flight.flight.legs[0].segments[0].departureAirport.caption} <span>({flight.flight.legs[0].segments[0].departureAirport.uid})</span> -&gt; {flight.flight.legs[0].segments[1]?.arrivalCity?.caption}{flight.flight.legs[0].segments[1]?.arrivalCity?.caption ? "," : ""} {flight.flight.legs[0].segments[1]?.arrivalAirport?.caption} <span>({flight.flight.legs[0].segments[1]?.arrivalAirport?.uid})</span></p>
                        :
                        <p>{flight.flight.legs[0].segments[0].departureCity.caption}{flight.flight.legs[0].segments[1]?.arrivalCity?.caption ? "," : ""} {flight.flight.legs[0].segments[0].departureAirport.caption} <span>({flight.flight.legs[0].segments[0].departureAirport.uid})</span> -&gt; {flight.flight.legs[0].segments[0].arrivalCity.caption}{flight.flight.legs[0].segments[1]?.arrivalCity?.caption ? "," : ""} {flight.flight.legs[0].segments[0].arrivalAirport.caption} <span>({flight.flight.legs[0].segments[0].arrivalAirport.uid})</span></p>
                    }
                </div>
                <div className="flightCard__timeInfo">
                    <p>{handleGetTime(flight.flight.legs[0].segments[0].departureDate)} <span>{handleGetDate(flight.flight.legs[0].segments[0].departureDate)}</span></p>
                    <p>
                        <ClockCircleOutlined style={{ color: 'black', margin: '2px' }} />
                        {handleTimeDurationConvert(flight.flight.legs[0].duration)}
                    </p>
                    <p><span>{handleGetDate(flight.flight.legs[0].segments.length > 1 ? flight.flight.legs[0].segments[1].arrivalDate : flight.flight.legs[0].segments[0].arrivalDate)} </span>{handleGetTime(flight.flight.legs[0].segments.length > 1 ? flight.flight.legs[0].segments[1].arrivalDate : flight.flight.legs[0].segments[0].arrivalDate)}</p>
                </div>
            </div>
            <div className="flightCard__transferInfo">{flight.flight.legs[0].segments.length > 1 ? "1 пересадка" : ""}</div>
            <div className="flightCard__companyInfo">
            {flight.flight.legs[0].segments.length < 2 ?
            <p>Рейс выполняет: {flight.flight.legs[0].segments[0].airline.caption}</p>
            :
            <p>Рейс выполняет: {flight.flight.legs[0].segments[1].airline.caption}</p>}
            </div>
            <div className="flightCard__info--wrapper">
                <div className="flightCard__airportInfo">
                    {flight.flight.legs[1].segments.length > 1 ?
                        <p>{flight.flight.legs[1].segments[0]?.departureCity?.caption}{flight.flight.legs[0].segments[1]?.arrivalCity?.caption ? "," : ""} {flight.flight.legs[1].segments[0]?.departureAirport?.caption} <span>({flight.flight.legs[1].segments[0]?.departureAirport?.uid})</span> -&gt; {flight.flight.legs[1].segments[1]?.arrivalCity?.caption}{flight.flight.legs[0].segments[1]?.arrivalCity?.caption ? "," : ""} {flight.flight.legs[1].segments[1]?.arrivalAirport?.caption} <span>({flight.flight.legs[1].segments[1]?.arrivalAirport?.uid})</span></p>
                        :
                        <p>{flight.flight.legs[1].segments[0]?.departureCity?.caption}{flight.flight.legs[0].segments[1]?.arrivalCity?.caption ? "," : ""} {flight.flight.legs[1].segments[0]?.departureAirport?.caption} <span>({flight.flight.legs[1].segments[0]?.departureAirport?.uid})</span> -&gt; {flight.flight.legs[1].segments[0]?.arrivalCity?.caption}{flight.flight.legs[0].segments[1]?.arrivalCity?.caption ? "," : ""} {flight.flight.legs[1].segments[0]?.arrivalAirport?.caption} <span>({flight.flight.legs[1].segments[0]?.arrivalAirport?.uid})</span></p>
                        }
                </div>
                <div className="flightCard__timeInfo">
                    <p className="flightCard__timeInfo__departure">{handleGetTime(flight.flight.legs[1].segments[0].departureDate)} <span>{handleGetDate(flight.flight.legs[1].segments[0].departureDate)}</span></p>
                    <p>
                        <ClockCircleOutlined style={{ color: 'black', margin: '2px' }} />
                        {handleTimeDurationConvert(flight.flight.legs[1].duration)}
                    </p>
                    <p className="flightCard__timeInfo__arrival"><span>{handleGetDate(flight.flight.legs[1].segments.length > 1 ? flight.flight.legs[1].segments[1].arrivalDate : flight.flight.legs[1].segments[0].arrivalDate)} </span>{handleGetTime(flight.flight.legs[1].segments.length > 1 ? flight.flight.legs[1].segments[1].arrivalDate : flight.flight.legs[1].segments[0].arrivalDate)}</p>
                </div>
            </div>
            <div className="flightCard__transferInfo">{flight.flight.legs[1].segments.length > 1 ? "1 пересадка" : ""}</div>
            <div className="flightCard__companyInfo">
            {flight.flight.legs[1].segments.length < 2 ?
            <p>Рейс выполняет: {flight.flight.legs[1].segments[0].airline.caption}</p>
            :
            <p>Рейс выполняет: {flight.flight.legs[1].segments[1].airline.caption}</p>}
            </div>
            <button className="flightCard__button">Выбрать</button>
        </div >
    )
}

FlightCard.propTypes = {
    flight: PropTypes.object
}

export default FlightCard;