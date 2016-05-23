import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Store from '../../../ui/Store.js';
// components
import NavbarLayout from './NavbarLayout.jsx';

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    Meteor.logout( err => {
      // go to first page automatically
      // cannnot use '/' because it will not reevaluate requireAuth*
      Store.dispatch(push('/login'));

    });
  }
  render() {
    const {
      user,
      children,
    } = this.props;

    let menu = "";
    if (user) {
      menu = (
        <div>
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
AppLayout.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(AppLayout);
