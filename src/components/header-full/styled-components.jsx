import styled, { css } from 'styled-components';
import Button from '../../components/UI/Button';
import HeaderBackground from '../../assets/images/home-bg.jpg';
import { screen } from '../../utils/constants';

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
  }),
  menuList: (provided, state) => ({ ...provided, color: '#BDBFDF', fontSize: '14px', background: state.isHover }),
};

export const Separator = styled.div`
  display: block;
  border-left: 1px solid ${(props) => props.theme.baseColors.darker};
  height: 56px;
  margin-left: 16px;
  margin-right: 16px;
  @media (max-width: ${screen.SM}) {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

export const AddContentButton = styled(Button)`
  font-size: 24px;
`;

export const MenuButton = styled(Button)`
  font-size: 34px;
  margin-left: 16px;
  & svg:hover rect {
    fill: #cf92e5;
  }

  &.burger-btn {
    @media (max-width: ${screen.SM}) {
      display: block;
      border-radius: 0;
      padding-bottom: 1px;
    }
  }
`;

export const NotificationsButton = styled(Button)`
  font-size: 30px;
  margin-right: 16px;
  & svg:hover path {
    fill: #cf92e5;
  }
`;

export const LoginButton = styled.button`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #6670f0;
  background: none;
  outline: 0;
  border: none;
  cursor: pointer;
  @media (max-width: ${screen.SM}) {
    padding: 0;
  }
`;

export const StyledTopBar = styled.div`
  background: ${(props) => (props.home === 'home' && !props.isMobile ? 'transparent' : props.theme.baseColors.dark)};
  height: 88px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 24px 0 24px;
  ${(props) => (props.home === 'home' && !props.isSticky ? '' : 'box-shadow: 0px 1px 10px 0px #14144f;')}
  ${(props) => (props.home === 'home' && !props.isSticky ? 'position: fixed;' : '')}
  width: 100%;
  z-index: 20;
  margin-bottom: 5px;
  border-bottom: solid 1px ${(props) => (props.home === 'home' ? 'transparent' : '#151531')};

  @media (max-width: ${screen.SM}) {
    height: 64px;
  }

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;

    .dontpanic-logo {
      margin-left: 16px;
      @media (max-width: ${screen.SM}) {
        display: none;
      }
    }

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .logo {
      margin-right: 8px;
    }
  }
  .middle {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
    justify-content: center;
  }
  .right {
    display: flex;
    align-items: center;

    .menu-button {
      display: block;
      color: ${(props) => props.theme.baseColors.middleLight};
      font-size: 30px;
      height: 30px;
      line-height: 0;
    }
  }
`;
const View = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.home ? (props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white) : 'transparent'};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark)};
`;

export const MaxWidthContainer = styled.div`
  max-width: 900px;
  width: 100%;
  margin: auto;
  background-color: ${(props) =>
    props.home ? (props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white) : 'transparent'};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark)};
  @media (max-width: 600px) {
    max-width: 100vw;
    width: 100%;
    padding: 16px;
    padding-bottom: 0;
    background-color: #1f1f3d;
  }
`;

export const StyledView = styled(View)`
  justify-content: flex-start;
  height: auto;
  position: relative;

  & .create-article-divider {
    margin-bottom: 0;
    margin-top: 0;
  }

  & > * {
    flex: 0;
  }

  ${MaxWidthContainer} {
    flex-grow: 1;
  }
`;

export const FullHeaderLayout = styled.div`
  background-color: #1f1f3d;
  background-image: ${(props) => (props.home === 'home' && !props.isSticky ? `url('${HeaderBackground}')` : 'none')};
  background-size: cover;
  background-repeat: no-repeat;

  position: ${(props) => (props.isSticky ? 'fixed' : 'relative')};
  ${(props) =>
    props.isSticky &&
    css`
      top: 0;
    `};
  z-index: 15;

  ${(props) => {
    if (!props.noKeywords) {
      return props.home === 'home' && !props.isSticky
        ? css`
            height: auto;
          `
        : css`
            height: auto;
          `;
    } else {
      return props.home === 'home' || props.isSticky
        ? css`
            height: auto;
          `
        : css`
            height: ${(props) => (props.isMobile ? '64px' : '76px')};
          `;
    }
  }}

  width: 100%;

  @media (max-width: 600px) {
    background-image: none;
  }

  & .selected-keywords {
    padding-right: 30px;
  }
  & .closable {
    position: absolute;
    right: 0;
    cursor: pointer;
  }
  & .main-hero-content {
    overflow: visible;

    @media (max-width: 600px) {
      height: auto;
    }

    & img {
      @media (max-width: 600px) {
        width: 100%;
        height: auto;
      }
    }
  }
  & .searchbar-container-home {
    margin-top: 50px;
    margin-bottom: 63px;
    overflow: visible;
    @media (max-width: 864px) {
      margin-top: 10px;
      margin-bottom: 10px;
      width: 100%;
      border-radius: 8px;
    }
  }

  & .home-main-text {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #9695b7;
    margin-top: 30px;
    width: 65%;

    @media (max-width: 864px) {
      width: 100%;
    }
  }

  & .header-keywords {
    background-color: #1f1f3d;
    display: flex;
    align-items: center;
    height: 76px;
    justify-content: space-evenly;
    overflow: visible;
    width: 100%;
    position: relative;

    @media (max-width: 600px) {
      height: auto;
    }
  }

  & .css-1wa3eu0-placeholder {
    color: #bdbfdf;
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

  & .left-arrow {
    position: relative;
    left: 10px;
    cursor: pointer;
    background: transparent;
    height: 100%;
    display: flex;
    z-index: 34;
    align-items: center;
    & button {
      background-color: transparent;
      outline: 0;
      border: none;
      cursor: pointer;
    }
  }

  & .right-arrow-blurred {
    position: relative;
    right: 70px;
    cursor: pointer;
    padding-right: 20px;
    background: linear-gradient(90deg, rgba(31, 31, 61, 0.6) 50%, rgba(31, 31, 61, 0.8) 85%, rgba(31, 31, 61, 1) 65%);
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-clip: padding-box;
    height: 76px;
    display: flex;
    align-items: center;
    width: 45px;
  }

  & .left-arrow-blurred {
    position: relative;
    left: 20px;
    cursor: pointer;
    padding-left: 20px;
    background: linear-gradient(270deg, rgba(31, 31, 61, 1) 50%, rgba(31, 31, 61, 0.8) 85%, rgba(31, 31, 61, 0.6) 65%);
    filter: blur(8px);
    -webkit-filter: blur(8px);
    background-clip: padding-box;
    height: 50px;
    display: flex;
    align-items: center;
    width: 45px;
    z-index: 34;
  }

  & .right-arrow {
    position: relative;
    cursor: pointer;
    padding-left: 20px;
    background: transparent;
    height: 100%;
    display: flex;
    z-index: 34;
    align-items: center;
    & button {
      background-color: transparent;
      outline: 0;
      border: none;
      cursor: pointer;
    }
  }
`;

export const ActivateSearchBtn = styled(Button)`
  background: #151531;
  &:focus {
    background: #151531;
  }
`;
