import React, { Component } from 'react';
import moment from 'moment';
import '../../_tools/clamp.js';

class HighlightGlobalThoughtNoti extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const { noti } = this.props;
    const name = noti.friend.name;
    const pic = noti.friend.pic;
    const perCount = noti.person_count;
    const thought = noti.thought;
    console.log(name);
    return (
      <div className="item">
        <img src={pic} role="presentation" />
        <div className="detail merr-font" ref="clampText">
          <span className="hilight">
            {name}
            {name && perCount !== 0 ? ' and ' : ''}
            {`${perCount} persons `}
            highlighted
          </span>
          {' '} your global thought: {` ${thought}`}
        </div>
        <div className="date">{moment(noti.date).fromNow()}</div>
      </div>
    );
  }
}

HighlightGlobalThoughtNoti.propTypes = {
  noti: React.PropTypes.object,
};

export default HighlightGlobalThoughtNoti;
