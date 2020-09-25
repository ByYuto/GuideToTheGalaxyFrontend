import styled, { css } from 'styled-components';

const FlexContainer = styled.div`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: ${(props) => (props.justify ? props.justify : 'flex-start')};
  align-items: ${(props) => (props.align ? props.align : 'flex-start')};
  flex-grow: ${(props) => (props.grow ? props.grow : 'flex-start')};
  width: ${(props) => (props.elmWidth ? props.elmWidth : 'auto')};
  flex-wrap: ${(props) => (props.breakRow ? 'wrap' : 'nowrap')};

  @media (max-width: 600px) {
    ${(props) =>
      props.smCol &&
      css`
        flex-direction: column;
      `}
  }
`;

export default FlexContainer;
