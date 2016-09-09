import React from 'react';

// collection
import { Feeds } from '../../../api/feed/feeds.js';

// components
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';
import ThoughtCardLayoutFriend from '../../thought/layouts/ThoughtCardLayoutFriend.jsx';
import WriteThoughtCardLayout from '../../thought/layouts/WriteThoughtCardLayout.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';
import { _ } from 'meteor/underscore';

export default class PersonalFeed extends React.Component {

  constructor(props) {
    super(props);
    this.renderPost = this.renderPost.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      feedReady: true,
      feedErrorMessage: null,
    };
  }

  componentDidMount() {
    this.handleScroll = _.throttle(this.handleScroll);
    window.addEventListener('scroll', this.handleScroll);
    this.fetchPost();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchPost() {
    const {
      feedReady,
    } = this.state;

    if (!feedReady) { return; }

    const {
      currentYMSequence: yearMonthSequenceCount,
      currentYMStartIndex: startIndex,
    } = this.props;

    const endIndex = startIndex + 5;
    console.log(`ym: ${yearMonthSequenceCount}, start: ${startIndex}, end: ${endIndex}`);

    // show loading
    this.setState({
      feedReady: false,
    });

    Feeds.methods.getPosts.call({
      yearMonthSequenceCount,
      startIndex,
      endIndex,
    }, (err, result) => {
      if (err) {
        console.log(`load more error ${err}`);
        this.setState({
          feedReady: true,
          feedErrorMessage: `We cannot retrieve your feed: ${err}`,
        });
      } else {
        this.props.didFetchMorePosts(result);
        this.setState({
          feedReady: true,
          feedErrorMessage: null,
        });
        console.log(`load more result success ${result.length}`);
      }
    });
  }

  handleScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.fetchPost();
    }
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
    }
    console.log(`Something wrong, what type is this? ${post.type}`);
    return <div>Something wrong</div>;
  }

  render() {
    const {
      posts,
    } = this.props;
    const {
      feedReady,
      feedErrorMessage,
    } = this.state;

    console.log(`feed render ready? ${feedReady}`);
    const errorMessage = feedErrorMessage !== null ? feedErrorMessage : '';

    return (
      <div ref="feedContent">
        <WriteThoughtCardLayout />
        {posts.map((post) => this.renderPost(post))}
        {feedReady ? errorMessage : (<OrbitLoader />)}
      </div>
    );
  }
}

PersonalFeed.propTypes = {
  // feeds: React.PropTypes.array,
  // feedsReady: React.PropTypes.bool,
  // itemsCount: React.PropTypes.object,
  currentYMSequence: React.PropTypes.number.isRequired,
  currentYMStartIndex: React.PropTypes.number.isRequired,
  posts: React.PropTypes.array,
  didFetchMorePosts: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired,
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
