import styled, { css } from 'styled-components';

export const MediaToolbarLayout = styled.div`
  box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
  border-radius: 5px;
  display: inline-block;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 5;

  & .no-hover {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #9695b7;
    cursor: context-menu;

    & svg path,
    svg rect {
      fill: #9695b7;
    }
  }

  & .no-hover:hover,
  .no-hover:hover svg path,
  .no-hover:hover svg rect {
    color: #9695b7;
    fill: #9695b7;
  }

  & div {
    display: inline-block;
  }

  & input[type='file'] {
    position: absolute;
    z-index: -999;
    opacity: 0;
  }

  ${(props) => props.left && `margin-right: auto; margin-left: 10px;`}

  & button {
    border: none;
    background-color: transparent;
    outline: 0;
    box-shadow: none;
    padding: 5px;
    cursor: pointer;
    padding: 11px 11px;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    display: inline-block;
    justify-content: center;
    align-items: center;

    &:hover {
      svg path,
      svg rect {
        fill: #6670f0;
      }
      color: #6670f0;
    }
  }

  & .active svg path,
  .active svg rect {
    fill: #6670f0;
  }

  & .insert-video-container {
    position: relative;

    & .input-container {
      position: absolute;
      top: 100%;
    }
  }

  & .link-icon {
    ${(props) => {
      switch (props.linkInputActive) {
        case 'disabled':
          return css`
            opacity: 0.4;
            &:hover {
              path,
              rect {
                fill: #1f1f3d;
              }
              color: #1f1f3d;
            }
          `;
        case 'active':
          return css`
            fill: #6670f0;
          `;
        default:
          return css``;
      }
    }}
  }

  & button[disabled] {
    cursor: not-allowed;
  }
`;
