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
          </div>
        </div>
      </nav>
    );
  }
}

export default NavbarLayout;
