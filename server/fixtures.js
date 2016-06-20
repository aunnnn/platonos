import { Meteor } from 'meteor/meteor';
import { Categories } from '../src/api/thought/categories.js';
import { Accounts } from 'meteor/accounts-base';
import { Thoughts } from '../src/api/thought/thoughts.js';
import { Discussions } from '../src/api/discussion/discussions.js';

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


Meteor.startup(() => {
  dumpCategories();
  dumpUsers();
  // console.log(_.sample(Categories.find().fetch()).title);
  // console.log(_.sample(Categories.find({}, { fields: { 'title': 1 } })));
});
