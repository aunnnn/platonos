import { Meteor } from 'meteor/meteor';
import { Categories } from '../src/api/thought/categories.js';
// import { Accounts } from 'meteor/accounts-base';
// import { Thoughts } from '../src/api/thought/thoughts.js';
// import { Discussions } from '../src/api/discussion/discussions.js';

// import { _ } from 'meteor/underscore';
// import faker from 'faker';

// function dumpDiscussions(embedThought) {
//   if (Discussions.find({ thought_id: embedThought._id }).count() < 10) {
//     _.times(10, () => {
//       if (Math.random() >= 0.4) {
//         const created_by = _.sample(Meteor.users.find().fetch())._id;
//         const first_message = faker.lorem.sentence();

//         const discussion = {
//           thought: embedThought,
//           created_by,
//           first_message,
//           latest_message: first_message,
//           last_active: faker.date.recent(10),
//         };
//         Discussions.insert(discussion);
//       }
//     });
//   }
// }

// function dumpThoughts(userId) {
//   if (Thoughts.find({ user_id: userId }).count() < 10) {
//     _.times(10, () => {
//       if (Math.random() >= 0.5) {
//         const type = Math.random() >= 0.5 ? 'NORMAL' : 'GLOBAL';
//         const categoryTitle = _.sample(Categories.find().fetch()).title;
//         const thought = {
//           user_id: userId,
//           type,
//           header: faker.lorem.sentence(),
//           description: faker.lorem.paragraph(),
//           category: {
//             title: categoryTitle,
//           },
//         };

//         const thoughtId = Thoughts.insert(thought);
//         const embedThought = {
//           _id: thoughtId,
//           user_id: userId,
//           header: thought.header,
//           description: thought.description,
//           category: categoryTitle,
//         };
//         dumpDiscussions(embedThought);
//       }
//     });
//   }
// }

// function dumpUsers() {
//   // if number of users less than 30
//   if (Meteor.users.find().count() < 30) {
//     _.times(20, (n) => {
      

//       // fake appProfile
//       const men = Math.random() >= 0.5;
//       const gender = men ? 1 : 0;
//       const sex = men ? 'men' : 'women';
//       const first_name = faker.name.firstName(gender);
//       const last_name = faker.name.lastName();
//       const address = {
//         born: `${faker.address.zipCode()} ${faker.address.streetName()}`,
//         lives: `${faker.address.zipCode()} ${faker.address.streetName()}`,
//       };
//       const description = `${faker.lorem.sentence()} My name is ${first_name}`;

//       // register new user
//       const userId = Accounts.createUser({
//         email: faker.internet.email(first_name),
//         password: '1234',
//       });

//       const appProfile = {
//         picture: `https://randomuser.me/api/portraits/thumb/${sex}/${n}.jpg`,
//         first_name,
//         last_name,
//         address,
//         description,
//       };
//       Meteor.users.update({ _id: userId }, { $set: { appProfile } });

//       // create thoughts for this user
//       dumpThoughts(userId);
//     });
//   }
// }

function dumpCategories() {
  if (Categories.find().count() === 0) {
    const dummyCategoryData = [
      {
        title: 'General',
        description: 'All the things in the world.',
      },
      {
        title: 'Science',
        description: 'Fuel of human civilization.',
      },
      {
        title: 'Space',
        description: 'The future of humanity is there.',
      },
      {
        title: 'Technology',
        description: 'The world \'s a better place',
      },
      {
        title: 'Environment',
        description: 'Humanity exists because of it.',
      },
      {
        title: 'Psychology',
        description: 'See through your mind.',
      },
      {
        title: 'Philosophy',
        description: 'Things you want to think.',
      },
      {
        title: 'Moral',
        description: 'Are you sure that this is right?',
      },
      {
        title: 'Humantity',
        description: 'You, me, all of us.',
      },
      {
        title: 'Life',
        description: 'Our existence.',
      },
      {
        title: 'Productivity',
        description: 'How to thrive, at your best.',
      },
      {
        title: 'History',
        description: 'Human civilization\'s story',
      },
      {
        title: 'Politics',
        description: 'It is about politics, man.',
      },
      {
        title: 'World',
        description: 'Our home.',
      },
      {
        title: 'Economics',
        description: 'Make the world spin everyday.',
      },
      {
        title: 'Business',
        description: 'Modern conquest.',
      },
      {
        title: 'Art',
        description: 'concrete from of our mind.',
      },
      {
        title: 'Design',
        description: 'ddd',
      },
      {
        title: 'Film',
        description: 'ddd',
      },
      {
        title: 'Music',
        description: 'ddd',
      },
      {
        title: 'Literature',
        description: 'ddd',
      },
    ];

    dummyCategoryData.forEach((category) => {
      Categories.insert(category);
    });
  }
}


Meteor.startup(() => {
  // dumpCategories();
  // dumpUsers();
  // console.log(_.sample(Categories.find().fetch()).title);
  // console.log(_.sample(Categories.find({}, { fields: { 'title': 1 } })));
});
