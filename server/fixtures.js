import { Meteor } from 'meteor/meteor';
import { Feeds } from '../src/api/feed/feeds.js';
import { Categories } from '../src/api/thought/categories.js';
import { Accounts } from 'meteor/accounts-base';
import { Thoughts } from '../src/api/thought/thoughts.js';
import { Discussions } from '../src/api/discussion/discussions.js';
import { Connections } from '../src/api/users/connections.js';
import { _ } from 'meteor/underscore';
import faker from 'faker';

function dumpDiscussions(embedThought) {
  if (Discussions.find({ thought_id: embedThought._id }).count() < 10) {
    _.times(10, () => {
      if (Math.random() >= 0.4) {
        const created_by = _.sample(Meteor.users.find().fetch())._id;
        const first_message = faker.lorem.sentence();

        const discussion = {
          thought: embedThought,
          created_by,
          first_message,
          latest_message: first_message,
          last_active: faker.date.recent(10),
        };
        Discussions.insert(discussion);
      }
    });
  }
}

function dumpThoughts(userId) {  
  if (Thoughts.find({ user_id: userId }).count() < 10) {
    _.times(10, () => {
      if (Math.random() >= 0.5) {
        const type = Math.random() >= 0.5 ? 'NORMAL' : 'GLOBAL';
        const categoryTitle = _.sample(Categories.find().fetch()).title;
        const thought = {
          user_id: userId,
          type,
          header: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          category: {
            title: categoryTitle,
          },
        };

        const thoughtId = Thoughts.insert(thought);
        const embedThought = {
          _id: thoughtId,
          user_id: userId,
          header: thought.header,
          description: thought.description,
          category: categoryTitle,
        };
        dumpDiscussions(embedThought);
      }
    });
  }
}

function dumpUsers() {
  console.log("dump Users");
  // if number of users less than 30
  if (Meteor.users.find().count() < 30) {
    _.times(20, (n) => {
      

      // fake appProfile
      const men = Math.random() >= 0.5;
      const gender = men ? 1 : 0;
      const sex = men ? 'men' : 'women';
      const first_name = faker.name.firstName(gender);
      const last_name = faker.name.lastName();
      const address = {
        born: `${faker.address.zipCode()} ${faker.address.streetName()}`,
        lives: `${faker.address.zipCode()} ${faker.address.streetName()}`,
      };
      const description = `${faker.lorem.sentence()} My name is ${first_name}`;

      // register new user
      const userId = Accounts.createUser({
        email: faker.internet.email(first_name),
        password: '1234',
      });

      const appProfile = {
        picture: `https://randomuser.me/api/portraits/thumb/${sex}/${n}.jpg`,
        first_name,
        last_name,
        address,
        description,
      };
      Meteor.users.update({ _id: userId }, { $set: { appProfile } });

      // create thoughts for this user
      dumpThoughts(userId);
    });
  }
}

function dumpCategories() {
  console.log("dump Categories");
  if (Categories.find().count() === 0) {
    const dummyCategoryData = [
      {
        title: 'Philosophy',
        description: 'Things you want to think.',
      },
      {
        title: 'Politics',
        description: 'It is about politics, man.',
      },
      {
        title: 'World',
        description: 'World is us. Save the world.',
      },
      {
        title: 'Productivity',
        description: 'How to thrive, at your best.',
      },
      {
        title: 'Mathematics',
        description: 'Brave, very brave man.',
      },
      {
        title: 'Engineering',
        description: 'engineer motherfucker',
      },
      {
        title: 'Philosophy',
        description: 'Things you want to think.',
      },
      {
        title: 'Politics',
        description: 'It is about politics, man.',
      },
      {
        title: 'World',
        description: 'World is us. Save the world.',
      },
      {
        title: 'Productivity',
        description: 'How to thrive, at your best.',
      },
      {
        title: 'Mathematics',
        description: 'Brave, very brave man.',
      },
      {
        title: 'Engineering',
        description: 'engineer motherfucker',
      },
    ];

    dummyCategoryData.forEach((category) => {
      Categories.insert(category);
    });
  }
}

// connect two user in discussion
function dumpConnection(discussion) {
  const user1 = discussion.thought.user_id;
  const user2 = discussion.created_by;
  const initiator = Math.random() >= 0.5 ? user1 : user2;
  const connected_at = faker.date.recent(10);
  const connectionForUser1 = {
    user_id: user2,
    connected_at,
    discussion_id: discussion._id,
    initiator_id: initiator,
  };
  const connectionForUser2 = {
    user_id: user1,
    connected_at,
    discussion_id: discussion._id,
    initiator_id: initiator,
  };
  const user1_friends = Connections.findOne({ user_id: user1 }).friends;
  const user1_friend_ids = _.map(user1_friends, (friend) => { friend.user_id });

  const user2_friends = Connections.findOne({ user_id: user2 }).friends;
  const user2_friend_ids = _.map(user2_friends, (friend) => { friend.user_id });
  // console.log(`${user2_friend_ids} ${user1} ${_.contains(user2_friend_ids, user1)}`);
  if (!_.contains(user1_friend_ids, user2)) {
    Connections.update(
      { user_id: user1 }, 
      { $push: { friends: connectionForUser1 } });
  }
  if (!_.contains(user2_friend_ids, user1)) {
    Connections.update(
      { user_id: user2 }, 
      { $push: { friends: connectionForUser2 } });
  }
}

function dumpConnections() {
  console.log("dump Connections");
  const allDiscussions = Discussions.find().fetch();
  allDiscussions.forEach((discussion) => {
    if (Math.random() >= 0.8) {
      dumpConnection(discussion);
    }
  });
}

function resetUserConnection() {
  console.log("reset Connections collection");
  const allUsers = Meteor.users.find().fetch();
  allUsers.forEach((user) => {
    if (!Connections.findOne({ user_id: user._id })) {
      Connections.insert({ user_id: user._id, friends: [] });
    }
  });
}
function resetFeeds() {
 console.log('reset Feeds');
 const allUsers = Meteor.users.find().fetch();
 allUsers.forEach((user) => {
   if (!Feeds.findOne({ user_id: user._id })) {
     Feeds.insert({ user_id: user._id });
   }
 });
}

Meteor.startup(() => {

  dumpCategories();
  dumpUsers();
  resetUserConnection();
  dumpConnections();
  resetFeeds();
});
