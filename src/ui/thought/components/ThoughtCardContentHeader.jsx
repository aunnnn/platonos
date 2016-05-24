import React from 'react';
import './ThoughtCardContentHeader.import.css';

const ThoughtCardContentHeader = ({ headerText, descriptionText }) => (
  <div>
    <div>
      {headerText}
    </div>
    <div>
      {descriptionText}
    </div>
  </div>
);

ThoughtCardContentHeader.propTypes = {
  headerText: React.PropTypes.string,
  descriptionText: React.PropTypes.string,
};

export default ThoughtCardContentHeader;
