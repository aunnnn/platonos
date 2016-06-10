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

import './ThoughtCardLayout.import.css';

class ThoughtCardLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussionMessage: '',
    };

    this.setDiscussionMessage = (text) => this.setState({ discussionMessage: text });
    this.createDiscussion = this.createDiscussion.bind(this);
  }

  createDiscussion() {
    const {
      _id,
      category,
      header,
      description,
    } = this.props.thought;

    const discussion = {
      thought: {
        _id,
        header,
        description,
        category: category.title,
      },
      created_by: Meteor.userId(),
      first_message: this.state.discussionMessage,
      latest_message: this.state.discussionMessage,
      last_active: new Date(),
    };

    console.log(discussion);

    // reset state
    this.state = {
      discussionMessage: '',
    };
    this.refs.cardActionDiscuss.reset();

    // create discussion
    Discussions.methods.insert.call({ discussion }, (err, result) => {
      if (err) {
        console.log(err.reason);
      } else {
        console.log(result);
      }
    });
  }

  render() {
    const {
      category,
      type,
      header,
      description,
      discussions = [],
    } = this.props.thought;
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
        {type === 'GLOBAL' && discussions.length !== 0 ?
          <ThoughtCardShowDiscussion
            discussions={discussions}
          />
          : ''
        }

        {
          // action & start discuss
        }
        <div className="lower-action">
          <ThoughtCardActionBar
            type={type}
          />
          <ThoughtCardActionDiscuss
            createDiscussion={this.createDiscussion}
            setDiscussionMessage={this.setDiscussionMessage}
            ref="cardActionDiscuss"
          />
        </div>
      </div>
    );
  }
}

ThoughtCardLayout.propTypes = {
  thought: React.PropTypes.object,
};

export default ThoughtCardLayout;
