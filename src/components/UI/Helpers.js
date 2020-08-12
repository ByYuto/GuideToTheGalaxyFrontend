import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
  justify-content: ${(props) => (props.justify ? props.justify : 'flex-start')};
  align-items: ${(props) => (props.align ? props.align : 'unset')};
  padding: ${(props) => (props.padding ? props.padding : '24px')};
  margin: ${(props) => (props.span ? props.span : '24px')};
  flex-grow: ${(props) => (props.grow ? props.grow : '1')};
`;
