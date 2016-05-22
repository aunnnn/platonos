import React from 'react';
import './SidebarOption.import.css';

const SidebarOption = ({ text }) => (
  <div className="sidebar-option">
    {text}
  </div>
);

SidebarOption.propTypes = {
  text: React.PropTypes.string,

};

export default SidebarOption;
