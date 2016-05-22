import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { renderRoutes } from '../src/startup/routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-root'));
});
