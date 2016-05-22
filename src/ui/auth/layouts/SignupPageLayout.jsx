import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class SignupPageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { errors: {} };
  }
  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirmPassword = this.refs.confirmPassword.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    }
    if (password !== confirmPassword) {
      errors.passwordMatch = 'Passwords are not matched.';
    }
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }
    Accounts.createUser({
      email,
      password,
    }, error => {
      if (error) {
        console.log('CreateUser error: '+error.reason);
      } else {
        console.log('CreateUser success');
        this.context.router.push('/');
      }
    });
  }
  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    // const errorClass = key => errors[key] && 'error';
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <h4>Signup</h4>
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

            <label>Confirm Password</label>
            <input
              className="u-full-width"
              type="password"
              placeholder="Confirm password"
              ref="confirmPassword"
            />


            <input className="button-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

SignupPageLayout.contextTypes = {
  router: React.PropTypes.object,
};
