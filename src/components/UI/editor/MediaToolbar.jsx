import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MediaToolbarLayout } from './styledComponents';
import { ImageMediaIcon, VideoMediaIcon, ArticleIcon, PlusIcon } from '../../../assets/icons/svg-icons';
import { addImagesContent } from '../../../redux/reducers/newArticleState';
import Modal from '../modal/Modal';
import { useModal } from '../modal/useModal';
import ShareArticle from '../../CreateArticle/ShareArticle/ShareArticle';

const MAX_IMAGES = 4;

const MediaToolbar = ({ editor, onInsert, index }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const handleImgSelect = () => fileInputRef.current.click();
  const modal = useModal();
  const handleUploadImage = async (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    if (files && files.length && MAX_IMAGES - files.length >= 0) {
      dispatch(addImagesContent(index, files));
    }
  };

  return (
    <>
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
        <button onClick={modal.handleClick}>
          <ArticleIcon />
        </button>
      </MediaToolbarLayout>
      <Modal
        title="SELECT AN ARTICLE FROM THE LIBRARY"
        visible={modal.visible}
        setVisibility={modal.handleClick}
        footer={null}
        elmWidth="794px"
        elmHeight="auto"
        className="modal-articles"
      >
        <ShareArticle />
      </Modal>
    </>
  );
};

export default MediaToolbar;
