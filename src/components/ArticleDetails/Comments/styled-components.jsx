import styled, { css } from 'styled-components';
import Button from '../../UI/Button';

export const CommentBoxContainer = styled.div`
  /* white */
  padding: 14px;
  background: #ffffff;
  border-radius: 16px;

  /* DS Focus 0-12 (10%) */

  filter: drop-shadow(0px 0px 12px rgba(97, 124, 255, 0.1));
`;

export const CommentBoxHeader = styled.div`
  display: flex;
  flex-direction: row;

  & svg {
    cursor: pointer;
  }
`;

export const CommentBoxActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  button {
    margin: 7px;
  }
`;

export const CommenterInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`;

export const CommenterProfileImageContainer = styled.div`
  overflow: hidden;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 0;
  margin-right: 10px;
  margin-bottom: 0;

  & img {
    width: 24px;
    height: auto;
  }
`;

export const CommenterName = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  align-items: center;

  /* dark */

  color: #1f1f3d;
`;

const CloseButton = styled(Button)`
  display: block;
  font-size: 30px;
  color: ${(props) => props.theme.baseColors.middle};

  ${(props) =>
    props.show && !props.disabled
      ? css`
          display: block;
          input {
            border: 1px solid ${(props) => props.theme.accentColors.primary.color};
          }
          &:hover {
            color: ${(props) => (props.theme.isDark ? props.theme.baseColors.light : props.theme.baseColors.dark)};
          }
        `
      : null}
`;
