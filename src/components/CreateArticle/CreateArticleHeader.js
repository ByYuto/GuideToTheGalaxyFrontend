import React from 'react';
import styled from 'styled-components';
import Caption from '../UI/Caption';
import {screen} from '../../utils/constants';
const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1px;
  padding-bottom: 10px;

  & > h3 {
    margin: 0;
    margin-top: 48px;
    margin-bottom: 32px;
    color: ${(props) => props.theme.accentColors.primary.color};
    text-align: center;
    @media(max-width: ${screen.SM}) {
      display: none;
    }
  }

  & > ${Caption} {
    color: ${(props) => props.theme.baseColors.middleLight};
    margin-bottom: 32px;
    text-align: center;
  }

  & > div {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  & .main-subtitle {
    margin-top: 40px;
    margin-bottom: 24px;
  }
`;

const CreateArticleHeader = ({ children, headerRef }) => (
  <StyledHeader ref={headerRef}>
    <h3>Create an article</h3>
    <Caption className="main-subtitle" bold>CATEGORY AND SUBCATEGORY</Caption>
    {children}
  </StyledHeader>
);

export default CreateArticleHeader;
