import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
// components
import NavbarLayout from './NavbarLayout.jsx';
import LoginPageLayout from '../../auth/layouts/LoginPageLayout.jsx';
// Layout
class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.renderAnonymous = this.renderAnonymous.bind(this);
    this.renderAuthorized = this.renderAuthorized.bind(this);
  }
  logout() {
    Meteor.logout(err => {
      if (err) {
        console.log('logout error: ' + err.reason);
      }
      this.props.router.push('/');
    });
  }
  renderAnonymous() {
    return (
      <LoginPageLayout />
    );
  }
  renderAuthorized() {
    const {
      user,
      children,
    } = this.props;

    return (
      <div>
        {/* Navbar & Padding */}
        <NavbarLayout />
        <div style={{ height: '55px', width: '100%' }}></div>
      {/* Dummy navigation (To be included in Navbar) */}
        <div>
          {'Logged in as:' + (user.profile ? user.profile.name : user.emails[0].address )}
          {user ? <button className="button-primary" onClick={this.logout}>Logout</button> : '' }
          {' '}
          {<Link to="/profile">Profile</Link>}
          {' '}
          {<Link to="/">Feed</Link>}
        </div>
        {/* Children */}
        <div className="child-content">
          {children}
        </div>
      </div>
    );
  }
  render() {
    const {
      user,
    } = this.props;

    if (user !== undefined) {
      // user ready
      if (user) {
        // logged in
        return this.renderAuthorized(this.props);
      }
      // not logged in
      return this.renderAnonymous();
    }
    // waiting for user to ready
    return <div>Loading...</div>;
  }
}

// Redux
const mapStateToProps = (state) => (
  {
    count: state.count,
  }
);

AppLayout.propTypes = {
  user: React.PropTypes.object,
  children: React.PropTypes.element, // matched child route component
  location: React.PropTypes.object, // current router location
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(withRouter(AppLayout));
