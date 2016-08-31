import { Meteor } from 'meteor/meteor';
import React from 'react';
import moment from 'moment';

// components
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';
import ThoughtCardLayoutFriend from '../../thought/layouts/ThoughtCardLayoutFriend.jsx';
import WriteThoughtCardLayout from '../../thought/layouts/WriteThoughtCardLayout.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';


export default class PersonalFeed extends React.Component {

  constructor(props) {
    super(props);
    this.renderPost = this.renderPost.bind(this);
  }

  // Render posts according to its type
  renderPost(post) {
    const content = post.content;
    if (post.type === 'THOUGHT') {
      const thought = content;
      // console.log(`render anon. thought ${JSON.stringify(thought)}`);
      return (
        <ThoughtCardLayout
          key={thought.thought_id}
          thought={thought}
          currentUser={this.props.currentUser}
        />
      );
    } else if (post.type === 'FRIEND_THOUGHT' || post.type === 'MY_THOUGHT') {
      const friendThought = content;
      // return <div>Its Friend's thought man!</div>;
      return (
        <ThoughtCardLayoutFriend
          key={friendThought.thought_id}
          currentUser={this.props.currentUser}
          friendThought={friendThought}
        />
      );
    } else if (post.type === 'ACTIVITY') {
      const activity = content;
      // return <div>Its Activity man!</div>;
      return (
        <div>{JSON.stringify(activity)}</div>
      );
    } else {
      console.log(`Something wrong, what type is this? ${post.type}`);
      return <div>Something wrong</div>;
    }
  }

  render() {
    const {
      feeds,
      feedsReady,
    } = this.props;


    // because we use 'find', so we only need to get first item (if we can).
    const userPosts = feeds.length >= 1 ? feeds[0].posts : [];
    userPosts.reverse();
    return (
      <div>
        <WriteThoughtCardLayout />
        {feedsReady ?
            userPosts.map((post) => this.renderPost(post))
            : (<OrbitLoader />)}
      </div>
    );
  }
}

PersonalFeed.propTypes = {
  feeds: React.PropTypes.array,
  feedsReady: React.PropTypes.bool,
  currentUser: React.PropTypes.object,
};

// <div key={friendThought._id}>
//           <img width="40" height="40" src={friendThought.user_picture} role="presentation" />
//           <h5>{friendThought.user_fullname}</h5>
//           <p>{friendThought.type} {friendThought.category.title}</p>
//           <h5>{friendThought.header}</h5>
//           <p>{friendThought.description}</p>
//           <p>{moment(friendThought.created_at).fromNow()}</p>
//           <hr />
//         </div>
