import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import CategoryFeed from '../layouts/CategoryFeed.jsx';

export default createContainer(({ params: { categoryName }, currentUser }) => {
  // const todosHandle = Meteor.subscribe('todos.inList', id);
  // const loading = !todosHandle.ready();
  // const list = Lists.findOne(id);
  // const listExists = !loading && !!list;
  return {
    categoryName,
    currentUser,
  };
}, CategoryFeed);
