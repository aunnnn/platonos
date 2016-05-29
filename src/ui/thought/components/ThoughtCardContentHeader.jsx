import React, { Component } from 'react';
import '../../_tools/clamp.js';

class ThoughtCardContentHeader extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const {
      header,
      description,
    } = this.props;
    return (
      <div className="content">
        <div className="header">
          <h5>{header}</h5>
        </div>
        {description !== '' ?
          <div className="description" ref="clampText">
            {description}
          </div>
          : ''
        }
      </div>
    );
  }
}

ThoughtCardContentHeader.propTypes = {
  header: React.PropTypes.string,
  description: React.PropTypes.string,
};

export default ThoughtCardContentHeader;
