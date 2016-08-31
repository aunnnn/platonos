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
    this.createSubDiscussion = this.createSubDiscussion.bind(this);
    this.reset = this.reset.bind(this);
  }

  createDiscussion() {
    const {
      thought: {
        thought_id,
        user_id,
        category,
        header,
        description,
      },
      currentUser,
    } = this.props;


    const discussion = {
      thought: {
        _id: thought_id,
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
    console.log(`will create discussion ${JSON.stringify(discussion)}`);
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
          console.log(`error insert discussion: ${err.reason}`);
        } else {
          // reset all after create a discussion for ThoughtCardLayout
          console.log(`did insert discussion: ${result}`);
          this.props.loadPreviewDiscussions();
          this.props.loadMyDiscussion();
        }
      });
  }

  createSubDiscussion() {
  }

  reset() {
    this.setState({ editorState: EditorState.createEmpty() });
  }

  render() {
    const { editorState } = this.state;
    const { isSubDiscuss } = this.props;
    const hasText = editorState.getCurrentContent().hasText();
    return (
      <div className="tc-action-discuss">
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          placeholder="&#xf0e5; Discuss anonymously.."
          ref="fuck"
        />
        {hasText ?
          <div
            className="submit"
            onClick={isSubDiscuss ?
              this.createSubDiscussion : this.createDiscussion}
          >
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
  thought: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  isSubDiscuss: React.PropTypes.bool,
};

export default ThoughtCardActionDiscuss;
