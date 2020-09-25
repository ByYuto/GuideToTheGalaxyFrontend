import styled from 'styled-components';

export const ReactionLayout = styled.div`
  width: ${(props) => (props.postDetail ? '323px' : '163px')};
  & span {
    color: ${(props) => (props.theme.isDark ? '#9695B7' : '#1F1F3D')};
  }

  & svg {
    cursor: pointer;
  }

  & svg rect,
  svg path,
  svg circle {
    fill: ${(props) => (props.theme.isDark ? '#9695B7' : '#1F1F3D')};
  }

  & svg:hover rect,
  svg:hover path,
  svg:hover circle {
    fill: ${(props) => (props.theme.isDark ? '#F6F8FF' : '#1F1F3D')};
  }
`;
