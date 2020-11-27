import styled, { css } from 'styled-components';

export const KeywordSelectorLayout = styled.div`
  min-height: 253px;
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  & .add-keyword-container {
    border-right: solid 1px #151531;
    padding-right: 15px;
  }

  & .recommend-keyword-container {
    padding-left: 30px;
  }

  & h5 {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #6670f0;
    margin-bottom: 16px;
    margin-top: 16px;
  }
`;

export const KeywordLayout = styled.div`
  display: flex;
  ${(props) => (props.cursorPointer ? 'cursor: pointer;' : '')}
  ${(props) =>
    !props.readonlyTag &&
    css`
      & span {
        padding-right: 30px;
      }
    `}

  & .closable {
    position: absolute;
    right: 0;
    cursor: pointer;
  }
`;

export const SearchKeywordLayout = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans';
  padding: 8px;
  color: #1f1f3d;
  border-radius: 8px;
  width: 70%;

  @media (max-width: 600px) {
    width: 95%;
  } 

  & .close-btn {
      position: relative;
      margin-bottom: 10px;
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

    & svg path {
      fill: white;
    }
  }
`;
