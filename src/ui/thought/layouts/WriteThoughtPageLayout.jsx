import React, { Component } from 'react';

import WriteThoughtCardLayout from './WriteThoughtCardLayout.jsx';
import FlowingThoughts from '../components/FlowingThoughts.jsx';
import './WriteThoughtPageLayout.import.css';

export default class WriteThoughtPageLayout extends Component {
  render() {
    return (
      <div className="container" id="write-page">
        <div className="row">
          <div className="eight columns write">
            <WriteThoughtCardLayout />
          </div>
          <div className="four columns">
            <FlowingThoughts />
          </div>
        </div>
      </div>
    );
  }
}
