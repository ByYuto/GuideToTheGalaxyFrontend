import React, { useRef } from 'react';
import { MediaToolbarLayout } from './styled-components';
import { ImageMediaIcon, VideoMediaIcon, ArticleIcon, PlusIcon } from '../../../../assets/icons/svg-icons';
import Modal from '../../../UI/modal/Modal';
import { useModal } from '../../../UI/modal/useModal';
import ShareArticle from '../../../CreateArticle/ShareArticle/ShareArticle';
import ShareEmbed from '../../../CreateArticle/ShareEmbed/ShareEmbed';
import FlexContainer from '../../../UI/FlexContainer';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { uploadImage } from '../../../../http/createArticleService';
import { useImageWidget } from '../widgets/images/Image';

const MAX_IMAGES = 4;

const MediaToolbar = ({ editorState, index = 0, onChangeEditor, isFixed, embedActive, setEmbedActivation }) => {
  const fileInputRef = useRef(null);
  const modal = useModal();
  const imageWidget = useImageWidget();

  //embed articles insert
  const confirmArticle = (e, editorState, artId) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('ARTICLE', 'MUTABLE', { articleId: artId });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    onChangeEditor(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
  };

  //embed videos aka youtube and vimeo, iframes insert
  const confirmVideo = (editorState, videoUrl, videoType) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('VIDEO', 'MUTABLE', {
      videoId: videoUrl,
      type: videoType,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    onChangeEditor(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
  };

  //images insert

  const handleUploadImage = async (e, editorState, onChangeEditor) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    if (files && files.length && MAX_IMAGES - files.length >= 0) {
      try {
        const imageResponse = await Promise.all(files.map(uploadImage));
        imageWidget.confirmMedia(editorState, onChangeEditor, imageResponse);
      } catch (e) {}
    }
  };

  return (
    <>
      <MediaToolbarLayout isFixed={isFixed ? 1 : 0}>
        <button className="no-hover">
          <PlusIcon /> INSERT
        </button>
        <div>
          <input
            onChange={(e) => handleUploadImage(e, editorState, onChangeEditor)}
            className="d-none"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            multiple
          />
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
          >
            <ImageMediaIcon />
          </button>
        </div>
        <div className="insert-video-container">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setEmbedActivation(true);
            }}
          >
            <VideoMediaIcon />
          </button>
          <div className="input-container">
            <input type="file" />
          </div>
        </div>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            modal.handleClick();
          }}
        >
          <ArticleIcon />
        </button>
      </MediaToolbarLayout>
      {embedActive ? (
        <FlexContainer className="share-embed-input-container" justify="center">
          <ShareEmbed
            index={index}
            showEmbed={setEmbedActivation}
            confirmVideo={confirmVideo}
            editorState={editorState}
          />
        </FlexContainer>
      ) : null}

      <Modal
        title="SELECT AN ARTICLE FROM THE LIBRARY"
        visible={modal.visible}
        setVisibility={modal.handleClick}
        footer={null}
        elmWidth="794px"
        elmHeight="auto"
        className="modal-articles"
      >
        <ShareArticle
          editorState={editorState}
          confirmArticle={confirmArticle}
          contentIndex={index}
          closeModal={modal.handleClick}
        />
      </Modal>
    </>
  );
};

export default MediaToolbar;
