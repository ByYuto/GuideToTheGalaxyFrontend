import React from 'react';
import { MediaToolbarLayout } from './styled-components';
import { BoldIcon, ItalicIcon, UnderlineIcon, LinkIcon } from '../../../../assets/icons/svg-icons';
import { RichUtils } from 'draft-js';

export default function TextFormat({
  editorState,
  setEditorState,
  promptLink,
  activeLink = false,
  styledToolbarRef,
  linkInputActive,
  setLinkInputActive,
  setSelectionState,
}) {
  const _onBoldClick = (editorState) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  const _onItalicClick = (editorState) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };
  const _onUnderlineClick = (editorState) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };
  return (
    <>
      <MediaToolbarLayout ref={styledToolbarRef} linkInputActive={linkInputActive}>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            _onBoldClick(editorState);
          }}
          className={false ? 'active' : ''}
        >
          <BoldIcon />
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            _onItalicClick(editorState);
          }}
          className={false ? 'active' : ''}
        >
          <ItalicIcon />
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            _onUnderlineClick(editorState);
          }}
          className={false ? 'active' : ''}
        >
          <UnderlineIcon />
        </button>

        <button
          onMouseDown={(event) => {
            event.preventDefault();
            setSelectionState(editorState.getSelection());
            setLinkInputActive('active');
            //promptLink();
          }}
          className={linkInputActive === 'active' ? 'active' : ''}
          disabled={linkInputActive === 'disabled'}
        >
          <LinkIcon className="link-icon" />
        </button>
      </MediaToolbarLayout>
      {/*activeLink && <InsertLink setLink={setLink} handleLink={handleLink} setUrl={setUrl} url={url} editor={editor} />*/}
    </>
  );
}
