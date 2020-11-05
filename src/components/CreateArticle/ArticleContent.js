import React from 'react';
import Caption from '../UI/Caption';
import styled from 'styled-components';
import Divider from '../UI/Divider';
import UploadPdf from '../UI/forms/UploadPdf';
import ToggleContributor from '../UI/ToggleContributor';

//dante editor

import ContentEditor from './DanteEditor/ContentEditor';

const StyledArticleImage = styled.div`
  padding: 0 10px;
`;
const StyledArticleFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 10px;
`;

const StyledArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: 34px;
  border-top: 1px solid #151531;

  ${Caption} {
    text-align: center;
  }

  ${StyledArticleFields} {
    flex-basis: 0;
    flex-grow: 7;
  }
  ${StyledArticleImage} {
    flex-basis: 0;
    flex-grow: 3;
  }
`;

export const MaxWidthContainer = styled.div`
  max-width: 1016px;
  width: 100%;
  margin: auto;
  .dante-editor-container {
    position: relative;
  }
`;








const ArticleContent = () => {

  return (
    <StyledArticleContent>
      <MaxWidthContainer>
        <p style={{ textAlign: 'center' }}>
          <Caption bold>MAIN CONTENT</Caption>
        </p>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <ContentEditor  />
      </MaxWidthContainer>
      <MaxWidthContainer>
        <Divider />
        <UploadPdf />
        <ToggleContributor />
      </MaxWidthContainer>
    </StyledArticleContent>
  );
};

export default ArticleContent;
