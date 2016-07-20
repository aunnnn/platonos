import React from 'react';
import { Link } from 'react-router';

const AboutCard = ({ followed_categories, work, education, places, userId, isOwner }) => {
  const eduTemp = {
    highschool: 'Suankularb',
    college: [
      'Chulalongkorn University',
    ],
  };

  return (
    <div className="about-card card">
      <div className="card-header">
        <label>About</label>
        {isOwner ?
          <Link to={`/profile/${userId}/about`} className="header-link">Edit</Link>
          : ''
        }
      </div>
      <div className="content merr-font">
        {
          // categories
        }
        <div className="line categories">
          <div className="icon">
            <i className="fa fa-lightbulb-o"></i>
          </div>
          <div className="text-wrapper">
            <p className="text">
              {
                followed_categories.length === 0 ?
                  '' : 'Follows'
              }
              {
                followed_categories.length === 0 ?
                  'No following categories'
                  :
                  followed_categories.map(({ _id, title }, i) => {
                    if (i === 0) {
                      return (
                        <Link
                          to={`/category/${title}`} key={_id}
                          className="cat-link"
                        >
                          {` ${title}`}
                        </Link>
                      );
                    }
                    return (
                      <Link
                        to={`/category/${title}`} key={_id}
                        className="cat-link"
                      >
                        {`, ${title}`}
                      </Link>
                    );
                  })
              }
            </p>
          </div>
        </div>
        {
          // work
          // work.length === 0 ?
            // ''
            // :
            <div className="line work">
              <div className="icon">
                <i className="fa fa-briefcase"></i>
              </div>
              <div className="text-wrapper">
                <p className="text">
                  {/* work[0] */}
                  Platonos Inc.
                </p>
              </div>
            </div>
        }
        {
          // education
          eduTemp.highschool === '' && eduTemp.college.length === 0 ?
            ''
            :
            <div className="line edu">
              <div className="icon">
                <i className="fa fa-university"></i>
              </div>
              <div className="text-wrapper">
                <p className="text">
                  {eduTemp.college.length !== 0 ?
                    eduTemp.college[0] : eduTemp.highschool
                  }
                </p>
              </div>
            </div>
        }
        {
          // place
          places.born === '' && places.lives === '' ?
            '' :
            <div className="live place">
              <div className="icon">
                <i className="fa fa-map-marker"></i>
              </div>
              <div className="text-wrapper">
                <p className="text">
                  {places.lives !== '' ?
                    places.lives : places.born
                  }
                </p>
              </div>
            </div>
          }
      </div>
    </div>);
};

AboutCard.propTypes = {
  followed_categories: React.PropTypes.array,
  work: React.PropTypes.array,
  education: React.PropTypes.array,
  places: React.PropTypes.object,
  userId: React.PropTypes.string,
  isOwner: React.PropTypes.bool,
};

export default AboutCard;
