import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AppLayout from '../layouts/AppLayout.jsx';

export default createContainer(() => {
  const subUserData = Meteor.subscribe('userData');
  return {
    currentUser: Meteor.user(),
    currentUserReady: subUserData.ready(),
  };
}, AppLayout);
