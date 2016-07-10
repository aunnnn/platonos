import { Meteor } from 'meteor/meteor';

function followCategory(categoryObj) {
  return () => {
    Meteor.users.methods.followCategory.call(JSON.stringify(categoryObj));
  };
}

function unfollowCategory(categoryId) {
  return () => {
    console.log(categoryId);
    Meteor.users.methods.unfollowCategory.call(categoryId);
  };
}

export { followCategory, unfollowCategory };
