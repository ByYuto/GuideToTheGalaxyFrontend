import styled from 'styled-components';

const Text = styled.p`
  font-family: Open Sans;
  font-size: ${props => props.big ? 16 : 14}px;
`

export default Text;