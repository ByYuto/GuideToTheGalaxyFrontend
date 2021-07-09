import { isFunction } from 'lodash';
import React, { useCallback, useState } from 'react';
import Button from '../../UI/Button';
import TextArea from '../../UI/TextArea';
import { CommentBoxContainer } from '../ShareArticle/styled-components';

const CommentsList = ({ comments }) => {
  return (
    <CommentBoxContainer>
      <div className="header">
        <div className="commenter">
          <div className="profile-image-container">
            <img src="https://via.placeholder.com/24" alt="profile" />
          </div>
          <div className="name">Juan sin miedo</div>
        </div>
      </div>
      <TextArea
        style={{ width: '100%', margin: '7px 0' }}
        limit={300}
        placeholder="Comment here..."
        value={commentText}
        onChange={onTextChange}
        rows={4}
      ></TextArea>
      <div className="actions">
        <Button modalSecondary rounded onClick={onClearClick}>
          Clear
        </Button>
        <Button primary rounded onClick={onPostCommentClick}>
          Post Comment
        </Button>
      </div>
    </CommentBoxContainer>
  );
};

export default CommentsList;
