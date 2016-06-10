import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { renderRoutes } from '../src/startup/routes.jsx';

import './main.import.css';
import '../src/api/thought/methods.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-root'));
});
