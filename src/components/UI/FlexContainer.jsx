import styled from 'styled-components';

const FlexContainer = styled.div`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: ${(props) => (props.justify ? props.justify : 'flex-start')};
  align-items: ${(props) => (props.align ? props.align : 'flex-start')};
  flex-grow: ${(props) => (props.grow ? props.grow : 'flex-start')};
  width: ${(props) => (props.elmWidth ? props.elmWidth : 'auto')};
  flex-wrap: ${(props) => (props.breakRow ? 'wrap' : 'nowrap')};
`;

export default FlexContainer;
