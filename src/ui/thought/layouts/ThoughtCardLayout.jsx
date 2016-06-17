import { Meteor } from 'meteor/meteor';
import React from 'react';

// collections
import { Discussions } from '../../../api/discussion/discussions.js';

// components
import ThoughtCardUpperInfo from '../components/ThoughtCardUpperInfo.jsx';
import ThoughtCardContentHeader from '../components/ThoughtCardContentHeader.jsx';
import ThoughtCardActionDiscuss from '../components/ThoughtCardActionDiscuss.jsx';
import ThoughtCardActionBar from '../components/ThoughtCardActionBar.jsx';
import ThoughtCardShowDiscussion from '../components/ThoughtCardShowDiscussion.jsx';
import moment from 'moment';

import './ThoughtCardLayout.import.css';

class ThoughtCardLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussionMessage: '',
      discussions: null,
      myDiscussion: 'not loaded',
    };

    this.setDiscussionMessage = (text) => this.setState({ discussionMessage: text });
    this.createDiscussion = this.createDiscussion.bind(this);
    this.loadPreviewDiscussions = this.loadPreviewDiscussions.bind(this);
    this.loadMyDiscussion = this.loadMyDiscussion.bind(this);
  }

  componentDidMount() {
    this.loadPreviewDiscussions();
    this.loadMyDiscussion();
  }

  loadMyDiscussion() {
    const thoughtId = this.props.thought._id;
    Discussions.methods.getMyDiscussion.call({ thoughtId }, (err, result) => {
      if (err) {
        console.log(err.reason);
        this.setState({
          myDiscussion: null,
        });
      } else {
        if (typeof result === 'undefined') {
          this.setState({
            myDiscussion: null,
          });
        } else {
          this.setState({
            myDiscussion: result,
          });
        }
      }
    });
  }

  loadPreviewDiscussions() {
    const {
      type,
      _id: thoughtId,
     } = this.props.thought;

    if (type === 'GLOBAL') {
      Discussions.methods.getDiscussions.call({ thoughtId }, (err, result) => {
        if (err) {
          console.log(err.reason);
        } else {
          this.setState({
            discussions: result,
          });
        }
      });
    }
  }

  createDiscussion() {
    const {
      _id,
      user_id,
      category,
      header,
      description,
    } = this.props.thought;

    const discussion = {
      thought: {
        _id,
        user_id,
        header,
        description,
        category: category.title,
      },
      created_by: Meteor.userId(),
      first_message: this.state.discussionMessage,
      latest_message: this.state.discussionMessage,
      last_active: new Date(),
    };

    // reset discussion message state
    this.setState({
      discussionMessage: '',
    });
    this.refs.cardActionDiscuss.reset();

    // create discussion
    Discussions.methods.insert.call({ discussion }, (err, result) => {
      if (err) {
        console.log(err.reason);
      } else {
        // reset all after create a discussion
        this.loadPreviewDiscussions();
        this.loadMyDiscussion();
      }
    });
  }

  render() {
    const {
      category,
      type,
      header,
      description,
      user_id: byUserId,
      created_at,
    } = this.props.thought;

    const {
      discussions,
      myDiscussion,
    } = this.state;

    // global discusssions
    let previewDiscussionCmp = null;
    if (type === 'GLOBAL') {
      if (discussions !== null) {
        if (discussions.length !== 0) {
          previewDiscussionCmp = <ThoughtCardShowDiscussion discussions={discussions} />;
        } else {
          previewDiscussionCmp = '';
        }
      } else {
        // global, but discussions is null == loading
        previewDiscussionCmp = 'Loading Discussions...';
      }
    } else {
      previewDiscussionCmp = '';
    }

    // action discussion
    let actionDiscussionCmp = null;
    if (Meteor.userId() !== byUserId) {
      if (myDiscussion !== 'not loaded') {
        if (myDiscussion !== null) {
          actionDiscussionCmp = (
            <div className="already-discussed">
              You: {myDiscussion.first_message}
            </div>
          );
        } else {
          actionDiscussionCmp = (
            <ThoughtCardActionDiscuss
              createDiscussion={this.createDiscussion}
              setDiscussionMessage={this.setDiscussionMessage}
              ref="cardActionDiscuss"
            />
          );
        }
      } else {
        actionDiscussionCmp = 'Loading my discussion...';
      }
    } else {
      actionDiscussionCmp = `By you on ${moment(created_at).format('MM/DD/YYYY')}`;
    }

    return (
      <div className="thought-card-layout">
        {
          // category & thought type
        }
        <div
          className="upper-padding"
          style={{ paddingBottom: description !== '' ? '10px' : '0' }}
        >
          <ThoughtCardUpperInfo
            category={category.title}
            type={type}
          />
          <ThoughtCardContentHeader
            header={header}
            description={description}
          />
        </div>

        {
          // show global discussion
        }
        {previewDiscussionCmp}
        {
          // action & start discuss
        }
        <div className="lower-action">
          <ThoughtCardActionBar type={type} />
          {actionDiscussionCmp}
        </div>
      </div>
    );
  }
}

ThoughtCardLayout.propTypes = {
  thought: React.PropTypes.object,
};

export default ThoughtCardLayout;
