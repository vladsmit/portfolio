import axios from 'axios';
import { loadFlightsSuccess, loadFlightsStarted, loadFlightsFailure } from './flightActions';

export const fetchFlights = () => {
    return dispatch => {
        dispatch(loadFlightsStarted());

        axios.get("./flights.json")
            .then(response => {
                dispatch(loadFlightsSuccess(response.data.result.flights));
            })
            .catch(err => {
                dispatch(loadFlightsFailure(err.message));
                console.log(err.message);
            });
    }
}
