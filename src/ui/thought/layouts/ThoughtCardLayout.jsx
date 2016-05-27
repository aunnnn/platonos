import React from 'react';
import ThoughtCardUpperInfo from '../components/ThoughtCardUpperInfo.jsx';
import ThoughtCardContentHeader from '../components/ThoughtCardContentHeader.jsx';
import ThoughtCardActionDiscuss from '../components/ThoughtCardActionDiscuss.jsx';
import ThoughtCardActionBar from '../components/ThoughtCardActionBar.jsx';
import ThoughtCardShowDiscussion from '../components/ThoughtCardShowDiscussion.jsx';

import './ThoughtCardLayout.import.css';

class ThoughtCardLayout extends React.Component {
  render() {
    const {
      category,
      type,
      header,
      description,
    } = this.props.thought;

    return (
      <div className="thought-card-layout">
        {
          // category & thought type
        }
        <div className="upper-padding">
          <ThoughtCardUpperInfo
            category={category}
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
        {type === 'GLOBAL' ? <ThoughtCardShowDiscussion /> : ''}

        {
          // action & start discuss
        }
        <div className="lower-action">
          <ThoughtCardActionBar />
          <ThoughtCardActionDiscuss />
        </div>
      </div>
    );
  }
}

ThoughtCardLayout.propTypes = {
  thought: React.PropTypes.object,
};

export default ThoughtCardLayout;
