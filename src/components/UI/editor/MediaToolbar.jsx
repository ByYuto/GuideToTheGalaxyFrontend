import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MediaToolbarLayout } from './styledComponents';
import { ImageMediaIcon, VideoMediaIcon, HaveFive, PlusIcon } from '../../../assets/icons/svg-icons';
import { addImagesContent } from '../../../redux/reducers/newArticleState';

const MAX_IMAGES = 4;

const MediaToolbar = ({ editor, onInsert, index }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const handleImgSelect = () => fileInputRef.current.click();

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    if (files && files.length && MAX_IMAGES - files.length >= 0) {
      dispatch(addImagesContent(index, files));
    }
  };

  return (
    <MediaToolbarLayout>
      <button onClick={onInsert}>
        <PlusIcon /> INSERT
      </button>
      <div>
        <input
          className="d-none"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUploadImage}
          multiple
        />
        <button onMouseDown={handleImgSelect}>
          <ImageMediaIcon />
        </button>
      </div>
      <div className="insert-video-container">
        <button onClick={null}>
          <VideoMediaIcon />
        </button>
        <div className="input-container">
          <input type="file" onChange={handleUploadImage} />
        </div>
      </div>
      <button onClick={null}>
        <HaveFive />
      </button>
    </MediaToolbarLayout>
  );
};

export default MediaToolbar;
