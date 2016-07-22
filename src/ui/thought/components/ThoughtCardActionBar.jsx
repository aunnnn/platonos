import React, { Component } from 'react';
import classNames from 'classnames';

// components
import CardActionStar from './CardActionStar.jsx';
import CardActionShare from './CardActionShare.jsx';

import './ThoughtCardActionBar.import.css';

class ThoughtCardActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrop: false,
    };
    this.toggleDrop = this.toggleDrop.bind(this);
  }
  toggleDrop() {
    this.setState({ activeDrop: !this.state.activeDrop });
  }
  render() {
    const { type, isOwner } = this.props;
    const { activeDrop } = this.state;
    return (
      <div className="tc-action-bar">
        {type === 'GLOBAL' ?
          <div className="left">
            <CardActionStar isStarred={false} starCount={12} />
            {/*<CardActionShare />*/}
          </div>
          : ''
        }
        {!isOwner ?
          <div className="right tc-action-button">
            <div className="item">
              <i className="fa fa-bookmark-o"></i>
              {/*<span className="text">Save</span>*/}
            </div>
            <div className="item last">
              <i className="fa fa-exclamation"></i>
              
            </div>
            {/*
            <i
              className={classNames(
                'fa',
                { 'fa-angle-down': !activeDrop },
                { 'fa-angle-up': activeDrop }
              )}
              onClick={this.toggleDrop}
            ></i>
            */}
          </div>
          : ''
        }
        {this.state.activeDrop ?
          <Dropdown />
          : ''
        }
      </div>
    );
  }
}

ThoughtCardActionBar.propTypes = {
  type: React.PropTypes.string,
  isOwner: React.PropTypes.bool,
};

const Dropdown = () => (
  <div className="dropdown noselect">
    <div className="item">
      <i className="fa fa-bookmark-o"></i>
      Save thought
    </div>
    <div className="item">
      <i className="fa fa-exclamation-triangle"></i>
      Report
    </div>
  </div>
);

export default ThoughtCardActionBar;
