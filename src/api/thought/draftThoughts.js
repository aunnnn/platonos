import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class DraftThoughtCollection extends Mongo.Collection {

}


const DraftThoughts = new DraftThoughtCollection('DraftThoughts');

DraftThoughts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

DraftThoughts.schema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "User's Id",
  },

  header: {
    type: String,
    label: 'Header of thought',
    min: 1,
  },

  description: {
    type: String,
    label: 'Description of thought',
    optional: true,
  },

  created_at: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    },
    denyUpdate: true,
  },

});

DraftThoughts.attachSchema(DraftThoughts.schema);

export { DraftThoughts };
