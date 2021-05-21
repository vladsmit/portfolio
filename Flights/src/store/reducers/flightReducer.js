import update from 'react-addons-update';
import { LOAD_FLIGHTS_STARTED, LOAD_FLIGHTS_FAILURE, LOAD_FLIGHTS_SUCCESS, SPINNER_SWITCH, FILTER_FLIGHTS, ADD_FILTERS, FILTER_AIRLINES } from '../actions/flightActions';

const initStore = {
    flights: null,
    loading: false,
    error: null,
    filteredFlights: [],
    filters: ["rise", [], [], []],
    filteredAirlines: []
}

export default function flightReducer(store = initStore, action) {
    switch (action.type) {
        case LOAD_FLIGHTS_STARTED: {
            return update(store, {
                loading: {
                    $set: true
                }
            })
        }
        case LOAD_FLIGHTS_FAILURE: {
            return update(store, {
                error: {
                    $set: action.error
                },
                loading: {
                    $set: false
                }
            })
        }
        case LOAD_FLIGHTS_SUCCESS: {
            return update(store, {
                flights: {
                    $set: [...action.flights]
                },
                loading: {
                    $set: false
                }
            })
        }
        case SPINNER_SWITCH: {
            return update(store, {
                loading: {
                    $set: action.status
                }
            })
        }
        case FILTER_FLIGHTS: {
            return update(store, {
                filteredFlights: {
                    $set: [...action.flights]
                }
            })
        }
        case ADD_FILTERS: {
            return update(store, {
                filters: {
                    $set: [
                        action.filters.sort,
                        [...action.filters.filter],
                        [action.filters.priceFrom, action.filters.priceTo],
                        [...action.filters.airlines]
                    ]
                }
            })
        }
        case FILTER_AIRLINES: {
            return update(store, {
                filteredAirlines: {
                    $set: [...action.airlines]
                }
            })
        }
        default:
            return store;
    }
}