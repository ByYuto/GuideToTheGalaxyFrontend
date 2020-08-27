import styled from 'styled-components';

const Card = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  filter: drop-shadow(0px 0px 6px rgba(120, 125, 238, 0.1));
  max-width: 360px;
  & p {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
  }
`;

export default Card;
