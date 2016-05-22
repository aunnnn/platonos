import React from 'react';
import { Link } from 'react-router';
export default class LoginPageLayout extends React.Component {

  render() {
    return (
      <div>
        <form>
          <div className="row">
            <h4>Login here</h4>
            <label>Email</label>
            <input
              className="u-full-width"
              type="email"
              placeholder="Your email here"
              id="exampleEmailInput"
            />

            <label>Password</label>
            <input
              className="u-full-width"
              type="password"
              placeholder="Your password here"
              id="exampleEmailInput"
            />
            <input className="button-primary" type="submit" value="Login" /> or
            <Link to="/signup">Signup</Link>
          </div>
        </form>
      </div>
    );
  }
}
