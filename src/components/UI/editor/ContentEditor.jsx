import React, { useMemo, useState, useCallback, useRef } from 'react';
import { createEditor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact, useFocused, useSelected } from 'slate-react';
import { LayoutEditor, EditorContainer } from './styledComponents';
import MediaToolbar from './MediaToolbar';
import TextFormat from './TextFormat';
import { useDispatch } from 'react-redux';
import { insertArticleContent, changeFocusEditor } from '../../../redux/reducers/newArticleState';
import { withImages, insertImage, isImageUrl } from './customContent';
import { css } from 'styled-components';

export default function ContentEditor({ id, editorValue, focused }) {
  const editor = useMemo(() => withImages(withReact(createEditor())), []);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underlined, setUnderlined] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState(editorValue);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'image':
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const toggleBoldMark = (editor) => {
    const isActive = bold;
    setBold(!bold);
    Transforms.setNodes(editor, { bold: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  };

  const toggleItalicMark = (editor) => {
    const isActive = italic;
    setItalic(!italic);
    Transforms.setNodes(editor, { italic: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  };

  const toggleUnderlinedMark = (editor) => {
    const isActive = underlined;
    setUnderlined(!underlined);
    Transforms.setNodes(editor, { underline: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  };

  const handleInsertContent = () => {
    if (value.length > 0 && value[0].children[0].text !== '') {
      dispatch(insertArticleContent({ id: id, content: value }));
    } else {
      dispatch(changeFocusEditor(999));
    }
  };

  const handleFocus = () => {
    dispatch(changeFocusEditor(id));
  };
  return (
    <EditorContainer
      key={id}
      onMouseLeave={() => dispatch(changeFocusEditor(999))}
      onMouseEnter={() => dispatch(changeFocusEditor(id))}
    >
      {focused && (
        <TextFormat
          setBold={toggleBoldMark}
          setItalic={toggleItalicMark}
          setUnderlined={toggleUnderlinedMark}
          activeBold={bold}
          activeItalic={italic}
          activeUnderline={underlined}
          editor={editor}
        />
      )}

      <LayoutEditor>
        <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Type text here..."
            autoFocus={focused}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                handleInsertContent();
              }
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                case 'b': {
                  event.preventDefault();
                  const isActive = bold;
                  setBold(!bold);
                  Transforms.setNodes(
                    editor,
                    { bold: isActive ? null : true },
                    { match: (n) => Text.isText(n), split: true }
                  );

                  break;
                }
              }
            }}
          />
        </Slate>
      </LayoutEditor>
      {focused && <MediaToolbar editor={editor} onInsert={handleInsertContent} />}
    </EditorContainer>
  );
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          style={{
            display: 'block',
            maxWidth: '90%',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
          }}
        />
      </div>
      {children}
    </div>
  );
};