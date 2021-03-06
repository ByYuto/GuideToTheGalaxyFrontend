import styled from 'styled-components';
import FlexContainer from '../UI/FlexContainer';
import { screen } from '../../utils/constants';

const MOBILE_SIZE = 864;
export const customStyle = {
  indicatorsContainer: (provided, state) => ({ color: state.isFocused ? 'white' : '#BDBFDF' }),
  indicatorSeparator: () => ({ display: 'none' }),
  control: (provided, state) => ({
    all: 'unset',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    lineHeight: '22px',
    background: '#151531',
    display: 'flex',
    margin: 'auto',
    paddingTop: '2px',
    paddingBottom: '2px',
    border: '1px solid transparent',
    borderColor: state.isFocused ? '#6670f0' : 'transparent',
    boxShadow: state.isFocused ? '0px 0px 12px rgba(97, 124, 255, 0.1)' : 'none',
    borderRadius: '0 50px 50px 0 ',
    color: '#f6f8ff',
    width: '193px',
  }),
  input: (provided, state) => ({
    all: 'unset',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    lineHeight: '22px',
    background: '#151531',
    display: 'flex',
    margin: 'auto',
    border: '1px solid transparent',
    borderColor: state.isFocused ? '#6670f0' : 'transparent',
    boxShadow: state.isFocused ? '0px 0px 12px rgba(97, 124, 255, 0.1)' : 'none',
    borderRadius: '8px 8px  0 0 ',
    color: '#f6f8ff',
    width: '100%',
  }),
  menu: (provided, state) => ({
    background: '#151531',
    color: '#f6f8ff',
    zIndex: 99,
    position: 'absolute',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0px 0px 7px #151531',
  }),
  menuList: (provided, state) => ({ ...provided, color: '#BDBFDF', fontSize: '14px', background: state.isHover }),
};

export const HeaderSearchBarLayout = styled.div`
  width: 915px;
  position: relative;
  left: 2%;

  @media (max-width: 1300px) {
    width: 800px;
  }

  @media (min-width: 1700px) {
    left: 1.5%;
  }

  @media (max-width: 600px) {
    width: auto;
    border-radius: 8px;
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
    left: 90%;
    cursor: pointer;
    padding: 0;
    & svg path {
      fill: white;
    }
  }

  & .clear-element {
    left: ${(props) => (props.actionButton ? '82%' : '90%')};
  }

  & .search-autocomplete {
    margin: 0;
    border-radius: 8px 8px 0 0;

    & input {
      border-radius: 50px 0 0 50px;
      @media (max-width: ${screen.SM}) {
        border-radius: 8px 8px 0 0;
      }
    }
  }
  & .css-1wa3eu0-placeholder {
    color: #bdbfdf;
  }

  & .select-category.css-2b097c-container {
    @media (max-width: ${screen.SM}) {
      width: 99%;
      margin: 0;
    }
  }

  & .category__control.css-14xdnlq-Control,
  .category__control--is-focused {
    @media (max-width: ${screen.SM}) {
      width: 100%;
      margin: 0;
    }
  }

  & .category__option {
    background: #151531;
    &:hover {
      background: #1f1f3d;
      color: #6670f0;
    }
  }
  & .category__option--is-selected {
    color: #6670f0;
  }
  & .category__single-value {
    color: #bdbfdf;
  }
  & .css-tlfecz-indicatorContainer svg path,
  .css-tlfecz-indicatorContainer svg rect {
    fill: ${(props) => (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
    &:focus {
      fill: white;
    }
    &:hover {
      fill: white;
    }
  }

  & .category__control--is-focused .category__dropdown-indicator svg path {
    fill: ${(props) => (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
  }

  & .category__control {
    @media (max-width: ${screen.SM}) {
      border-radius: 0 0 8px 8px !important;
      width: 100%;
    }
  }
`;

export const SearchInputsContainer = styled(FlexContainer)`
  @media (max-width: 600px) {
    background-color: #151531;
    border-radius: 8px;
  }
`;
