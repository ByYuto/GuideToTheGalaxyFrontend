import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  background: ${(props) => props.theme.accentColors.secondary.color};
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  transition: background-color 0.25s ease;
  text-transform: uppercase;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  margin-left: ${(props) => (props.span ? props.span : '2px')};
  margin-top:${(props) => (props.span ? props.span : '2px')};
  margin-right: 2px;
  min-width: ${(props) => (props.elmWidth ? props.elmWidth : 'auto')};
  min-height: ${(props) => (props.elmHeight ? props.elmHeight : 'auto')};

  &:hover {
    background: ${(props) => (props.transparent ? 'transparent' : props.theme.accentColors.secondary.hover)};
  }  

  &:disabled {
    background: ${(props) => (props.transparent ? 'transparent' : props.theme.accentColors.secondary.disabled)};
    cursor: auto;
  }

  &:hover:disabled{
    background: ${(props) => (props.transparent ? 'transparent' : props.theme.accentColors.secondary.disabled)};
    cursor: auto;
  }

  &:focus {
    box-shadow: ${(props) => (props.transparent ? 'nonw' : '0px 4px 12px rgba(44, 67, 175, 0.12)')}
  }

  /*&:active {
    box-shadow: inset 0px 4px 12px rgba(44, 67, 175, 0.2);
  }*/

  ${(props) => {
    let color = props.secondary ? props.theme.accentColors.secondary : props.theme.accentColors.primary;
    return css`
      background: ${props.transparent ? 'transparent' : color.color};
      color: ${color.text};
      &:hover {
        background: ${props.transparent ? 'transparent' : color.hover};
      }
    `;
  }}

  ${(props) =>
    props.rounded &&
    css`
      border-radius: 1000px;
      min-width: 128px;
      min-height: 32px;
    `}

  ${(props) =>
    props.circle &&
    css`
      border-radius: 1000px;
      width: ${props.size}px;
      height: ${props.size}px;
      padding: 0;
      margin-left: 5px;
      margin-right: 5px;
    `}

  ${(props) => {
    let color = props.secondary ? props.theme.accentColors.secondary : props.theme.accentColors.primary;
    return (
      props.transparent &&
      css`
        color: ${props.theme.baseColors.middleLight};

        &:hover {
          color: ${color.color};
        }
      `
    );
  }}

  ${(props) =>
    props.icon &&
    css`
      padding: 0;
    `}

  ${(props) =>
    props.disabled
      ? css`
          background-color: #bdbfdf;
          &:hover {
            background-color: #bdbfdf;
            cursor: not-allowed;
          }
        `
      : null}

  ${(props) => {
    let color = props.darker && props.theme.accentColors.darker;
    return props.darker
      ? css`
          background: ${props.transparent ? 'transparent' : color.color};
          color: ${color.text};
          text-transform: none;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;
          justify-content: flex-start;
          &:hover {
            color: ${color.textHover}};
            background: #151531 !important;
            
          }
          & svg, img {
            margin-right: 15px;
          }
        `
      : '';
  }}
`;

Button.defaultProps = {
  size: 40,
};

Button.propTypes = {
  size: PropTypes.number,
};

export default Button;
