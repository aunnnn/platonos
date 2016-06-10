import React, { Component, PropTypes } from 'react';
import { Editor, EditorState } from 'draft-js';

export class DescriptionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => {
      this.setState({ editorState });
      this.props.setDescriptionText(this.state.editorState.getCurrentContent().getPlainText());
    };
  }

  reset() {
    this.setState({ editorState: EditorState.createEmpty() });
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

DescriptionEditor.propTypes = {
  setDescriptionText: PropTypes.func.isRequired,
};

export default DescriptionEditor;
