import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';

const StyledFooter = styled.div`
  display: flex;
  //flex-direction: row;
  justify-content: center;
  background: ${(props) => props.theme.baseColors.dark};
  border-top: 1px solid ${(props) => props.theme.accentColors.primary.color};
  padding-top: 24px;
  padding-bottom: 24px;
  z-index: 21;
  ${Button} {
    min-width: 128px;
    //background-color: ${(props) => props.theme.baseColors.middle};
    margin: 0 12px;
  }
`;

const CreateArticleFooter = ({ onExitClick, onNextClick, exitDisabled, nextDisabled }) => {
  const nextRef = useRef(null);
  return (
    <StyledFooter>
      <Button primary rounded onClick={onExitClick} disabled={exitDisabled}>
        EXIT
      </Button>
      <Button primary rounded onClick={onNextClick} disabled={nextDisabled} ref={nextRef}>
        NEXT
      </Button>
    </StyledFooter>
  );
};

export default CreateArticleFooter;
