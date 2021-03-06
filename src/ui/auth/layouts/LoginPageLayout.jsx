import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
export default class LoginPageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.state = { errors: {} };
  }
  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }
    Meteor.loginWithPassword(email, password, error => {
      if (error) {
        console.log(error.reason);
        this.setState({
          errors: { none: error.reason },
        });
      } else {
        this.context.router.push('/');
      }
    });
  }
  loginWithFacebook() {
    Meteor.loginWithFacebook({
      requestPermissions: ['user_friends', 'public_profile', 'email'],
    }, err => {
      if (err) {
        console.log('error login with facebook'+err.reason);
      } else {
        this.context.router.push('/');
      }
    });
  }
  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <h4>Login here</h4>

            <div>
              {errorMessages.map(msg => (
                <p>{msg}</p>
              ))}
            </div>

            <label>Email</label>
            <input
              className="u-full-width"
              type="email"
              placeholder="Your email"
              ref="email"
            />

            <label>Password</label>
            <input
              className="u-full-width"
              type="password"
              placeholder="Your password"
              ref="password"
            />
            <input className="button-primary" type="submit" value="Login" /> or
            <Link to="/signup">Signup</Link>
          </div>
        </form>
        <p>or</p>
        <button
          className="button-primary"
          onClick={this.loginWithFacebook}
        >
          Login with facebook
        </button>
      </div>
    );
  }
}

LoginPageLayout.contextTypes = {
  router: React.PropTypes.object,
};
