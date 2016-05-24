import React from 'react';
import './ThoughtCardUpperInfo.import.css';

const ThoughtCardUpperInfo = ({ categoryName }) => (
  <div className="category-header">
    <i className="fa fa-lightbulb-o"></i>
    <div className="category-label">
      {categoryName}
    </div>
  </div>
);

ThoughtCardUpperInfo.propTypes = {
  categoryName: React.PropTypes.string,
};

export default ThoughtCardUpperInfo;
