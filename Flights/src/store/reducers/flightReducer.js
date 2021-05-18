import update from 'react-addons-update';
import { LOAD_FLIGHTS } from '../actions/flightActions';

const initStore = {
    flights: null,
}

export default function flightReducer(store = initStore, action) {
    switch (action.type) {
        case LOAD_FLIGHTS: {
            return update(store, {
                flights: {
                    $set: [...action.flights]
                }
            })
        }
        default:
            return store;
    }
}