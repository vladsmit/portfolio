export const LOAD_FLIGHTS_STARTED = '@@flight/LOAD_FLIGHTS_STARTED';
export const LOAD_FLIGHTS_FAILURE = '@@flight/LOAD_FLIGHTS_FAILURE';
export const LOAD_FLIGHTS_SUCCESS = '@@flight/LOAD_FLIGHTS_SUCCESS';
export const SPINNER_SWITCH = '@@flight/SPINNER_SWITCH';
export const FILTER_FLIGHTS = '@@flight/FILTER_FLIGHTS';
export const ADD_FILTERS = '@@flight/ADD_FILTERS';
export const FILTER_AIRLINES = '@@flight/FILTER_AIRLINES';

export const loadFlightsStarted = () => ({
    type: LOAD_FLIGHTS_STARTED,
});

export const loadFlightsFailure = (error) => ({
    type: LOAD_FLIGHTS_FAILURE,
    error
});

export const loadFlightsSuccess = (flights) => ({
    type: LOAD_FLIGHTS_SUCCESS,
    flights
});

export const spinnerSwitch = (status) => ({
    type: SPINNER_SWITCH,
    status
});

export const filterFlights = (flights) => ({
    type: FILTER_FLIGHTS,
    flights
});

export const addFilters = (filters) => ({
    type: ADD_FILTERS,
    filters
});

export const filterAirlines = (airlines) => ({
    type: FILTER_AIRLINES,
    airlines
});