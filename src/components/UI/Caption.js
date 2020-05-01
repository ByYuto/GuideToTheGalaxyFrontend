import styled, { css } from 'styled-components';

const Caption = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;

  ${props => props.bold ? css`
    font-weight: bold;
  ` : null}

  ${props => props.caps ? css`
      font-size: 10px;
      line-height: 12px;
  ` : null}
`

export default Caption