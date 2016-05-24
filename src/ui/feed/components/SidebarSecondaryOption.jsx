import React from 'react';
import './SidebarSecondaryOption.import.css';

const SidebarSecondaryOption = ({ text }) => (
  <div className="sidebar-secondary-option">
    {text}
  </div>
);

SidebarSecondaryOption.propTypes = {
  text: React.PropTypes.string,

};

export default SidebarSecondaryOption;
