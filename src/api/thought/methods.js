import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Thoughts } from './thoughts.js';
import { DraftThoughts } from './draftThoughts.js';
import { Connections } from '../connection/connections.js';
import { Actions } from '../feed/actions.js';
import { Feeds } from '../feed/feeds.js';
import moment from 'moment';
/*
======= Thought methods =======
*/
Thoughts.methods = {};

Thoughts.methods.insert = new ValidatedMethod({
  name: 'thoughts.insert',
  validate: null,
  run({ thought }) {
    if (!this.userId) {
      throw new Meteor.Error('thoughts.insert.notLoggedIn',
        'Must be logged in to publish thought.');
    }

    // launch this thought
    const thoughtId = Thoughts.insert(thought);

    // if server, notify all friends about this thought launch.
    if (Meteor.isServer) {
      const allFriends = Connections.findOne({ user_id: this.userId }).friends;
      const user = Meteor.users.findOne({ _id: this.userId });
      if (!user) {
        console.log('Something wrong. Current user is invalid.');
      } else {
        console.log(`user who launched is ${JSON.stringify(user)} `);
        // console.log(`all friends ${allFriends}`);
        if (allFriends) {
          // for all friends
          allFriends.forEach((friend) => {
            const embedThought = {
              thought_id: thoughtId,
              user_id: this.userId,
              user_picture: user.appProfile.picture,
              user_fullname: `${user.appProfile.first_name} ${user.appProfile.last_name}`,
              type: thought.type,
              header: thought.header,
              description: thought.description,
              category: {
                title: thought.category.title,
              },
              created_at: thought.created_at,
            };

            // console.log(`embedThought ${JSON.stringify(embedThought)}`);

            // Actions.subSchema_FriendThought.validate(embedThought);
            const action = {
              user_id: friend.user_id,
              type: 'FRIEND_THOUGHT',
              content: embedThought,
              dispatched: false,
            };

            // insert action to this friend, waiting to be dispatched by bg process...
            Actions.insert(action);
          });
        } else {
          // no friend
        }

        // Also put my own thought on Feed and Action
        const embedThought = {
          thought_id: thoughtId,
          user_id: this.userId,
          user_picture: user.appProfile.picture,
          user_fullname: `${user.appProfile.first_name} ${user.appProfile.last_name}`,
          type: thought.type,
          header: thought.header,
          description: thought.description,
          category: {
            title: thought.category.title,
          },
          created_at: thought.created_at,
        };
        const action = {
          user_id: this.userId,
          type: 'MY_THOUGHT',
          content: embedThought,
          dispatched: true,
        };
        Actions.insert(action);
        const currentYM = Feeds.currentYearMonthCode();
        Feeds.update(
          { user_id: user._id, year_month: currentYM },
          { $push: { posts: action } }
        );
      }
    }
    // * end if server


    return thoughtId;
  },
});

/*
======= Draft methods =========
*/
DraftThoughts.methods = {};

DraftThoughts.methods.insert = new ValidatedMethod({
  name: 'draftThoughts.insert',
  validate: null,
  run({ draftThought }) {
    if (!this.userId) {
      throw new Meteor.Error('draftThought.insert.notLoggedIn',
        'Must be logged in to save thought.');
    }
    return DraftThoughts.insert(draftThought);
  },
});
