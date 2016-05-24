import React from 'react';

class ProfileLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Profile</h4>
      </div>
    );
  }
}

ProfileLayout.propTypes = {
  categoryName: React.PropTypes.string,
};

export default ProfileLayout;
