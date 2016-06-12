import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function userData() {
  const user = Meteor.users.find({ _id: this.userId }, {
    fields: {
      'services.password.bcrypt': false,
    },
  });
  return user || [];
});
