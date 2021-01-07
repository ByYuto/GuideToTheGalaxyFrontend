import styled from 'styled-components';
import { screen } from '../../../utils/constants';

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
  @media (max-width: ${screen.SM}) {
    height: 310px;
  }
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
  @media (max-width: ${screen.SM}) {
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
