import React from 'react';
import './ThoughtCardContentHeader.import.css';

const ThoughtCardContentHeader = ({ headerText, descriptionText }) => (
  <div className="content-header">
    <div className="content-header-main">
      <h5>{headerText}</h5>
    </div>
    <div className="content-header-description">
      {descriptionText}
    </div>
  </div>
);

ThoughtCardContentHeader.propTypes = {
  headerText: React.PropTypes.string,
  descriptionText: React.PropTypes.string,
};

export default ThoughtCardContentHeader;
