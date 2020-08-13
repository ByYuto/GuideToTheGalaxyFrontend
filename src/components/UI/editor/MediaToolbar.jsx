import React from 'react';
import { MediaToolbarLayout } from './styledComponents';
import { StyledFieldTooltip } from '../../../views/CreateArticle/StyledComponents';
import { ImageMediaIcon, VideoMediaIcon, HaveFive, PlusIcon } from '../../../assets/icons/svg-icons';

const MediaToolbar = ({ onInsert }) => {
  return (
    <MediaToolbarLayout>
      <button onClick={onInsert}>
        <PlusIcon /> INSERT
      </button>
      <button onClick={null}>
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
