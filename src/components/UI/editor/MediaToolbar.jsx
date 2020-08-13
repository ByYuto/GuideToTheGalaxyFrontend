import React from 'react';

import { MediaToolbarLayout } from './styledComponents';
import { ImageMediaIcon, VideoMediaIcon, HaveFive, PlusIcon } from '../../../assets/icons/svg-icons';
import { insertImage } from './customContent';

const MediaToolbar = ({ editor, onInsert }) => {
  return (
    <MediaToolbarLayout>
      <button onClick={onInsert}>
        <PlusIcon /> INSERT
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          const url = window.prompt('Enter the URL of the image:');
          if (!url) return;
          insertImage(editor, url);
        }}
      >
        <ImageMediaIcon />
      </button>
      <button onClick={null}>
        <VideoMediaIcon />
      </button>

      <button onClick={null}>
        <HaveFive />
      </button>
    </MediaToolbarLayout>
  );
};

export default MediaToolbar;
