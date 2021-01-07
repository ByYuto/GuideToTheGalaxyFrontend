import React from 'react';
import GeneralTemplate from './Templates/GeneralTemplate';

const ArticleTemplate = ({ contentType, article, onChange, readOnly }) => {
  const _onChangeData = (key, value) => {
    const newArticle = {
      ...article,
      [key]: value,
    };
    onChange && onChange(newArticle);
  };

  let SelectedArticleTemplate = GeneralTemplate;
 

  return <SelectedArticleTemplate
    contentType={contentType}
    article={article}
    onChangeData={_onChangeData}
    readOnly={readOnly}
  />
};

export default ArticleTemplate;
