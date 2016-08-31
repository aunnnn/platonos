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
      previewDiscussions: null,
      myDiscussion: 'not loaded',
    };
    this.loadPreviewDiscussions = this.loadPreviewDiscussions.bind(this);
    this.loadMyDiscussion = this.loadMyDiscussion.bind(this);
  }

  componentDidMount() {
    this.loadPreviewDiscussions();
    this.loadMyDiscussion();
  }

  loadMyDiscussion() {
    const thoughtId = this.props.thought.thought_id;
    Discussions.methods.getMyDiscussion.call({ thoughtId }, (err, result) => {
      if (err) {
        this.setState({
          myDiscussion: null,
        });
      } else {
        if (typeof result === 'undefined') {
          this.setState({
            myDiscussion: null,
          });
        } else {
          console.log(`my discussion for thoughtId ${thoughtId} is found!`);
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
      thought_id: thoughtId,
     } = this.props.thought;

    if (type === 'GLOBAL') {
      Discussions.methods.getPreviewDiscussions.call({ thoughtId }, (err, result) => {
        if (err) {
          console.log(err.reason);
        } else {
          this.setState({
            previewDiscussions: result,
          });
        }
      });
    }
  }

  renderActionDiscussComponent(isOwner, currentUser) {
    const { myDiscussion } = this.state;
    if (!isOwner) {
      if (myDiscussion !== 'not loaded') {
        if (myDiscussion !== null) {
          return (
            <ThoughtCardAlreadyDiscussed
              message={myDiscussion.first_message}
              currentUser={currentUser}
            />
          );
        }
        return (
          <ThoughtCardActionDiscuss
            thought={this.props.thought}
            loadPreviewDiscussions={this.loadPreviewDiscussions}
            loadMyDiscussion={this.loadMyDiscussion}
            currentUser={currentUser}
          />
        );
      }
      return (
        <div className="action-discuss">
          <div className="wrapper">
            <OrbitLoader />
          </div>
        </div>
      );
    }
    return '';
  }

  render() {
    const {
      thought: {
        thought_id,
        category,
        type,
        header,
        description,
        user_id: byUserId,
        created_at,
      },
      isPage,
      currentUser,
    } = this.props;

    const {
      previewDiscussions,
    } = this.state;

    const isOwner = currentUser._id === byUserId;

    // global discusssions
    let previewDiscussionCmp = null;
    if (type === 'GLOBAL') {
      if (previewDiscussions !== null) {
        if (previewDiscussions.length !== 0) {
          previewDiscussionCmp = <ThoughtCardShowDiscussion discussions={previewDiscussions} />;
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
            thoughtId={thought_id}
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
          {this.renderActionDiscussComponent(isOwner, currentUser)}
        </div>
      </div>
    );
  }
}

ThoughtCardLayout.propTypes = {
  thought: React.PropTypes.object,
  isPage: React.PropTypes.bool,
  currentUser: React.PropTypes.object,
};

export default ThoughtCardLayout;
