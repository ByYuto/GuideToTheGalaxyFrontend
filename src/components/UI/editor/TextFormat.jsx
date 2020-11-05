import React from 'react';
import { MediaToolbarLayout } from './styledComponents';
import { BoldIcon, ItalicIcon, UnderlineIcon, LinkIcon } from '../../../assets/icons/svg-icons';
import InsertLink from './link/InsertLink';
import { insertUrl } from './link/linkHelpers';

export default function TextFormat({
  setBold,
  setItalic,
  setUnderlined,
  activeBold,
  activeItalic,
  activeUnderline,
  activeLink,
  setLink,
  handleLink,
  setUrl,
  url,
  editor,
}) {
  return (
    <>
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
            setLink(!activeLink);
            /* event.preventDefault();
            const url = window.prompt('Enter the URL of the link:');
            if (!url) return;
            insertUrl(editor, url);*/
          }}
          className={activeLink ? 'active' : ''}
        >
          <LinkIcon />
        </button>
      </MediaToolbarLayout>
      {activeLink && <InsertLink setLink={setLink} handleLink={handleLink} setUrl={setUrl} url={url} editor={editor} />}
    </>
  );
}
