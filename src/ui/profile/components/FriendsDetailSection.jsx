import React from 'react';
import { Link } from 'react-router';

import './FriendsDetailSection.import.css';

const FriendsDetailSection = ({ friends, profile_first_name }) => (
  <div className="fd-s">
    {friends.length !== 0 ?
      friends.map(
        ({ _id, appProfile: { picture, first_name, last_name, places, description } }) =>
        (
          <div className="friend" key={_id}>
            <Link to={`profile/${_id}`} className="friend-link">
              <img
                src={picture}
                className="pic"
                role="presentation"
              />
              <div className="detail">
                <div className="name">
                  {`${first_name} ${last_name}`}
                </div>
                {places.born === '' && places.lives.length === 0 ?
                  <div className="desc">
                    {description}
                  </div>
                  :
                  <div className="place">
                    <i className="fa fa-map-marker"></i>
                    {places.lives.length === 0 ?
                      places.born : places.lives // !! NEED TO BE FIXED
                    }
                  </div>
                }
              </div>
              </Link>
          </div>
        ))
      : `${profile_first_name} doesn’t have any friends yet.`
    }
  </div>
);

FriendsDetailSection.propTypes = {
  friends: React.PropTypes.array,
  profile_first_name: React.PropTypes.string,
};

export default FriendsDetailSection;
