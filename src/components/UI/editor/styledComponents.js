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
    padding-left: 20px;
  }
  & > div:focus {
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    border: 0.5px solid #6670f0;
  }

  .current-editor {
    box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    border: 0.5px solid #6670f0;
  }
  ${(props) =>
    props.focused &&
    ` & 
    `}
`;

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
`;

export const InputLinkLayout = styled.div`
width: 40%;
margin-left: 8px;
@media (max-width: 600px) {
    width: 95%
  } 

  & .close-btn {
    margin-right: ${(props) => (props.disabled ? '0.5em' : '1.3em')};;
  }

  & .icon-search {
    margin-left: 10px;
  }

  & input {
      padding-left: 10px:
  }

  & input:focus {
    border: none;
    outline: 0;
  }

  & .action-button {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #6670f0;
    border: none;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    display: ${(props) => (props.disabled ? 'none' : 'flex')};
    cursor: pointer;

    & svg path, svg rect {
      fill: white;
      stroke: white;
    }
  }
`;
