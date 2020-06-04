import React from 'react';
import Caption from '../UI/Caption';
import Input from '../UI/Input';
import Styled from 'styled-components';
import { useSelector } from 'react-redux';
import ArticleTemplate from './ArticleTemplate';

const StyledArticleData = Styled.div`
display: flex;
flex-direction: column;
align-items: stretch;
padding-top: 34px;
border-top: 1px solid #151531;

${Caption}{
  text-align: center;
}

`;

const categoriesSelector = (state) => state.app.categories;
const getContentType = (categories, categoryId, contentTypeId) => {
  const category = categories.find((category) => category.name === categoryId);
  return category.contentTypes.find((contentType) => contentType.name === contentTypeId);
};

const ArticleData = ({ article, onChange }) => {
  const categories = useSelector(categoriesSelector);
  const contentType = getContentType(categories, article.categoryId, article.contentTypeId);

  console.log('El contentType es', contentType);

  return (
    <StyledArticleData>
      <Caption>KEY INFO</Caption>
      <ArticleTemplate contentType={contentType} article={article} />
      {/*
      <hr></hr>
      <Input placeholder="title" value={article.title} block onChange={(value) => _onChangeData('title', value)} />
      <Input placeholder="caca" value={article.title} block onChange={(value) => _onChangeData('title', value)} />
      <Input value={article.title} block onChange={(value) => _onChangeData('title', value)} />
      */}
    </StyledArticleData>
  );
};

export default ArticleData;
