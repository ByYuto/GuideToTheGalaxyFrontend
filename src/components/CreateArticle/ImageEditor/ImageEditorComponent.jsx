import React, { useRef } from 'react';
import { BsImages } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import { AddButton, ImageWrapper, ImageItem, ImagesContainer, ButtonLabel, CloseButton } from './styled-components';
import messages from './messages.json';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { uploadImage } from '../../../http/createArticleService';
import { setAuthorization } from '../../../redux/reducers/authState';
import { useDispatch } from 'react-redux';
const MAX_FILES = 4;

const ImageEditorComponent = (props) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleUploadImage = async (event, editorState, onChangeEditor, blockKey) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    if (files && files.length && MAX_FILES - (props.images.length + files.length) >= 0) {
      try {
        const imageResponse = await Promise.all(files.map(uploadImage));
        confirmMedia(editorState, onChangeEditor, imageResponse, blockKey);
      } catch (e) {
        console.log(e);
        if (e.response?.status === 401) {
          dispatch(setAuthorization(false));
        }
      }
    }
  };

  const confirmMedia = (onChangeEditor, imageInfo, blockKey) => {
    const { contentState } = props;
    const imageBlock = contentState.getBlockForKey(blockKey);
    const imageEntity = imageBlock.getEntityAt(0);
    const imageEntityF = contentState.getEntity(imageEntity);
    const { images } = imageEntityF.getData();
    const contentStateWithEntity = contentState.replaceEntityData(imageEntity, {
      images: [...images, ...imageInfo],
    });
    const newEditorState = EditorState.set(props.editorState, { currentContent: contentStateWithEntity });
    onChangeEditor(AtomicBlockUtils.insertAtomicBlock(newEditorState, imageEntity, ' '));

    //focus on editor
  };

  const onAddImage = (e) => {
    e.preventDefault();
    props.setBlockKey(props.blockKey);
    props.setImagesGallery(props.images);
    props.imageInputRef.current.click();
  };

  const onDeleteImage = (imgIndex) => {
    const { contentState, editorState, onChangeEditor } = props;
    const imageBlock = contentState.getBlockForKey(props.blockKey);
    const imageEntity = imageBlock.getEntityAt(0);
    const imageEntityF = contentState.getEntity(imageEntity);
    const { images } = imageEntityF.getData();

    if (images.length === 1) {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const key = props.blockKey;
      const blockMap = contentState.getBlockMap();
      const block = blockMap.get(key);

      const newBlock = block.merge({
        text: '',
        type: 'unstyled',
        data: {},
      });
      const newContentState = contentState.merge({
        blockMap: blockMap.set(key, newBlock),
        selectionAfter: selectionState.merge({
          anchorOffset: 0,
          focusOffset: 0,
        }),
      });
      onChangeEditor(EditorState.push(editorState, newContentState, 'change-block-type'));
    } else {
      const newImgArr = images.filter((item) => item.imageId !== imgIndex);
      const contentStateWithEntity = contentState.replaceEntityData(imageEntity, {
        images: newImgArr,
      });
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
      onChangeEditor(newEditorState);
    }
  };
  console.log(props.images);
  return (
    <ImagesContainer aria-label="Photos" role="group">
      {props.images.map((item, imgIndex) => (
        <ImageWrapper position={imgIndex} length={props.images.length} key={item.imageId}>
          <CloseButton
            onMouseDown={(e) => {
              e.preventDefault();
              onDeleteImage(item.imageId);
            }}
          >
            <RiCloseLine color="#FFFFFF" size={22} />
          </CloseButton>
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
