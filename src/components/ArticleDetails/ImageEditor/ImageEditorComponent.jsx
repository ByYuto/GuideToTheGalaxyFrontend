import React, { useState } from 'react';
import { ImagesContainer, ImageWrapper, ImageItem } from './styled-components';
import { Portal } from 'rsuite';
import styled from 'styled-components';

const ImageEditorComponent = (props) => {
  return (
    <ImagesContainer aria-label="Photos" role="group">
      {props.images.map((item, imgIndex) => (
        <GalleryImage length={props.images.length} item={item} imgIndex={imgIndex} key={item.imageId} />
      ))}
    </ImagesContainer>
  );
};

ImageEditorComponent.defaultProps = {
  images: [],
};

function GalleryImage({ item, imgIndex, length }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <ImageWrapper position={imgIndex} length={length}>
        <ImageItem onClick={() => setShow(true)} src={item.url.medium || item.url} />
      </ImageWrapper>
      {show && (
        <Portal>
          <FullImage onClick={() => setShow(false)}>
            <img onClick={() => setShow(false)} src={item.url.large || item.url} />
          </FullImage>
        </Portal>
      )}
    </>
  );
}

const FullImage = styled.figure`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 30;
  top: 0;
  margin: 0;
  & img {
    width: 400px;
    height: auto;
  }
`;

export default ImageEditorComponent;
