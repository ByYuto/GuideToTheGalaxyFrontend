import React from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';

const StyledFooter = styled.div`
  display: flex;
  //flex-direction: row;
  justify-content: center;
  background: ${props => props.theme.baseColors.dark};
  border-top: 1px solid ${props => props.theme.accentColors.primary.color};
  padding-top: 24px;
  padding-bottom: 24px;
  ${Button} {
    min-width: 128px;
    background-color: ${props => props.theme.baseColors.middle};
  }
`

const CreateArticleFooter = ({ onExitClick, onNextClick }) => <StyledFooter>
  <Button primary rounded onClick={onExitClick}>EXIT</Button>
  <Button primary rounded onClick={onNextClick}>NEXT</Button>
</StyledFooter>

export default CreateArticleFooter;