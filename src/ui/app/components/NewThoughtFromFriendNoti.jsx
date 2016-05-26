import React, { Component } from 'react';
import moment from 'moment';
import '../../_tools/clamp.js';

class NewThoughtFromFriendNoti extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const { noti } = this.props;
    const name = noti.friend.name;
    const pic = noti.friend.pic;
    const category = noti.category;
    const thought = noti.thought;
    return (
      <div className="item">
        <img src={pic} role="presentation" />
        <div className="detail merr-font" ref="clampText">
          <span className="hilight">
            {`${name} has launched a new thought `}
          </span>
          in {` ${category}: ${thought}`}
        </div>
        <div className="date">{moment(noti.date).fromNow()}</div>
      </div>
    );
  }
}

NewThoughtFromFriendNoti.propTypes = {
  noti: React.PropTypes.object,
};

export default NewThoughtFromFriendNoti;
