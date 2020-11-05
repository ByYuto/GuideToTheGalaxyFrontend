import React, { useRef } from 'react';
import { BsImages } from 'react-icons/bs';
import { AddButton, ImageWrapper, ImageItem, ImagesContainer, ButtonLabel } from './styled-components';
import messages from './messages.json';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { uploadImage } from '../../../http/createArticleService';
const MAX_FILES = 4;

const ImageEditorComponent = (props) => {
  const fileInputRef = useRef(null);

  const handleUploadImage = async (event, editorState, onChangeEditor, blockKey) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    debugger;
    if (files && files.length && MAX_FILES - (props.images.length + files.length) >= 0) {
      const imageResponse = await Promise.all(files.map(uploadImage));
      confirmMedia(editorState, onChangeEditor, imageResponse, blockKey);
    }
  };

  const confirmMedia = (editorState, onChangeEditor, imageInfo, blockKey) => {
    const contentState = editorState.getCurrentContent();
    const imageBlock = contentState.getBlockForKey(blockKey);
    const imageEntity = imageBlock.getEntityAt(0);
    const imageEntityF = contentState.getEntity(imageEntity);
    const { images } = imageEntityF.getData();
    const contentStateWithEntity = contentState.replaceEntityData(imageEntity, {
      images: [...images, ...imageInfo],
    });
    const newEditorState = EditorState.set(props.editorState, { currentContent: contentStateWithEntity });
    debugger;
    onChangeEditor(AtomicBlockUtils.insertAtomicBlock(newEditorState, imageEntity, ' '));

    //focus on editor
  };

  const onAddImage = (e) => {
    e.preventDefault();
    props.setBlockKey(props.blockKey);
    props.setImagesGallery(props.images);
    props.imageInputRef.current.click();
  };

  return (
    <ImagesContainer aria-label="Photos" role="group">
      {props.images.map((item, imgIndex) => (
        <ImageWrapper position={imgIndex} length={props.images.length} key={imgIndex}>
          <ImageItem src={item.url} />
        </ImageWrapper>
      ))}
      <>
        {props.images.length < 4 && fileInputRef ? (
          <AddButton onMouseDown={(e) => onAddImage(e)}>
            <BsImages color="#FFFFFF" size={26} />
            <ButtonLabel>{messages.add}</ButtonLabel>
          </AddButton>
        ) : null}
        <input
          className="d-none"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            e.preventDefault();
            handleUploadImage(e, props.editorState, props.onChangeEditor, props.blockKey);
          }}
          multiple
        />
      </>
    </ImagesContainer>
  );
};

ImageEditorComponent.defaultProps = {
  images: [],
};

export default ImageEditorComponent;
