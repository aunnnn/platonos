import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class SignupPageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { errors: {} };
  }
  onSubmit() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }
    alert('Boo!');
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <h4>Signup</h4>
            <div>
              {}
            </div>
            <label>Email</label>
            <input
              className="u-full-width"
              type="email"
              placeholder="Your email"
              id="exampleEmailInput"
              ref="email"
            />

            <label>Password</label>
            <input
              className="u-full-width"
              type="password"
              placeholder="Your password"
              id="exampleEmailInput"
              ref="password"
            />
            <input className="button-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}
