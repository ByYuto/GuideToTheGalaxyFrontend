import styled from 'styled-components';

export const ReactionLayout = styled.div`
  & span {
    color: ${(props) => (props.theme.isDark ? '#9695B7' : '1F1F3D')};
  }
`;
