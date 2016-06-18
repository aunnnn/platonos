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

const ConnectedFriendSchema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "Friend's Id",
  },
  connected_at: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    },
    denyUpdate: true,
    label: 'Date of connection',
  },
  discussion_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'Connect by discussion',
  },
  initiator_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'User Id who initiated the connection',
  },
});

Connections.schema = new SimpleSchema({
  user_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  friends: {
    type: [ConnectedFriendSchema],
    label: 'Bucket of connected friends',
  },
});

Connections.attachSchema(Connections.schema);

export { Connections };
