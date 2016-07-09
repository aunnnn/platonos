import { Meteor } from 'meteor/meteor';

function followCategory(categoryObj) {
  return () => {
    Meteor.users.methods.followCategory.call(JSON.stringify(categoryObj));
  };
}

export { followCategory };
