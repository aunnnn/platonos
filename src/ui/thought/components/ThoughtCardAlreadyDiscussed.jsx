import React, { PropTypes } from 'react';
import './ThoughtCardAlreadyDiscussed.import.css';

const ThoughtCardAlreadyDiscussed =
  ({ message, currentUser }) => (
    <div className="tc-already-discussed tc-action-discuss">
      <div className="wrapper">
        <div style={{ marginBottom: '10px' }}>
          <div
            className="already-pic"
            style={{ backgroundImage: `url(${currentUser.appProfile.picture})` }}
          ></div>
          <span className="already-time">2 days ago</span>
        </div>
        <div className="merr-font">
          {message}
        </div>
      </div>
      <div className="submit">
        <i className="fa fa-comments-o"></i>Go to Discussion
      </div>
    </div>
  );

ThoughtCardAlreadyDiscussed.propTypes = {
  message: PropTypes.string,
  currentUser: PropTypes.object,
};

export default ThoughtCardAlreadyDiscussed;
