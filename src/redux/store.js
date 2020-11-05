import { combineReducers } from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk';

const reducer = combineReducers(reducers);

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));