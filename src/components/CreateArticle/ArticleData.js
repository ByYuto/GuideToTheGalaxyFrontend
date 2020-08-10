import React from 'react';
import Caption from '../UI/Caption';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ArticleTemplate from './ArticleTemplate';
import UploadInput from '../UI/forms/UploadInput';

const StyledArticleImage = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .no-margin {
    margin-bottom: 0;
  }
`;
const StyledArticleFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 10px;
`;

const StyledArticleData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-top: 34px;
  /*border-top: 1px solid #151531;*/

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

const categoriesSelector = (state) => state.app.categories;
const getContentType = (categories, categoryId, contentTypeId) => {
  const category = categories.find((category) => category.name === categoryId);
  return category.contentTypes.find((contentType) => contentType.name === contentTypeId);
};

const ArticleData = ({ article, showImage, onChange }) => {
  const categories = useSelector(categoriesSelector);
  const contentType = getContentType(categories, article.categoryId, article.contentTypeId);

  return (
    <StyledArticleData>
      <StyledArticleFields>
        <Caption>KEY INFO</Caption>
        <ArticleTemplate contentType={contentType} article={article} onChange={onChange} />
      </StyledArticleFields>
      <StyledArticleImage>
        {showImage && (
          <React.Fragment>
            <Caption className="no-margin">FEATURE PHOTO</Caption>
            <UploadInput contentType={contentType} onChange={onChange} />
          </React.Fragment>
        )}
      </StyledArticleImage>
    </StyledArticleData>
  );
};

export default ArticleData;
