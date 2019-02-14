import { convertToRaw, EditorState } from "draft-js";
//@ts-ignore
import draftToHtml from "draftjs-to-html";
import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";

type Props = {};

export default class EditorConvertToHTML extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editor: false,
      editorState: EditorState.createEmpty()
    };
  }

  componentDidMount() {
    this.setState({
      editor: true
    });
  }

  onEditorStateChange: any = (editorState: EditorState) => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editor, editorState } = this.state;
    return (
      <div>
        {editor ? (
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
        ) : null}
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}
