import React from 'react';
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';
import { Meteor } from 'meteor/meteor';
import WriteThoughtCardLayout from '../../thought/layouts/WriteThoughtCardLayout.jsx';
import moment from 'moment';

export default class PersonalFeed extends React.Component {

  constructor(props) {
    super(props);

    this.renderPost = this.renderPost.bind(this);
  }

  renderPost(post) {
    const content = post.content;
    if (post.type === 'THOUGHT') {
      const thought = content;
      // return <ThoughtCardLayout key={thought._id} thought={thought} />;
      return (
        <div>
          <p>{thought.category.title}</p>
          <h3>{thought.header}</h3>
          <h4>{thought.description}</h4>
        </div>
      );
    } else if (post.type === 'FRIEND_THOUGHT') {
      const friendThought = content;
      // return <div>Its Friend's thought man!</div>;
      return (
        <div>
          <img width="40" height="40" src={friendThought.user_picture} role="presentation" />
          <h4>{friendThought.user_fullname} {moment(friendThought.created_at).fromNow()}</h4>
          <p>{friendThought.type} {friendThought.category.title}</p>
          <hr />
          <h3>{friendThought.header}</h3>
          <p>{friendThought.description}</p>
        </div>
      );
    } else if (post.type === 'ACTIVITY') {
      const activity = content;
      // return <div>Its Activity man!</div>;
      return (
        <div>{JSON.stringify(activity)}</div>
      );
    } else {
      console.log("Something wrong, what type is this?");
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
            : (<div>Loading...</div>)}
      </div>
    );
  }
}

PersonalFeed.propTypes = {
  feeds: React.PropTypes.array,
  feedsReady: React.PropTypes.bool,
};
