import React, { Component } from 'react';
import classNames from 'classnames';

// components
import CardActionStar from './CardActionStar.jsx';
import CardActionShare from './CardActionShare.jsx';

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
    const { type } = this.props;
    const { activeDrop } = this.state;
    return (
      <div className="action-bar">
        {type === 'GLOBAL' ?
          <div className="left">
            <CardActionStar isStarred={false} starCount={12} />
            {/*<CardActionShare />*/}
          </div>
          : ''
        }
        <div className="right action-button" onClick={this.toggleDrop}>
          <i
            className={classNames(
              'fa',
              { 'fa-angle-down': !activeDrop },
              { 'fa-angle-up': activeDrop }
            )}
          ></i>
        </div>
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
