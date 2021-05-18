import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import flightReducer from './flightReducer';

// eslint-disable-next-line
export default history => combineReducers({
    router: connectRouter(history),
    flightReducer,
});