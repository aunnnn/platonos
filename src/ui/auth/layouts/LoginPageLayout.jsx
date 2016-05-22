import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
export default class LoginPageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
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
              placeholder="aun@test.com"
              ref="email"
            />

            <label>Password</label>
            <input
              className="u-full-width"
              type="password"
              placeholder="1234"
              ref="password"
            />
            <input className="button-primary" type="submit" value="Login" /> or
            <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    );
  }
}

LoginPageLayout.contextTypes = {
  router: React.PropTypes.object,
};
