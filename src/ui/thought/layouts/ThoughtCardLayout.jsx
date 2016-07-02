import { Meteor } from 'meteor/meteor';
import React from 'react';
import classNames from 'classnames';

// collections
import { Discussions } from '../../../api/discussion/discussions.js';

// components
import ThoughtCardUpperInfo from '../components/ThoughtCardUpperInfo.jsx';
import ThoughtCardContentHeader from '../components/ThoughtCardContentHeader.jsx';
import ThoughtCardActionDiscuss from '../components/ThoughtCardActionDiscuss.jsx';
import ThoughtCardActionBar from '../components/ThoughtCardActionBar.jsx';
import ThoughtCardShowDiscussion from '../components/ThoughtCardShowDiscussion.jsx';
import ThoughtCardAlreadyDiscussed from '../components/ThoughtCardAlreadyDiscussed.jsx';
import { OrbitLoader } from '../../app/components/Loader.jsx';

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
      Discussions.methods.getPreviewDiscussions.call({ thoughtId }, (err, result) => {
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
      thought: {
        _id,
        category,
        type,
        header,
        description,
        user_id: byUserId,
        created_at,
      },
      isPage,
    } = this.props;

    const {
      discussions,
      myDiscussion,
    } = this.state;

    const currentUser = Meteor.user().appProfile;
    const isOwner = Meteor.userId() === byUserId;

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
        previewDiscussionCmp = <OrbitLoader />;
      }
    } else {
      previewDiscussionCmp = '';
    }

    // action discussion
    let actionDiscussionCmp = null;
    if (!isOwner) {
      if (myDiscussion !== 'not loaded') {
        if (myDiscussion !== null) {
          actionDiscussionCmp = (
            <ThoughtCardAlreadyDiscussed
              message={myDiscussion.first_message}
              currentUser={currentUser}
            />
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
        actionDiscussionCmp = (
          <div className="action-discuss">
            <div className="wrapper">
              'Loading my discussion...'
            </div>
          </div>
        );
      }
    }

    return (
      <div className={classNames('tcl', { owned: isOwner })}>
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
            currentUser={currentUser}
            isOwner={isOwner}
            created_at={created_at}
          />
          <ThoughtCardContentHeader
            header={header}
            description={description}
            thoughtId={_id}
          />
        </div>

        {
          // show global discussion
        }
        {isPage ? '' : previewDiscussionCmp}
        {
          // action & start discuss
        }
        <div className="lower-action">
          <ThoughtCardActionBar type={type} isOwner={isOwner} />
          {actionDiscussionCmp}
        </div>
      </div>
    );
  }
}

ThoughtCardLayout.propTypes = {
  thought: React.PropTypes.object,
  isPage: React.PropTypes.bool,
};

export default ThoughtCardLayout;
