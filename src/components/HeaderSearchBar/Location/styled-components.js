import styled from 'styled-components';

export const AutocompleteLayout = styled.div`
  position: relative;
  width: 100%;
  margin-left: 0px;
  margin-right: 0px;
  & .input-autocomplete-container {
    position: relative;
  }
  & input {
    all: unset;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 22px;
    width: 82.7%;
    padding: 9px 25px 9px 30px;
    background: #151531;
    display: flex;
    margin: auto;
    border: 1px solid transparent;
    color: #f6f8ff;
    &:focus {
      border: 1px solid transparent;
      color: #f6f8ff;
      border-color: #6670f0;
      box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
    }
    &::placeholder {
      color: ${(props) => (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
    }

    @media (max-width:1300px ){
      width: 79%;
    }
    @media (max-width:864px ){
      margin:0;
      width: 82%;
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
`;

export const SuggestionLayout = styled.div`
  background-color: #151531;
  color: ${(props) => (props.isActive ? 'white' : '#bdbfdf')};
  padding: 12px;
  border: 0.5px solid #1f1f3d;
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

export const PlacesAutocompleteContainerLayout = styled.div`
  position: relative;
  width: 100%;
  & validation-message {
    position: absolute;
    top: 100%;
  }
`;
