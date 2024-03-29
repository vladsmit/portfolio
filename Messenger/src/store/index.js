import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import RootReducers from '@reducers';
import middlewares from '@middlewares';

export const history = createBrowserHistory();

const persistConfig = {
    key: 'messanger',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['chatReducer'],
};

export const store = createStore(
    persistReducer(persistConfig, RootReducers(history)),
    compose(
        applyMiddleware(routerMiddleware(history), ...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
);

export const persistor = persistStore(store);