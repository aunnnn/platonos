import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Categories } from './categories.js';

/*
======= Category methods =========
*/
Categories.methods = {};

Categories.methods.getAllCategories = new ValidatedMethod({
  name: 'categories.getAllCategories',
  validate: null,
  run() {
    return Categories.find({}).fetch();
  },
});
