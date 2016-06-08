import React, { Component } from 'react';

import './FlowingThoughts.import.css';

export default class FlowingThoughts extends Component {
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
    return (
      <div className="flowing-thoughts">
        <h4>Thoughts that flowing right now.</h4>
        {this.getDummyData().map(thought =>
          <div className="thought">
            <div className="category">
              <i className="fa fa-lightbulb-o"></i>
              <label>{thought.category}</label>
            </div>
            <h5>{thought.header}</h5>
          </div>
        )}
      </div>
    );
  }
}
