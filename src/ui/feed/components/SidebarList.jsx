import React from 'react';
import { Link } from 'react-router';
import SidebarOption from './SidebarOption.jsx';
import './SidebarList.import.css';

export default class SidebarList extends React.Component {

  render() {
    return (
      <div className="sidebarlist-wrapper">
        <Link to="/">
          <SidebarOption text="Thoughts" />
        </Link>

        <Link to="/global">
          <SidebarOption text="Global Debate" />
        </Link>

        <div className="horizontal-divider"></div>

        <SidebarOption text="Global Debate" />
      </div>
    );
  }
}
