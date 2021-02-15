import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import chatReducer from '@reducers/chatReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    chatReducer,
});