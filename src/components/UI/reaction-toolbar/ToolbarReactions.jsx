import React from 'react';
import { PunchIcon, CommentsIcon, SubMenuIcon, FlagIcon, ShareIcon } from '../../../assets/icons/svg-icons';
import FlexContainer from '../FlexContainer';
import { ReactionLayout } from './styled-components';

export default function ToolbarReactions({ submenuActive, postDetail }) {
  return (
    <ReactionLayout postDetail={postDetail}>
      <FlexContainer justify="space-evenly" align="center" className="reactions-toolbar" elmWidth="100%">
        <FlexContainer elmWidth="100%">
          <FlexContainer justify="space-around" align="center" elmWidth="100%">
            <PunchIcon />
            <span>0</span>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer elmWidth="100%">
          <FlexContainer justify="space-around" align="center" elmWidth="100%">
            <CommentsIcon />
            <span>0</span>
          </FlexContainer>
        </FlexContainer>
        {postDetail && (
          <>
            <FlexContainer elmWidth="100%">
              <FlexContainer justify="space-around" align="center" elmWidth="100%">
                <ShareIcon />
                <span>SHARE</span>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer elmWidth="100%">
              <FlexContainer justify="space-around" align="center" elmWidth="100%">
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
