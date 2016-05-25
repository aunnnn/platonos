import React from 'react';
import './GlobalFeed.import.css';

export default class GlobalFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="global-feed-header">
          <h4>Top Global Debate</h4>
          <h6>Change the world, start here.</h6>
        </div>
      </div>
    );
  }
}
