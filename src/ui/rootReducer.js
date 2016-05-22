import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// app reducers
import {
  dropdownReducer,
} from './app/reducers/dropdownReducers.js';

const rootReducer = combineReducers({
  activeDropdown: dropdownReducer,
  routing: routerReducer, // redux in react router
});

export default rootReducer;
