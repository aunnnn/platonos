import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router';
// components
import SVGLogo from '../components/SVGLogo.jsx';
import NotiDropdown from '../components/NotiDropdown.jsx';
import SettingDropdown from '../components/SettingDropdown.jsx';

// actions
import { openDropdown } from '../actions/openDropdown.js';

// styles
import './NavbarLayout.import.css';

// layout
class NavbarLayout extends Component {
  render() {
    const {
      dispatch,
      activeDropdown,
      currentUser: {
        _id,
        appProfile: {
          first_name,
          picture,
        },
      },
    } = this.props;

    return (
      <nav className="main-nav">
        <div className="container">
          {
            // logo & motto
          }
          <Link to="/">
            <SVGLogo />
          </Link>
          <label className="motto">Where Ideas Talk and Connect Us.</label>

          {
            // right nav
          }
          <div className="right-nav noselect">
            <div className="dropdown-wrapper">
              <i
                className={classNames(
                  'fa', 'fa-bell-fix',
                  { 'fa-bell-o': activeDropdown !== 'noti' },
                  { 'fa-bell': activeDropdown === 'noti' }
                )}
                onClick={() => dispatch(openDropdown('noti'))}
              ></i>
              {activeDropdown === 'noti' ?
                <NotiDropdown
                  outsideClickIgnoreClass={'fa'}
                  dispatch={dispatch}
                /> : ''
              }

              <i
                className={classNames(
                  'fa', 'fa-comments-fix',
                  { 'fa-comments-o': activeDropdown !== 'discuss' },
                  { 'fa-comments': activeDropdown === 'discuss' }
                )}
                onClick={() => dispatch(openDropdown('discuss'))}
              ></i>

              <i
                className={classNames(
                  'fa',
                  { 'fa-angle-down': activeDropdown !== 'setting' },
                  { 'fa-angle-up': activeDropdown === 'setting' }
                )}
                onClick={() => dispatch(openDropdown('setting'))}
              ></i>
              {activeDropdown === 'setting' ?
                <SettingDropdown
                  dispatch={dispatch}
                  outsideClickIgnoreClass={'fa'}
                />
                : ''
              }
            </div>

            {
              // profile thumbnail
            }
            <Link to={`/profile/${_id}`} className="user-wrapper">
              <img
                className="user-pic"
                width="40"
                height="40"
                src={picture}
                role="presentation"
              />
              <p className="user-name merr-font">{first_name}</p>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

NavbarLayout.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  activeDropdown: React.PropTypes.string.isRequired,
  currentUser: React.PropTypes.object.isRequired,
};

// redux
const mapStateToProps = (state) => (
  {
    activeDropdown: state.activeDropdown,
  }
);

export default connect(mapStateToProps)(NavbarLayout);
