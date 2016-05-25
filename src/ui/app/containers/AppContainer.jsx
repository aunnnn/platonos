import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AppLayout from '../layouts/AppLayout.jsx';

export default createContainer(() => {
  const subUserData = Meteor.subscribe('userData');
  return {
    user: Meteor.user(),
    userReady: subUserData.ready(),
  };
}, AppLayout);
