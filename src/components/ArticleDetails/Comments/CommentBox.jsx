import { isFunction } from 'lodash';
import React, { useCallback, useState } from 'react';
import Button from '../../UI/Button';
import TextArea from '../../UI/TextArea';
import CommenterInfo from './CommenterInfo';
import { CommentBoxActions, CommentBoxContainer, CommentBoxHeader } from './styled-components';

const CommentBox = ({ onPostComment, onClose }) => {
  const [commentText, setCommentText] = useState('');

  const onClearClick = useCallback(() => {
    setCommentText('');
  }, [setCommentText]);

  const onPostCommentClick = () => {
    isFunction(onPostComment) && onPostComment(commentText);
  };

  const onTextChange = useCallback((value) => setCommentText(value), [setCommentText]);

  return (
    <CommentBoxContainer>
      <CommentBoxHeader>
        <CommenterInfo profileImage="https://via.placeholder.com/24" name="Juan sin miedo" />
      </CommentBoxHeader>
      <TextArea
        style={{ width: '100%', margin: '7px 0' }}
        limit={300}
        placeholder="Comment here..."
        value={commentText}
        onChange={onTextChange}
        rows={4}
      ></TextArea>
      <CommentBoxActions>
        <Button modalSecondary rounded onClick={onClearClick} size={90}>
          Clear
        </Button>
        <Button primary rounded onClick={onPostCommentClick}>
          Post Comment
        </Button>
      </CommentBoxActions>
    </CommentBoxContainer>
  );
};

export default CommentBox;
