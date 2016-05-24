import React from 'react';
import { Link } from 'react-router';
import './FeedTypeButton.import.css';
import SidebarOption from './SidebarOption.jsx';


const FeedTypeButton = ({ text, toPath }) => (
  <Link to={toPath} className="link-feed-type">
    <SidebarOption text={text} />
  </Link>
);

FeedTypeButton.propTypes = {
  text: React.PropTypes.string,
  toPath: React.PropTypes.string,
};
export default FeedTypeButton;
