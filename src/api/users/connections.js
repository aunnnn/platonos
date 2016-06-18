import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class ConnectionCollection extends Mongo.Collection {

}


const Connections = new ConnectionCollection('Connections');

Connections.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Connections.schema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },  
  description: {
    type: String,
    min: 1,
  },

});

Connections.attachSchema(Connections.schema);

export { Connections };
