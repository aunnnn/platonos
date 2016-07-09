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
