import React from 'react';
import { ImagesContainer, ImageWrapper, ImageItem } from './styled-components';

const ImageEditorComponent = (props) => {
  return (
    <ImagesContainer aria-label="Photos" role="group">
      {props.images.map((item, imgIndex) => (
        <ImageWrapper position={imgIndex} length={props.images.length} key={imgIndex}>
          <ImageItem src={item.url} />
        </ImageWrapper>
      ))}
    </ImagesContainer>
  );
};

ImageEditorComponent.defaultProps = {
  images: [],
};

export default ImageEditorComponent;
