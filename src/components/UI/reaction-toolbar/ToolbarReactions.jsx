import React, { useState, useEffect } from 'react';
import {
  PunchIcon,
  CommentsIcon,
  SubMenuIcon,
  FlagIcon,
  ShareIcon,
  PunchIconFilled,
  CommentsIconUnfilled,
} from '../../../assets/icons/svg-icons';
import FlexContainer from '../FlexContainer';
import { ReactionLayout } from './styled-components';
import { setLikeService, unsetLikeService } from '../../../http/likeService';

export default function ToolbarReactions({ articleId, postDetail, liked, likes }) {
  const [reactions, setReactions] = useState({ like: liked, numLikes: likes });
  useEffect(() => {}, [reactions.like]);
  const setLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await setLikeService(articleId);
      setReactions({ ...reactions, like: true, numLikes: response.data.likes });
    } catch (e) {
      console.log(e.response);
    }
  };

  const unsetLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await unsetLikeService(articleId);
      setReactions({ ...reactions, like: false, numLikes: response.data.likes });
    } catch (e) {
      console.log(e.response);
    }
  };
  return (
    <ReactionLayout postDetail={postDetail ? 1 : 0}>
      <FlexContainer justify="flex-end" align="center" className="reactions-toolbar" elmWidth="100%">
        <FlexContainer elmWidth="100%">
          <FlexContainer align="center" elmWidth="100%">
            {reactions.like ? <PunchIconFilled onClick={unsetLike} /> : <PunchIcon onClick={setLike} />}
            <span>{reactions.numLikes}</span>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer elmWidth="100%">
          <FlexContainer align="center" elmWidth="100%">
            <CommentsIconUnfilled className="comment-icon" />
            <span>0</span>
          </FlexContainer>
        </FlexContainer>
        {postDetail && (
          <>
            <FlexContainer elmWidth="100%">
              <FlexContainer className="share-btn" align="center" elmWidth="100%">
                <ShareIcon />
                <span>SHARE</span>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer elmWidth="100%">
              <FlexContainer className="report-btn" align="center" elmWidth="100%">
                <FlagIcon />
                <span>REPORT</span>
              </FlexContainer>
            </FlexContainer>
          </>
        )}
        {!postDetail && (
          <FlexContainer elmWidth="100%">
            <SubMenuIcon />
          </FlexContainer>
        )}
      </FlexContainer>
    </ReactionLayout>
  );
}
