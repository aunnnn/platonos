import React from 'react';
import ThoughtCardUpperInfo from '../components/ThoughtCardUpperInfo.jsx';
import ThoughtCardContentHeader from '../components/ThoughtCardContentHeader.jsx';
import ThoughtCardActionDiscuss from '../components/ThoughtCardActionDiscuss.jsx';
import ThoughtCardActionBar from '../components/ThoughtCardActionBar.jsx';

import './ThoughtCardLayout.import.css';

class ThoughtCardLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="thought-card-layout">
        <div className="upper-padding">
          <ThoughtCardUpperInfo categoryName="Philosophy" />
          <ThoughtCardContentHeader
            headerText="What the hell"
            descriptionText="I don't know about you."
          />
        </div>
        <div className="lower-action">
          <ThoughtCardActionBar />
          <ThoughtCardActionDiscuss />
        </div>
      </div>
    );
  }
}

ThoughtCardLayout.propTypes = {
  categoryName: React.PropTypes.string,
};

export default ThoughtCardLayout;
