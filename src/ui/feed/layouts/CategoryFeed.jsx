import React from 'react';
import ThoughtCardLayout from '../../thought/layouts/ThoughtCardLayout.jsx';
import ThoughtCardContainer from '../../thought/containers/ThoughtCardContainer.jsx';
import './CategoryFeed.import.css';

class CategoryFeed extends React.Component {

  constructor(props) {
    super(props);
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
    const {
      categoryName,
    } = this.props;
    return (
      <div>
        <div className="category-feed-header">
          <h4 className="feed-header">{categoryName}</h4>
          <div className="unfollow-button">Unfollow</div>
          <p className="merr-font">Interesting thoughts in {` ${categoryName}`}</p>
        </div>
        {this.getDummyData().map(thought => <ThoughtCardLayout thought={thought} />)}
        <ThoughtCardContainer />
      </div>
    );
  }
}

CategoryFeed.propTypes = {
  categoryName: React.PropTypes.string,
};

export default CategoryFeed;
