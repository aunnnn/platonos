import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ThoughtCollection extends Mongo.Collection {

}


const Thoughts = new ThoughtCollection('Thoughts');

Thoughts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Thoughts.schema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },

  type: {
    type: String,
    allowedValues: ['NORMAL', 'GLOBAL'],
    label: 'Type of thought',
  },

  header: {
    type: String,
    label: 'Header of thought',
    min: 1,
  },

  description: {
    type: String,
    label: 'Description of thought',
  },

  like_count: {
    type: Number,
    defaultValue: 0,
  },

  seen_count: {
    type: Number,
    defaultValue: 0,
  },

  // 'category._id': {
  //   type: String,
  //   regEx: SimpleSchema.RegEx.Id,
  // },
  // 'category.title': {
  //   type: String,
  // },

  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    },
    denyUpdate: true,
  },

});

Thoughts.attachSchema(Thoughts.schema);

Thoughts.publicFields = {
  type: 1,
  title: 1,
  description: 1,
  category: 1,
  createdAt: 1,
};

export default Thoughts;
