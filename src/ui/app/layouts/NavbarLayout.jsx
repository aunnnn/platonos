import React, { Component } from 'react';

// components
import SVGLogo from '../components/SVGLogo.jsx';

// styles
import './NavbarLayout.import.css';

class NavbarLayout extends Component {
  render() {
    return (
      <nav className="main-nav">
        <div className="container">
          <SVGLogo />
          <label className="motto">Where Ideas Talk and Connect Us.</label>

          <div className="right-nav">
            <i className="fa fa-bell-o"></i>
            <i className="fa fa-comments"></i>
            <i className="fa fa-caret-down"></i>

            <img
              className="user-pic"
              width="40"
              height="40"
              src="img/user.jpg"
              role="presentation"
            />
            <p className="user-name merr-font">Jirat</p>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarLayout;
