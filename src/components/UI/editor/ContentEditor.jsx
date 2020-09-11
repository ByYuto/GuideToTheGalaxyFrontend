import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { createEditor, Transforms, Text, Editor } from 'slate';
import { Slate, Editable, withReact, useFocused, useSelected, ReactEditor } from 'slate-react';
import { LayoutEditor, EditorContainer } from './styledComponents';
import MediaToolbar from './MediaToolbar';
import TextFormat from './TextFormat';
import { useDispatch } from 'react-redux';
import {
  insertArticleContent,
  onChangeArticleContent,
  changeFocusEditor,
} from '../../../redux/reducers/newArticleState';
import { insertUrl, withLinks, isLinkActive } from './link/linkHelpers';

export default function ContentEditor({ id, editorValue, focused, index }) {
  const editor = useMemo(() => withLinks(withReact(createEditor())), []);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underlined, setUnderlined] = useState(false);
  const [link, setLink] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState(editorValue);
  const [url, setUrl] = useState('');

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'link':
        return (
          <a {...props.attributes} href={props.element.url}>
            {props.children}
          </a>
        );
      case 'image':
        return <ImageElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const handleLink = () => {
    insertUrl(editor, url);
  };

  const renderLeaf = useCallback((props) => {
    if (props.leaf.link) {
      console.log(url);
      return <Leaf {...props} url={url} />;
    } else {
      return <Leaf {...props} />;
    }
  }, []);

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
      dispatch(insertArticleContent({ id: id, content: value, type: 'paragraph' }));
    } else {
      //dispatch(changeFocusEditor(999));
    }
  };

  const handleOnChange = (value) => {
    setValue(value);
  };

  const handleFocus = () => {
    dispatch(changeFocusEditor(id));
  };

  const handleActiveClickLink = () => {
    Transforms.setNodes(editor, { type: 'link', url }, { match: (n) => Editor.isInline(editor, n) });
    setUrl('');
  };

  useEffect(() => {
    if (focused) {
      ReactEditor.focus(editor);
    }
    setTimeout(() => dispatch(onChangeArticleContent({ id: id, content: value, type: 'paragraph' })), 500);
  }, [value]);

  return (
    <EditorContainer
      key={id}
      onMouseDown={(e) => {
        dispatch(changeFocusEditor(id));
      }}
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
          activeLink={link}
          setLink={setLink}
          handleLink={handleLink}
          setUrl={setUrl}
          url={url}
        />
      )}
      <LayoutEditor focused={focused}>
        <Slate editor={editor} value={value} onChange={(newValue) => handleOnChange(newValue)}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Type text here..."
            autoFocus={focused}
            className={focused ? 'current-editor' : ''}
            onKeyDown={(event) => {
              if (event.shiftKey && event.keyCode === 13) {
                event.preventDefault();
                editor.insertBreak();
              } else if (event.keyCode === 13) {
                event.preventDefault();
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
                case 'Enter':
                  event.preventDefault();
              }
            }}
          />
        </Slate>
      </LayoutEditor>
      {focused && <MediaToolbar index={index} editor={editor} onInsert={handleInsertContent} />}
    </EditorContainer>
  );
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = ({ attributes, children, leaf, url }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.link) {
    children = (
      <a target="_blank" href={url}>
        {children}
      </a>
    );
  }

  return <span {...attributes}>{children}</span>;
};

const ImageElement = ({ attributes, children, element }) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          alt="descriptive about the article"
          src={element.url}
          style={{
            display: 'block',
            maxWidth: '90%',
            height: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 16,
          }}
        />
      </div>
      {children}
    </div>
  );
};
