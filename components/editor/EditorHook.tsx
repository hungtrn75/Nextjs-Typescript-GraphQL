import { convertToRaw, EditorState } from "draft-js";
//@ts-ignore
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";

const EditorComponent: React.FC = () => {
  const [editor, setEditor] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => setEditor(true), []);

  const onEditorStateChange: any = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <div>
      {editor ? (
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      ) : null}
      <textarea
        style={{ width: "100%" }}
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
    </div>
  );
};

export default EditorComponent;
