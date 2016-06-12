import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AboutCard extends Component {
  render() {
    const { followed_categories, works, educations, addresses } = this.props.user;
    return (
      <div className="about-card card">
        <div className="card-header">
          <label>About</label>
          <Link to="profile/about" className="header-link">Edit</Link>
        </div>
        <div className="content merr-font">
          {
            // categories
          }
          <div className="line categories">
            <div className="icon">
              <i className="fa fa-lightbulb-o"></i>
            </div>
            <div className="text">
              <p>
                {followed_categories.map(({ id, title }, i) => {
                  if (i === 0) return `Follows ${title}`;
                  return `, ${title}`;
                })}
              </p>
            </div>
          </div>
          {
            // works
          }
          <div className="line work">
            <div className="icon">
              <i className="fa fa-briefcase"></i>
            </div>
            <div className="text">
              <p>
                {works.map((work, i) => {
                  if (i === 0) return work;
                  return `, ${work}`;
                })}
              </p>
            </div>
          </div>
          {
            // educations
          }
          <div className="line edu">
            <div className="icon">
              <i className="fa fa-university"></i>
            </div>
            <div className="text">
              <p>
                {educations.map((edu, i) => {
                  if (i === 0) return edu;
                  return `, ${edu}`;
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AboutCard.propTypes = {
  user: PropTypes.object,
};
