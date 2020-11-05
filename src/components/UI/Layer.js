import styled from 'styled-components';

const Layer = styled.div`
  position: absolute;
  width: 100%;
  ${(props) => (props.layerHeight ? `height:${props.layerHeight}px;` : '')}
  z-index: 17;
  opacity: 0.7;
  background-color: #151531;
`;

export default Layer;
