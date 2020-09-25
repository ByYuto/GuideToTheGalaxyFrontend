import styled from 'styled-components';

export const customStyle = {
  indicatorsContainer: (provided, state) => ({ color: state.isFocused ? 'white' : '#BDBFDF' }),
  indicatorSeparator: () => ({ display: 'none' }),
  control: (provided, state) => ({
    all: 'unset',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    lineHeight: '22px',
    width: 'auto',
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
    width: 'auto',
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
  menu: (provided, state) => ({ ...provided, background: '#151531', color: '#f6f8ff' }),
  menuList: (provided, state) => ({ ...provided, color: '#BDBFDF', fontSize: '14px', background: state.isHover }),
};

export const HeaderSearchBarLayout = styled.div`
  width: 75%;
  & .search-autocomplete {
    margin: 0;
    & input {
      border-radius: 50px 0 0 50px;
    }
  }
  & .css-1wa3eu0-placeholder {
    color: ${(props) => (props.theme.isDark ? props.theme.baseColors.middleLight : props.theme.baseColors.middle)};
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

  & .search-inputs-container {
    @media (max-width: 600px) {
      background-color: #151531;
      padding: 10px;
    }
  }
`;
