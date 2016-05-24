import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// components

import SidebarSecondaryOption from './SidebarSecondaryOption.jsx';
import FeedTypeButton from './FeedTypeButton.jsx';
// styles
import './SidebarList.import.css';

class SidebarList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="sidebarlist-wrapper">
        <FeedTypeButton text="Thoughts" toPath=""/>
        <FeedTypeButton text="Global Debate" toPath="global"/>

        <div className="horizontal-divider"></div>
        <SidebarSecondaryOption text="Philosophy" />
        <SidebarSecondaryOption text="Politics" />
        <a href="/">more...</a>
      </div>
    );
  }
}

export default SidebarList;
