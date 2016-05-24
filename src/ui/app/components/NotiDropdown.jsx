import React, { Component } from 'react';

class NotiDropdown extends Component {
  getDummyData() {
    return [
      {
        type: 'MSG_ON_MY_THOUGHT',
        new_discuss_count: 2,
        new_msg_count: 4,
        thought: 'Hey i was thinking about you right now you know.',
      },
      {
        type: 'MSG_ON_OTHER_THOUGHT',
        new_msg_count: 2,
        thought: 'Hey i really hate Trump because his hair.',
      },
      {
        type: 'MSG_FROM_FRIEND',
        friend: 'Napat',
        new_discuss_count: 1,
        new_msg_count: 3,
      },
      {
        type: 'ALSO_CONNECTED',
        friend: 'Janin',
      },
      {
        type: 'HIGHLIGHT_THOUGHT',
        friend: [
          'Konpat',
        ],
        non_friend_count: 6,
        thought: 'The world needs the x-men.',
      },
      {
        type: 'NEW_THOUGHT_FROM_FRIEND',
        friend: 'Janin',
        category: 'World Pilitics',
        thought: 'Kin jong un is gay.',
      },
    ];
  }
  render() {
    return (
      <div className="nav-dropdown noti">
        {this.getDummyData().map(noti => {
          switch (noti.type) {
            case 'MSG_ON_MY_THOUGHT':
              return <MsgOnMyThoughtNoti noti={noti} />;
            default:
              return <div>duh</div>;
          }
        })}
      </div>
    );
  }
}

const MsgOnMyThoughtNoti = ({ noti }) => (
  <div className="item">
    {noti.new_discuss_count} new discussions &
    {noti.new_msg_count} new messages on your thought:
    "{noti.thought}"
  </div>
);

MsgOnMyThoughtNoti.propTypes = {
  noti: React.PropTypes.obj,
};

export default NotiDropdown;
