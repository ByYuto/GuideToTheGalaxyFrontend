import styled, { css } from 'styled-components';

const Tag = styled.span`
  align-items: center;
  text-align: center;
  border-radius: 18px;
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.sm &&
    css`
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      display: inline-flex;
      padding: 6px 21px;
      margin-left: 5px;
    `}
  ${(props) =>
    props.md &&
    css`
      padding: 4px 21px;
      display: inline-block;
      text-align: center;
      margin: 8px;
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      text-align: center;
    `}
  ${(props) =>
    props.mt &&
    css`
      padding: 4px 21px;
      display: inline-block;
      text-align: center;
      margin: 8px;
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
    `}

  ${(props) =>
    !props.theme.isDark &&
    props.tagType === 'primary' &&
    css`
      background-color: #f6f8ff;
      color: #6670f0 !important;
    `}

  ${(props) =>
    props.theme.isDark &&
    props.tagType === 'primary' &&
    css`
      background-color: #6670f0;
      color: #151531;

      &:hover {
        box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
      }
    `}

  ${(props) =>
    props.theme.isDark &&
    props.tagType === 'secondary' &&
    css`
      background-color: #3b3b64;
      color: #bdbfdf;
      &:hover {
        background: #bdbfdf;
        box-shadow: 0px 4px 12px rgba(116, 140, 255, 0.24);
        border-radius: 18px;
        color: #151531;
      }
    `}
`;

export default Tag;
