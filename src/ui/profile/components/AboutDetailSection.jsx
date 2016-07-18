import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import './AboutDetailSection.import.css';

const AboutDetailSection = ({ topic, detail }) => (
  <div className="ad-s">
    <div className="header merr-font">
      <i
        className={classNames('fa',
          { 'fa-lightbulb-o': topic === 'Following Categories' },
          { 'fa-briefcase': topic === 'Work' },
          { 'fa-university': topic === 'Education' },
          { 'fa-map-marker': topic === 'Places' }
        )}
      ></i> {topic}
    </div>
    <hr className="divider"></hr>
    <div className="detail">
      {topic === 'Following Categories' ?
        detail.length === 0 ?
          'No Following Categories'
          :
          detail.map(category =>
            <Link to={`/category/${category.title}`} className="cat-link">
              <div className="item">
                {category.title}
              </div>
            </Link>
          )
        : ''
      }
      {topic === 'Work' ?
        detail.map(workplace =>
          <div className="item">
            {workplace}
          </div>
        )
        : ''
      }
      {topic === 'Education' ?
        <div>
          <label>High School</label>
          {detail.highschool !== '' ?
            <div className="item">
              {detail.highschool}
            </div>
            : 'No highschool'
          }
          <label>College</label>
          {detail.college.length !== 0 ?
            detail.college.map(college =>
              <div className="item">
                {college}
              </div>
            )
            : ''
          }
        </div>
        : ''
      }
      {topic === 'Places' ?
        <div>
          <label>Born</label>
          {detail.born !== '' ?
            <div className="item">
              {detail.born}
            </div>
            : 'Birthplace is not specified.'
          }
          <label>Live</label>
          {detail.lives.length !== 0 ?
            detail.lives.map(liveplace =>
              <div className="item">
                {liveplace}
              </div>
            )
            : ''
          }
        </div>
        : ''
      }
    </div>
  </div>
);

AboutDetailSection.propTypes = {
  topic: React.PropTypes.string,
  detail: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};

export default AboutDetailSection;
