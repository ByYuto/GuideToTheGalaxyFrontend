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
        onMouseDown={(e) => {
          e.stopPropagation();
          setBold(editor);
          return;
        }}
        className={activeBold ? 'active' : ''}
      >
        <BoldIcon />
      </button>
      <button onClick={() => setItalic(editor)} className={activeItalic ? 'active' : ''}>
        <ItalicIcon />
      </button>
      <button onClick={() => setUnderlined(editor)} className={activeUnderline ? 'active' : ''}>
        <UnderlineIcon />
      </button>

      <button onClick={insertLink}>
        <LinkIcon />
      </button>
    </MediaToolbarLayout>
  );
}
