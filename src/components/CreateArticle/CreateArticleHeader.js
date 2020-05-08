import React from 'react';
import styled from 'styled-components';
import Caption from '../UI/Caption';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1px;

  & > h3 {
    margin: 0;
    margin-top: 48px;
    margin-bottom: 32px;
    color: ${props => props.theme.accentColors.primary.color};
    text-align: center;
  }

  & > ${Caption} {
    color: ${props => props.theme.baseColors.middleLight};
    margin-bottom: 32px;
    text-align: center;
  }

  & > div {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`

const CreateArticleHeader = ({ children }) => <StyledHeader>
  <h3>Create an article</h3>
  <Caption bold >CATEGORY AND SUBCATEGORY</Caption>
  {children}
</StyledHeader>

export default CreateArticleHeader;