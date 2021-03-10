import styled, { css } from 'styled-components';
import {screen} from '../../utils/constants';
const Caption = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #bdbfdf;
  margin-bottom: 24px;

  ${(props) =>
    props.bold
      ? css`
          font-weight: bold;
        `
      : null}

  ${(props) =>
    props.caps
      ? css`
          font-size: 10px;
          line-height: 12px;
        `
      : null}

`;

export default Caption;
