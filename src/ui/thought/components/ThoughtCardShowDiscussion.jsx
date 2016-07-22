import React from 'react';
import './ThoughtCardShowDiscussion.import.css';

const ThoughtCardShowDiscussion = ({ discussions }) => (
  <div className="tc-show-discussion">
    <div className="header">
      <i className="fa fa-comment"></i>
      <label>Some global discussions</label>
    </div>
    {discussions.map(
      (discussion, i) =>
        <div className="wrapper" key={i}>
          <p className="merr-font">
            {`" ${discussion.first_message} "`}
          </p>
        </div>
    )}
    <div className="see-all">See all discussions</div>
  </div>
);

ThoughtCardShowDiscussion.propTypes = {
  discussions: React.PropTypes.array,
};

export default ThoughtCardShowDiscussion;
