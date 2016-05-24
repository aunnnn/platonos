import React from 'react';
import { IndexLink, Link } from 'react-router';
import './FeedTypeButton.import.css';

const FeedTypeButton = ({ text, toPath, isIndexLink = false }) => (
  // **need to use IndexLink else it will always be active
    isIndexLink ?
      <IndexLink
        to={toPath}
        className="link-feed-type"
        activeClassName="link-active"
      >
        <div>{text}</div>
      </IndexLink>
      :
      <Link
        to={toPath}
        className="link-feed-type"
        activeClassName="link-active"
      >
        <div>{text}</div>
      </Link>
);

FeedTypeButton.propTypes = {
  text: React.PropTypes.string,
  toPath: React.PropTypes.string,
  isIndexLink: React.PropTypes.bool,
};
export default FeedTypeButton;
