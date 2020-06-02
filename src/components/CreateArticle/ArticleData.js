import React from 'react';
import Caption from '../UI/Caption';
import Input from '../UI/Input';
import Styled from 'styled-components';

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

const ArticleData = ({ article, onChange }) => {
  const _onChangeData = (key, value) => {
    console.log('El valor es', value);
    const newArticle = {
      ...article,
      [key]: value,
    };
    onChange && onChange(newArticle);
  };
  return (
    <StyledArticleData>
      <Caption>KEY INFO</Caption>
      <Input placeholder="title" value={article.title} block onChange={(value) => _onChangeData('title', value)} />
      <Input placeholder="caca" value={article.title} block onChange={(value) => _onChangeData('title', value)} />
      <Input value={article.title} block onChange={(value) => _onChangeData('title', value)} />
    </StyledArticleData>
  );
};

export default ArticleData;
