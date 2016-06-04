import React from 'react';
import { IndexLink, Link } from 'react-router';

const FeedTypeButton = ({ text, toPath, isIndexLink = false, isActive = false }) => (
  // **need to use IndexLink else it will always be active
    isIndexLink ?
      <IndexLink
        to={toPath}
        className="feed-button"
        activeClassName="link-active"
      >
        {text}
        {isActive ? <i className="fa fa-angle-right"></i> : ''}
      </IndexLink>
      :
      <Link
        to={toPath}
        className="feed-button"
        activeClassName="link-active"
      >
        {text}
        {isActive ? <i className="fa fa-angle-right"></i> : ''}
      </Link>
);

FeedTypeButton.propTypes = {
  text: React.PropTypes.string,
  toPath: React.PropTypes.string,
  isIndexLink: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
};
export default FeedTypeButton;
