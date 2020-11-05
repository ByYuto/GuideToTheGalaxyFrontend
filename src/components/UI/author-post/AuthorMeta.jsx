import React from 'react';
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';
import FlexContainer from '../FlexContainer';
import { AuthorMetaLayout } from './styled-components';
import PropTypes from 'prop-types';

export default function AuthorMeta({ authorName, postDate, avatarUrl }) {
  return (
    <AuthorMetaLayout>
      <FlexContainer align="center">
        <figure className="post-author-avatar">
          <img src={avatarUrl ? avatarUrl : AvatarPlaceholder} alt={authorName} />
        </figure>
        <div className="author-metadata">
          <div>
            <strong>{authorName}</strong>
          </div>
          <div>
            <span>{postDate}</span>
          </div>
        </div>
      </FlexContainer>
    </AuthorMetaLayout>
  );
}

AuthorMeta.propTypes = {
  authorName: PropTypes.string.isRequired,
  postDate: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
};
