import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

export class DescriptionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        placeholder="Add some description to your thought."
      />
    );
  }
}

export default DescriptionEditor;
