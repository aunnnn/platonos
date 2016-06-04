import React, { Component, PropTypes } from 'react';
import { Editor, EditorState } from 'draft-js';

export class HeaderEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }
  componentDidUpdate() {
    const hasText = this.state.editorState.getCurrentContent().hasText();
    if (hasText && !this.props.hasHead) this.props.setHeadTrue();
    else if (!hasText && this.props.hasHead) this.props.setHeadFalse();
  }
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        placeholder="What thought do you like to set it fly.."
      />
    );
  }
}

HeaderEditor.propTypes = {
  setHeadTrue: PropTypes.func.isRequired,
  setHeadFalse: PropTypes.func.isRequired,
  hasHead: PropTypes.bool.isRequired,
};

export default HeaderEditor;
