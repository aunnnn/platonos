import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

class ThoughtCardActionDiscuss extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }
  render() {
    const { editorState } = this.state;
    const hasText = editorState.getCurrentContent().hasText();
    return (
      <div className="action-discuss">
        <Editor editorState={editorState} onChange={this.onChange} placeholder="&#xf0e5; Discuss anonymously.." ref="fuck" />
        {hasText ?
          <div className="submit">
            <i className="fa fa-paper-plane"></i>Start Discussion
          </div>
          : ''
        }
      </div>
    );
  }
}

export default ThoughtCardActionDiscuss;
