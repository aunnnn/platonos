import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AppLayout from '../layouts/AppLayout.jsx';

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, AppLayout);
