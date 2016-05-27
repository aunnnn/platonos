import React from 'react';

const ThoughtCardContentHeader = ({ header, description }) => (
  <div className="content">
    <div className="header">
      <h5>{header}</h5>
    </div>
    <div className="description">
      {description}
    </div>
  </div>
);

ThoughtCardContentHeader.propTypes = {
  header: React.PropTypes.string,
  description: React.PropTypes.string,
};

export default ThoughtCardContentHeader;
