import styled from 'styled-components';

export const AutocompleteLayout = styled.div`
  position: relative;
  margin-left: 2px;
  margin-right: 2px;
  width: 100%;
  & .input-autocomplete-container {
    position: relative;
  }
  & input {
    all: unset;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 22px;
    width: ${(props) => (props.leftIcon ? '84.5%' : '100%')};

    padding: 9px 25px 9px ${(props) => (props.leftIcon ? '30px' : '10px')};
    background: #151531;
    display: flex;
    margin: auto;
    border: 1px solid transparent;
    color: #f6f8ff;
    border-radius: 8px;
    &:focus {
      border: 1px solid transparent;
      color: #f6f8ff;
      border-color: #6670f0;
      box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    }
    &::placeholder {
      color: ${(props) => (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
    }

    @media (max-width: 1300px) {
      width: ${(props) => (props.leftIcon ? '81.5%' : '100%')};
    }
  }

  & .clear-element {
    position: absolute;
    position: absolute;
    top: 15%;
    left: 90%;
    font-size: 19px;
    cursor: pointer;
    opacity: 0.7;
    color: ${(props) => props.theme.baseColors.middleLight};
    &:hover {
      color: white;
      opacity: 1;
    }
  }

  & .location-icon {
    position: absolute;
    top: 28%;
    left: 10px;
    width: 16px;
    height: 16px;
    & path,
    rect {
      fill: rgb(102, 112, 240);
    }
  }

  & .autocomplete-dropdown-container {
    border-radius: 0 0 8px 8px;
    background-color: #151531;
    color: #bdbfdf;
    position: absolute;
    z-index: 99;
    width: 100%;
    box-shadow: 0px 1px 7px 0px #151531;

    & .suggestion-item:last-child {
      border-radius: 0 0 8px 8px;
    }
  }

  & .action-button {
    position: absolute;
    top: 20%;
    left: 100%;
  }
`;

export const SuggestionLayout = styled.div`
  background-color: #151531;
  color: ${(props) => (props.isActive ? 'white' : '#bdbfdf')};
  padding: 12px;
  border: 0.5px solid #1f1f3d;
  &:last-child {
    border-radius: 8px;
  }
  & span {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    /* or 157% */

    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &:hover {
    background-color: #1f1f3d;
    color: #6670f0;
  }
`;
