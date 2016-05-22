import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// home reducers
import countReducer from './app/reducers/countReducer.js';

const rootReducer = combineReducers({
  count: countReducer,
  routing: routerReducer, // redux in react router
});

export default rootReducer;
