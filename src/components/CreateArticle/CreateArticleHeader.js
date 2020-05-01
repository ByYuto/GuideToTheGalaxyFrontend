import React from 'react';
import styled from 'styled-components';
import Caption from '../UI/Caption';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1px;

  h3 {
    margin: 0;
    margin-top: 48px;
    margin-bottom: 32px;
    color: ${props => props.theme.accentColors.primary.color};
  }

  ${Caption} {
    color: ${props => props.theme.baseColors.middleLight};
    margin-bottom: 32px;
  }
`

const CreateArticleHeader = ({ children }) => <StyledHeader>
  <h3>Create an article</h3>
  <Caption bold >CATEGORY AND SUBCATEGORY</Caption>
  <div>
    {children}
  </div>
</StyledHeader>

export default CreateArticleHeader;