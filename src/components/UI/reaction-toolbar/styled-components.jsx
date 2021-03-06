import styled, { css } from 'styled-components';

export const ReactionLayout = styled.div`
  width: ${(props) => (props.postDetail === 1 ? '323px' : '163px')};
  & span {
    color: ${(props) => (props.theme.isDark ? '#9695B7' : '#1F1F3D !important')};
  }

  & svg {
    cursor: pointer;
    margin-right: 5px;
  }

  & svg rect,
  svg path,
  svg circle {
    fill: ${(props) => (props.theme.isDark ? '#9695B7' : '#1F1F3D')};
  }

  & .comment-icon {
    width: 12px;
    height: 12px;
    & path {
      stroke: ${(props) => (props.theme.isDark ? '#9695B7' : '#1F1F3D')};
      fill: transparent;
    }
  }

  & .comment-icon:hover path {
    fill: ${(props) => (props.theme.isDark ? '#9695B7' : '#1F1F3D')};
  }

  & svg:hover rect,
  svg:hover path,
  svg:hover circle {
    fill: ${(props) => (props.theme.isDark ? '#F6F8FF' : '#1F1F3D')};
  }

  & .reactions-toolbar {
    & > div {
      margin-left: 4px;
      margin-right: 4px;
      padding-left: 4px;
      padding-right: 4px;
      border-right: solid 2px ${(props) => (props.theme.isDark ? '#1F1F3D' : '#F6F8FF')};
      &:last-child {
        border-right: none;
      }
      &:nth-last-child(2) {
        ${(props) =>
          props.postDetail === 1 &&
          css`
            padding-right: 8px;
          `}
      }
    }
  }

  & .share-btn,
  .report-btn {
    cursor: pointer;
  }
`;
