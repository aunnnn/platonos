import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './rootReducer.js';

const logger = createLogger();
const middleware = [ReduxThunk, logger, routerMiddleware(browserHistory)];

const Store = createStore(rootReducer, {}, applyMiddleware(...middleware));

export default Store;
