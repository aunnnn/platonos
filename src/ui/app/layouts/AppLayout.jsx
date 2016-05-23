import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import Store from '../../../ui/Store.js';
// components
import NavbarLayout from './NavbarLayout.jsx';

// Layout
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
    return (
      <div>
        <NavbarLayout />
        <div>
          {user ? 'Logged in as:' + user.emails[0].address : ''}
        </div>
        <div className="child-content">
          {children}
        </div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object,  // current router location
};

// Redux
const mapStateToProps = (state) => (
  {
    count: state.count,
  }
);

AppLayout.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(AppLayout);
