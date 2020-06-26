import React from 'react';
import Caption from '../UI/Caption';
import Input from '../UI/Input';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ArticleTemplate from './ArticleTemplate';
import { Editor } from '@tinymce/tinymce-react';

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
`;
/*
const categoriesSelector = (state) => state.app.categories;
const getContentType = (categories, categoryId, contentTypeId) => {
  const category = categories.find((category) => category.name === categoryId);
  return category.contentTypes.find((contentType) => contentType.name === contentTypeId);
};
*/
const ArticleContentPart = ({ contentPart, article, onChange }) => {
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    onChange && onChange(content);
  };
  return (
    <Editor
      inline={true}
      initialValue={contentPart.content}
      init={{
        height: 500,
        menubar: false,
        branding: false,
        plugins: ['autolink link fullscreen insertdatetime media table paste'],
        toolbar: 'bold italic link unlink',
        link_context_toolbar: true,
        default_link_target: '_blank',
        link_assume_external_targets: true,
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

const ArticleContent = ({ article, onChange }) => {
  console.log(article.content);
  return (
    <StyledArticleContent>
      <MaxWidthContainer>
        <p style={{ textAlign: 'center' }}>
          <Caption>MAIN CONTENT</Caption>
        </p>
        {article.content && article.content.length
          ? article.content.map((contentPart) => <ArticleContentPart contentPart={contentPart} handleEditorChange />)
          : null}
      </MaxWidthContainer>
    </StyledArticleContent>
  );
};

export default ArticleContent;
