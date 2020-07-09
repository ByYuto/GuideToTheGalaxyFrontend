import React from 'react';
import Caption from '../UI/Caption';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ArticleTemplate from './ArticleTemplate';

const StyledArticleImage = styled.div`
  padding: 0 10px;
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
        {showImage ? (
          <React.Fragment>
            <Caption>FEATURE PHOTO</Caption>
            {/*<p>Aqui va a ir el selector de imagen para selccionar la imagen del articulo</p>*/}
            {/*<img src="https://via.placeholder.com/288x168" alt="placeholder" />*/}
            <img src="https://dummyimage.com/288x168" alt="placeholder" />
          </React.Fragment>
        ) : null}
      </StyledArticleImage>
    </StyledArticleData>
  );
};

export default ArticleData;
