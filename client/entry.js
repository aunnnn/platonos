import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { renderRoutes } from '../src/startup/routes.jsx';

import './main.import.css';

import './register-api.js';

import './randomThoughtPolling.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-root'));
});
