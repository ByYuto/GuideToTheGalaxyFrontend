import React from 'react';
import { PunchIcon, CommentsIcon, SubMenuIcon } from '../../../assets/icons/svg-icons';
import FlexContainer from '../../components/UI/FlexContainer';
import { ReactionLayout } from './styled-components';

export default function ToolbarReactions({ submenuActive }) {
  return (
    <ReactionLayout>
      <FlexContainer justify="space-evenly" align="center" className="reactions-toolbar">
        <div>
          <FlexContainer justify="space-around" align="center" inline>
            <PunchIcon />
            <span>0</span>
          </FlexContainer>
        </div>
        <div>
          <FlexContainer justify="space-around" align="center" inline>
            <CommentsIcon />
            <span>0</span>
          </FlexContainer>
        </div>
        <div>
          <SubMenuIcon />
        </div>
      </FlexContainer>
    </ReactionLayout>
  );
}
