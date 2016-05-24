import React from 'react';
import ThoughtCardUpperInfo from '../components/ThoughtCardUpperInfo.jsx';
import ThoughtCardContentHeader from '../components/ThoughtCardContentHeader.jsx';

class ThoughtCardLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="thought-card-layout">
        <ThoughtCardUpperInfo categoryName="Philosophy" />
        <ThoughtCardContentHeader headerText="What the hell" descriptionText="I don't know"/>
      </div>
    );
  }
}

ThoughtCardLayout.propTypes = {
  categoryName: React.PropTypes.string,
};

export default ThoughtCardLayout;
