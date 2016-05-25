import React, { Component } from 'react';
import moment from 'moment';
import '../../_tools/clamp.js';

class MsgFromFriendNoti extends Component {
  componentDidMount() {
    let dom = this.refs.clampText;
    $clamp(dom, { clamp: 2 });
  }
  render() {
    const { noti } = this.props;
    const name = noti.friend.name;
    const pic = noti.friend.pic;
    const disCount = noti.new_discuss_count;
    const msgCount = noti.new_msg_count;
    return (
      <div className="item">
        <img src={pic} role="presentation" />
        <div className="detail merr-font" ref="clampText">
          <span className="hilight">
            {disCount === 0 ? '' : `${disCount} new discussions`}
            {disCount !== 0 && msgCount !== 0 ? ' & ' : ''}
            {msgCount === 0 ? '' : `${msgCount} new messages `}
          </span>
          from your friend {` ${name}`}
        </div>
        <div className="date">{moment(noti.date).fromNow()}</div>
      </div>
    );
  }
}

MsgFromFriendNoti.propTypes = {
  noti: React.PropTypes.object,
};

export default MsgFromFriendNoti;
