import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../_tools/clamp.js';

import './ThoughtCardContentHeader.import.css';

class ThoughtCardContentHeader extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const {
      thoughtId,
      header,
      description,
    } = this.props;
    return (
      <Link className="tc-ch" to={`/thought/${thoughtId}`}>
        <div className="bg">
          <div className="header">
            <h5>{header}</h5>
          </div>
          <div className="description" ref="clampText">
            {description}
          </div>
        </div>
      </Link>
    );
  }
}

ThoughtCardContentHeader.propTypes = {
  thoughtId: React.PropTypes.string,
  header: React.PropTypes.string,
  description: React.PropTypes.string,
};

export default ThoughtCardContentHeader;
