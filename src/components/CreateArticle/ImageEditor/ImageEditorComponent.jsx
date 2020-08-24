import React, { useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { BsImages } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { CloseButton, AddButton, ImageWrapper, ImageItem, ImagesContainer, ButtonLabel } from './styled-components';
import messages from './messages.json';
import { deleteImage, deleteContent, addImages } from '../../../redux/reducers/newArticleState';

const MAX_FILES = 4;

const ImageEditorComponent = ({ contentId, images }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleUploadImage = async (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    if (files && files.length && MAX_FILES - (images.length + files.length) >= 0) {
      dispatch(addImages(contentId, files));
    }
  };

  const onAddImage = () => {
    fileInputRef.current.click();
  };

  return (
    <ImagesContainer aria-label="Photos" role="group">
      {images.map((item, imgIndex) => (
        <ImageWrapper position={imgIndex} length={images.length} key={imgIndex}>
          <CloseButton
            onClick={() => {
              if (images.length === 1) {
                return dispatch(deleteContent(contentId));
              }
              dispatch(deleteImage(contentId, imgIndex));
            }}
          >
            <RiCloseLine color="#FFFFFF" size={22} />
          </CloseButton>
          <ImageItem src={item.url} />
        </ImageWrapper>
      ))}
      <>
        {images.length < 4 && fileInputRef ? (
          <AddButton onClick={onAddImage}>
            <BsImages color="#FFFFFF" size={26} />
            <ButtonLabel>{messages.add}</ButtonLabel>
          </AddButton>
        ) : null}
        <input
          className="d-none"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUploadImage}
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
