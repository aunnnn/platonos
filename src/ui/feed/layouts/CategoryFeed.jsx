import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
// components
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';
// collections
import { Categories } from '../../../api/category/categories';
// actions
import { followCategory, unfollowCategory } from '../actions/following.js';

import './CategoryFeed.import.css';

class CategoryFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryObj: {},
    };
  }
  componentDidMount() {
    Categories.methods.getCategory.call(
      this.props.categoryTitle,
      (err, result) => {
        if (err) {
          console.log('error getting category data');
          return;
        }
        this.setState({
          categoryObj: result,
        });
      }
    );
  }
  componentDidUpdate() {
    if (this.props.categoryTitle !== this.state.categoryObj.title) {
      Categories.methods.getCategory.call(
        this.props.categoryTitle,
        (err, result) => {
          if (err) {
            console.log('error getting category data');
            return;
          }
          this.setState({
            categoryObj: result,
          });
        }
      );
    }
  }
  getDummyData() {
    return [
      {
        category: 'Science',
        type: 'NORMAL',
        header: 'What is your favorite chemical reaction and why?',
        description: '',
        discussions: [
          'Whoa, chill the fuck out man. nuclear cannot solve my money problem duh.',
          'I think the most important problem in the world right now is not terrorism. but the way people choose to solve it.. look at the past 10 years.. the world was trying to solve it but is it better now ?',
        ],
      },
      {
        category: 'World',
        type: 'GLOBAL',
        header: 'I think we can end terrorism by nuclear warhead.',
        description: 'I really believe that nuclear can put an end to every problem. One blow and everything is gone. I think you need to sacrifice some lifes for the better of whole you know.',
        discussions: [
          'Whoa, chill the fuck out man. nuclear cannot solve my money problem duh.',
          'I think the most important problem in the world right now is not terrorism. but the way people choose to solve it.. look at the past 10 years.. the world was trying to solve it but is it better now ?',
        ],
      },
      {
        category: 'Science',
        type: 'NORMAL',
        header: 'What is your favorite chemical reaction and why?',
        description: '',
        discussions: [
          'Whoa, chill the fuck out man. nuclear cannot solve my money problem duh.',
          'I think the most important problem in the world right now is not terrorism. but the way people choose to solve it.. look at the past 10 years.. the world was trying to solve it but is it better now ?',
        ],
      },
      {
        category: 'Space',
        type: 'GLOBAL',
        header: 'UFO doesn\'t visit us because we are too stupid yo',
        description: '',
        discussions: [
        ],
      },
    ];
  }

  render() {
    const { categoryTitle, currentUser, dispatch } = this.props;
    const { categoryObj } = this.state;

    let isFollowed = false;
    currentUser.appProfile.followed_categories.forEach(
      (category) => {
        if (category.title === categoryTitle) isFollowed = true;
      }
    );

    return (
      <div>
        <div className="cfh">
          <h4 className="feed-header">{categoryTitle}</h4>
          <FollowButton
            categoryObj={categoryObj}
            isFollowed={isFollowed}
            dispatch={dispatch}
          />
          <p className="merr-font">Interesting thoughts in {` ${categoryTitle}`}</p>
        </div>
        {this.getDummyData().map(
          thought =>
            <ThoughtCardLayout
              thought={thought}
              currentUser={currentUser}
            />
        )}
      </div>
    );
  }
}

CategoryFeed.propTypes = {
  categoryTitle: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
};

/*
  Follow Button
*/
const FollowButton = ({ categoryObj, isFollowed, dispatch }) => {
  console.log(categoryObj);
  return (<div
    className={classNames('button', { follow: !isFollowed })}
    onClick={() => {
      if (isFollowed) {
        dispatch(unfollowCategory(categoryObj._id));
      } else {
        dispatch(followCategory(categoryObj));
      }
    }}
  >
    {isFollowed ? 'Unfollow' : 'Follow'}
  </div>);
};

FollowButton.propTypes = {
  categoryObj: React.PropTypes.object,
  isFollowed: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
};

export default connect()(CategoryFeed);
