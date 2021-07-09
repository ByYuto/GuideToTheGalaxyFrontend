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
  const img = item.url.medium || item.url;
  const imgRef = React.useRef(null);
  const [proportionTo, setProportionTo] = useState('width');

  React.useLayoutEffect(() => {
    console.log(proportionTo);
    if (imgRef && imgRef.current) {
      const width = imgRef.current.width;
      const height = imgRef.current.height;
      const proportion = width / height;
      if (proportion < 0.99) {
        setProportionTo('width');
      } else {
        setProportionTo('height');
      }
    }
  }, [show]);
  return (
    <>
      <ImageWrapper position={imgIndex} length={length}>
        <ImageItem ref={imgRef} onClick={() => setShow(true)} src={img} />
      </ImageWrapper>
      {show && (
        <Portal>
          <FullImage proportion={proportionTo} onClick={() => setShow(false)}>
            <div>
              <img onClick={() => setShow(false)} src={img} />
            </div>
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
  & div {
    width: 70vw;
    height: 70vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      object-fit: scale-down;
      width: ${(props) => (props.proportion === 'width' ? '70vw' : 'auto')};
      height: ${(props) => (props.proportion === 'height' ? '70vh' : 'auto')};
    }
  }
`;

export default ImageEditorComponent;
