import React from 'react';
import { ImageWrapper, ImageItem, ImagesContainer } from './styled-components';

const ImageContent = ({ images }) => {
  return (
    <ImagesContainer aria-label="Photos" role="group">
      {images.map((item, imgIndex) => (
        <ImageWrapper position={imgIndex} length={images.length} key={imgIndex}>
          <ImageItem src={item.url} />
        </ImageWrapper>
      ))}
    </ImagesContainer>
  );
};

ImageContent.defaultProps = {
  images: [],
};

export default ImageContent;
