import styled from 'styled-components';

export const DropdownLayout = styled.div`
  position: relative;
  margin-left: 2px;
  margin-right: 2px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  z-index: 10;
  background: ${(props) => (props.focused ? '#151531' : '#1F1F3D')};
  & .input-autocomplete-container {
    position: relative;
  }
  & input {
    all: unset;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: 22px;
    width: 100px;
    padding: 9px 15px 9px 9px;
    background: ${(props) => (props.focused ? '#151531' : '#1F1F3D')};
    border: none;
    color: ${(props) => (props.focused ? '#f6f8ff' : '#BDBFDF')};
    cursor: pointer;
    &:focus {
      border: none;
      color: #f6f8ff;
    }
    &::placeholder {
      color: ${(props) => (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
    }
  }

  & .clear-element {
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
    position: relative;
    width: 16px;
    height: 16px;
    left: 5px;
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
    top: 100%;
    box-shadow: 0px 1px 7px 0px #151531;
  }

  & .action-button {
    position: absolute;
    top: 20%;
    left: 100%;
  }
`;

export const OptionsLayout = styled.div`
  background-color: #151531;
  color: ${(props) => (props.isActive ? 'white' : '#bdbfdf')};
  padding: 12px;
  border: 0.5px solid #1f1f3d;
  border-radius: 0 0 8px 8px;
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
