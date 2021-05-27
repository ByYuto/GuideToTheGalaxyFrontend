import { isFunction } from 'lodash';
import React, { useCallback, useState } from 'react';
import Button from '../../UI/Button';
import TextArea from '../../UI/TextArea';
import { CommentBoxContainer } from '../ShareArticle/styled-components';
import { CommenterInfoContainer, CommenterProfileImageContainer } from './styled-components';

const CommenterProfileImage = ({ src, alt }) => {
  return (
    <CommenterProfileImageContainer>
      <img src={src} alt={alt || 'Profile image'} />
    </CommenterProfileImageContainer>
  );
};

export default CommenterProfileImage;
