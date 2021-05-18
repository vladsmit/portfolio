export const LOAD_FLIGHTS = '@@flight/LOAD_FLIGHTS';

export const loadFlights = (flights) => ({
    type: LOAD_FLIGHTS,
    flights
})