// import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// const Users = new Mongo.Collection('users');

// export default Users;

// // Deny all client-side updates (use methods instead)
// Users.deny({
//   insert() { return true; },
//   update() { return true; },
//   remove() { return true; },
// });

// Users.schema = new SimpleSchema({
//   name: {
//     type: String,
//     min: 1,
//     max: 80,
//   },
//   email: {
//     type: String,
//     regEx: SimpleSchema.RegEx.Email,
//   },
//   password: {
//     type: String,
//     min: 8,
//   },
//   createdAt: {
//     type: Date,
//     denyUpdate: true,
//   },
// });

// Users.attachSchema(Users.schema);
