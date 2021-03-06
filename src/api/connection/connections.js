import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


class ConnectionCollection extends Mongo.Collection {

}


const Connections = new ConnectionCollection('Connections');

if (Meteor.isServer) {
  Connections._ensureIndex({ user_id: 1 });
}


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
    defaultValue: [],
  },
});

Connections.attachSchema(Connections.schema);

export { Connections };
