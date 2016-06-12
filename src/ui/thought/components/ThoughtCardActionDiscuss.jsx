import React, { Component, PropTypes } from 'react';
import { Editor, EditorState } from 'draft-js';

class ThoughtCardActionDiscuss extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => {
      this.setState({ editorState });
      this.props.setDiscussionMessage(editorState.getCurrentContent().getPlainText());
    };
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({ editorState: EditorState.createEmpty() });
  }
  render() {
    const { editorState } = this.state;
    const hasText = editorState.getCurrentContent().hasText();
    return (
      <div className="action-discuss">
        <Editor editorState={editorState} onChange={this.onChange} placeholder="&#xf0e5; Discuss anonymously.." ref="fuck" />
        {hasText ?
          <div className="submit" onClick={this.props.createDiscussion}>
            <i className="fa fa-paper-plane"></i>Start Discussion
          </div>
          : ''
        }
      </div>
    );
  }
}

ThoughtCardActionDiscuss.propTypes = {
  createDiscussion: PropTypes.func.isRequired,
  setDiscussionMessage: PropTypes.func.isRequired,
};

export default ThoughtCardActionDiscuss;
