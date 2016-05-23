import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// components
import SVGLogo from '../components/SVGLogo.jsx';
import NotiDropdown from '../components/NotiDropdown.jsx';
import DiscussDropdown from '../components/DiscussDropdown.jsx';
import SettingDropdown from '../components/SettingDropdown.jsx';

// actions
import { openDropdown } from '../actions/openDropdown.js';

// styles
import './NavbarLayout.import.css';

// layout
class NavbarLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      dispatch,
      activeDropdown,
    } = this.props;

    return (
      <nav className="main-nav">
        <div className="container">
          <SVGLogo />
          <label className="motto">Where Ideas Talk and Connect Us.</label>

          <div className="right-nav noselect">
            <i
              className={classNames(
                'fa', 'fa-bell-fix',
                { 'fa-bell-o': activeDropdown !== 'noti' },
                { 'fa-bell': activeDropdown === 'noti' }
              )}
              onClick={() => dispatch(openDropdown('noti'))}
            ></i>
            {activeDropdown === 'noti' ? <NotiDropdown /> : ''}

            <i
              className={classNames(
                'fa', 'fa-comments-fix',
                { 'fa-comments-o': activeDropdown !== 'discuss' },
                { 'fa-comments': activeDropdown === 'discuss' }
              )}
              onClick={() => dispatch(openDropdown('discuss'))}
            ></i>
            {activeDropdown === 'discuss' ? <DiscussDropdown /> : ''}

            <i
              className={classNames(
                'fa',
                { 'fa-caret-down': activeDropdown !== 'setting' },
                { 'fa-caret-up': activeDropdown === 'setting' }
              )}
              onClick={() => dispatch(openDropdown('setting'))}
            ></i>
            {activeDropdown === 'setting' ? <SettingDropdown /> : ''}

            <div className="user-wrapper">
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
        </div>
      </nav>
    );
  }
}

NavbarLayout.propTypes = {
  dispatch: React.PropTypes.func,
  activeDropdown: React.PropTypes.string,
};

// redux
const mapStateToProps = (state) => (
  {
    activeDropdown: state.activeDropdown,
  }
);

export default connect(mapStateToProps)(NavbarLayout);
