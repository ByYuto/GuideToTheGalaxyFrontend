import styled from 'styled-components';
import {screen} from '../../utils/constants';

export const DivInputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media(max-width: ${screen.SM}) {
    & .date-text-label {
      display: none;
    }
  }
  
`;

export const DivInputColumn = styled.div`
  display: flex;
  alignitems: center;
  justify-content: space-between;
  @media(max-width: ${screen.SM}) {
    flex-direction: column;
    & .date-input-container {
      width: 100%;
    }
  }
`;
