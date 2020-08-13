import React, { useState, useRef } from 'react';

import { MediaToolbarLayout } from './styledComponents';
import { ImageMediaIcon, VideoMediaIcon, HaveFive, PlusIcon } from '../../../assets/icons/svg-icons';
import { insertImage } from './customContent';
import { uploadImage } from '../../../http/createArticleService';
import { useHistory } from 'react-router-dom';

const MediaToolbar = ({ editor, onInsert }) => {
  const inputRef = useRef(null);
  const handleImgSelect = () => inputRef.current.click();
  const history = useHistory();
  const [inputMedia, setVisibleInputMedia] = useState(false);

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const dataSrc = event.target.files[0];
    const formData = new FormData();
    formData.append('file', dataSrc);
    try {
      const dataImage = await uploadImage(formData);
      const url = dataImage.data.url;
      if (!url) return;
      insertImage(editor, url);
    } catch (e) {
      console.log(e.response || e.message);
      localStorage.removeItem('_token');
      history.push('/');
    }
  };

  const handleVisibleMediaInput = (e) => {
    e.preventDefault();
  };
  return (
    <MediaToolbarLayout>
      <button onClick={onInsert}>
        <PlusIcon /> INSERT
      </button>
      <div>
        <input type="file" ref={inputRef} onChange={handleUploadImage} />
        <button
          onClick={(event) => {
            handleImgSelect();
          }}
        >
          <ImageMediaIcon />
        </button>
      </div>
      <div className="insert-video-container">
        <button onClick={null}>
          <VideoMediaIcon />
        </button>
        <div className="input-container">
          <input type="file" ref={inputRef} onChange={handleUploadImage} />
        </div>
      </div>
      <button onClick={null}>
        <HaveFive />
      </button>
    </MediaToolbarLayout>
  );
};

export default MediaToolbar;
