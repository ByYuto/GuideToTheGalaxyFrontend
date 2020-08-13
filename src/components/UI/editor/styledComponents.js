import styled from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LayoutEditor = styled.div`
  position: relative;
  border-radius: 8px;
  border: 0.5px solid transparent;
  padding: 5px;
  & > div {
    box-shadow: none;
    min-height: 55px;
    border-radius: 8px;
  }
  & > div:focus {
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    border: 0.5px solid #6670f0;
  }
`;

export const MediaToolbarLayout = styled.div`
  box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
  border-radius: 5px;
  display: inline-block;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: auto;

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
`;
