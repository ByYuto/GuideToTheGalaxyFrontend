import styled from 'styled-components';

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  max-width: 100%;
  height: 512px;
  justify-content: space-between;
  border-radius: 15px;
  overflow: hidden;
  margin: 20px 0;
`;

export const ImageWrapper = styled.picture`
  position: relative;
  width: ${({ position, length }) => {
    if (position === 0 && length === 1) {
      return '100%';
    } else {
      return 'calc(50% - 2px)';
    }
  }};
  height: ${({ position, length }) => {
    if ((position === 0 && length >= 1 && length <= 3) || (position === 1 && length === 2)) {
      return '100%';
    } else {
      return '254px';
    }
  }};
  margin-right: ${({ position, length }) => {
    if ((position === 0 && length > 1) || (position === 1 && length > 3)) {
      return '4px';
    } else {
      return 0;
    }
  }};
  margin-bottom: 0;
  @media (max-width: 864px) {
    height: ${({ position, length }) => {
      if ((position === 0 && length >= 1 && length <= 3) || (position === 1 && length === 2)) {
        return '100%';
      } else {
        return '154px';
      }
    }};
  }
`;

export const ImageItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  user-select: none;
`;

export const CloseButton = styled.div.attrs(() => ({
  role: 'button',
  dataFocusable: true,
  tabIndex: 0,
  ariaLabel: 'Erase image',
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 15px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.77);
  min-height: 30px;
  min-width: 30px;
  outline-style: none;
  transition-duration: 0.2s;
  padding: 0px;
  border-radius: 9999px;

  &:hover {
    background-color: rgba(26, 26, 26, 0.77);
  }
`;

export const AddButton = styled.div.attrs((props) => ({
  role: 'button',
  dataFocusable: true,
  tabIndex: 0,
  ariaLabel: 'Add image',
  ...props,
}))`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 16px;
  right: 16px;
  font-size: 15px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.77);
  min-height: 80px;
  min-width: 80px;
  outline-style: none;
  transition-duration: 0.2s;
  padding: 0px;
  border-radius: 9999px;
  padding: 0 15px;
  &:hover {
    background-color: rgba(26, 26, 26, 0.77);
  }
`;

export const ButtonLabel = styled.span`
  font-size: 14px;
  line-height: 1.8;
  color: #ffffff;
  text-align: center;
  user-select: none;
`;
