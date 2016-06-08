import React, { Component, PropTypes } from 'react';

export default class AboutCard extends Component {
  render() {
    const { categories, works, educations, places } = this.props.about;
    console.log(this.props.about);
    return (
      <div className="about-card card">
        <label>About</label>
        <button>edit</button>
        <div className="content">
          {
            // categories
          }
          <div className="line categories">
            <i className="fa fa-lightbulb-o"></i>
            <p>
              {categories.map((cat, i) => {
                if (i === 0) return `Follows ${cat}`;
                return `, ${cat}`;
              })}
            </p>
          </div>
          {
            // works
          }
          <div className="line work">
            <i className="fa fa-briefcase"></i>
            <p>
              {works.map((work, i) => {
                if (i === 0) return work;
                return `, ${work}`;
              })}
            </p>
          </div>
          {
            // educations
          }
          <div className="line edu">
            <i className="fa fa-university"></i>
            <p>
              {educations.map((edu, i) => {
                if (i === 0) return edu;
                return `, ${edu}`;
              })}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

AboutCard.propTypes = {
  about: PropTypes.object,
  'about.categories': PropTypes.array,
};
