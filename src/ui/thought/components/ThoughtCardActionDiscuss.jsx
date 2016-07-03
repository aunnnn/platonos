import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import './ThoughtCardActionDiscuss.import.css';

// collections
import { Discussions } from '../../../api/discussion/discussions.js';

class ThoughtCardActionDiscuss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discussionMessage: '',
      editorState: EditorState.createEmpty(),
    };
    this.onChange = (editorState) => {
      this.setState({
        editorState,
        discussionMessage: editorState.getCurrentContent().getPlainText(),
      });
    };
    this.createDiscussion = this.createDiscussion.bind(this);
    this.reset = this.reset.bind(this);
  }

  createDiscussion() {
    const {
      thought: {
        _id,
        user_id,
        category,
        header,
        description,
      },
      currentUser,
    } = this.props;


    const discussion = {
      thought: {
        _id,
        user_id,
        header,
        description,
        category: category.title,
      },
      created_by: currentUser._id,
      first_message: this.state.discussionMessage,
      latest_message: this.state.discussionMessage,
      last_active: new Date(),
    };
    console.log(`will create discussion ${discussion}`);
    // reset discussion message state
    this.setState({
      discussionMessage: '',
    });
    this.reset();

    // create discussion
    Discussions.methods.insert.call(
      { discussion },
      (err, result) => {
        if (err) {
          console.log(err.reason);
        } else {
          // reset all after create a discussion for ThoughtCardLayout
          this.props.loadPreviewDiscussions();
          this.props.loadMyDiscussion();
        }
      });
  }

  reset() {
    this.setState({ editorState: EditorState.createEmpty() });
  }

  render() {
    const { editorState } = this.state;
    const hasText = editorState.getCurrentContent().hasText();
    return (
      <div className="action-discuss">
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          placeholder="&#xf0e5; Discuss anonymously.."
          ref="fuck"
        />
        {hasText ?
          <div className="submit" onClick={this.createDiscussion}>
            <i className="fa fa-paper-plane"></i>Start Discussion
          </div>
          : ''
        }
      </div>
    );
  }
}

ThoughtCardActionDiscuss.propTypes = {
  loadPreviewDiscussions: React.PropTypes.func,
  loadMyDiscussion: React.PropTypes.func,
  thought: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object,
};

export default ThoughtCardActionDiscuss;
