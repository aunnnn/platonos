import React from 'react';
import SidebarOption from './SidebarOption.jsx';
import './SidebarList.import.css';

export default class SidebarList extends React.Component {

  render() {
    return (
      <div className="sidebarlist-wrapper">
        <SidebarOption text="Thoughts" />
        <SidebarOption text="Global Debate" />

        <div className="horizontal-divider"></div>

        <SidebarOption text="Global Debate" />
      </div>
    );
  }
}
