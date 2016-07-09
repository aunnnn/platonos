import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class CategoryCollection extends Mongo.Collection {

}


const Categories = new CategoryCollection('Categories');

Categories.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

if (Meteor.isServer) {
  Categories._ensureIndex({ title: 1 });
}

Categories.schema = new SimpleSchema({
  title: {
    type: String,
    min: 1,
  },

  description: {
    type: String,
    min: 1,
  },

});

Categories.attachSchema(Categories.schema);

export { Categories };
