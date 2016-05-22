import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// components
import NavbarLayout from './NavbarLayout.jsx';

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(event) {
    Meteor.logout();
  }
  render() {
    const {
      user,
      children,
    } = this.props;

    var menu = "";
    if (user) {
      menu = (
        <div>
          <Link to="/feed">feed</Link>
          <button onClick={this.logout}>logout</button>
        </div>
      );
    } else {
      menu = (
        <div>
          <Link to="/feed">feed</Link>
          <br />
          <Link to="/login">login</Link>
          <br />
          <Link to="/signup">signup</Link>
        </div>
      );
    }

    return (
      <div>
        <NavbarLayout />
        <div>
          {menu}
        </div>
        <div>
          {user ? "Logged in as: "+user.emails[0].address: ""}
        </div>

        <div className="child-content">
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    count: state.count,
  }
);

AppLayout.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.object,
};

export default connect(mapStateToProps)(AppLayout);
