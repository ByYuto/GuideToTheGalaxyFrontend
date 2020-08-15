import React from 'react';
import { MediaToolbarLayout } from './styledComponents';
import { BoldIcon, ItalicIcon, UnderlineIcon, LinkIcon } from '../../../assets/icons/svg-icons';

export default function TextFormat({
  setBold,
  setItalic,
  setUnderlined,
  insertLink,
  activeBold,
  activeItalic,
  activeUnderline,
  editor,
}) {
  return (
    <MediaToolbarLayout left>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          setBold(editor);
        }}
        className={activeBold ? 'active' : ''}
      >
        <BoldIcon />
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          setItalic(editor);
        }}
        className={activeItalic ? 'active' : ''}
      >
        <ItalicIcon />
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          setUnderlined(editor);
        }}
        className={activeUnderline ? 'active' : ''}
      >
        <UnderlineIcon />
      </button>

      <button
        onMouseDown={(event) => {
          event.preventDefault();
        }}
      >
        <LinkIcon />
      </button>
    </MediaToolbarLayout>
  );
}
