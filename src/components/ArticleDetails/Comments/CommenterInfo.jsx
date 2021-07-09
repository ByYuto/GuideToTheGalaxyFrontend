import { isFunction } from 'lodash';
import React, { useCallback, useState } from 'react';
import Button from '../../UI/Button';
import TextArea from '../../UI/TextArea';
import { CommentBoxContainer } from '../ShareArticle/styled-components';
import CommenterProfileImage from './CommenterProfileImage';
import { CommenterInfoContainer, CommenterName } from './styled-components';

const CommenterInfo = ({ profileImage, name }) => {
  return (
    <CommenterInfoContainer>
      <CommenterProfileImage src={profileImage} />
      {/*<img src="https://via.placeholder.com/24" alt="profile" />*/}
      <CommenterName>{name}</CommenterName>
    </CommenterInfoContainer>
  );
};

export default CommenterInfo;
