import styled from 'styled-components';

const Divider = styled.div`
  height: 1px !important;
  background-color: transparent;
  width: 100%;
  display: block;
  margin-top: 24px;
  margin-bottom: 24px;
  border-bottom: ${(props) => (props.theme.isDark ? '1px solid #151531;' : '1px solid #6670F0;')}
  content: ' ';
`;

export default Divider;
