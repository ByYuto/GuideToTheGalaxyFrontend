import React, { useRef } from 'react';

import { MediaToolbarLayout } from './styledComponents';
import { ImageMediaIcon, VideoMediaIcon, HaveFive, PlusIcon } from '../../../assets/icons/svg-icons';
import { insertImage } from './customContent';
import { uploadImage } from '../../../http/createArticleService';
import { useHistory } from 'react-router-dom';

const MediaToolbar = ({ editor, onInsert }) => {
  const inputRef = useRef(null);
  const handleImgSelect = () => inputRef.current.click();
  const history = useHistory();
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
      localStorage.removeItem('_token').then(() => history.push('/'));
    }
  };
  return (
    <MediaToolbarLayout>
      <button onClick={onInsert}>
        <PlusIcon /> INSERT
      </button>
      <input type="file" ref={inputRef} onChange={handleUploadImage} />
      <button
        onClick={(event) => {
          handleImgSelect();
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
