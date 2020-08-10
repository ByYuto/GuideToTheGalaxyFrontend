import React from 'react';
import DiscontinuedTemplate from './Templates/DiscontinuedTemplate';
import GeneralTemplate from './Templates/GeneralTemplate';
import NoDateTemplate from './Templates/NoDateTemplate';
import ProductTemplate from './Templates/ProductTemplate';

const ArticleTemplate = ({ contentType, article, onChange }) => {
  const _onChangeData = (key, value) => {
    const newArticle = {
      ...article,
      [key]: value,
    };
    onChange && onChange(newArticle);
  };

  let SelectedArticleTemplate = null;
  const template = contentType ? contentType.template : 'GENERAL';
  if (template === 'GENERAL') {
    SelectedArticleTemplate = GeneralTemplate;
  } else if (template === 'NODATE') {
    SelectedArticleTemplate = NoDateTemplate;
  } else if (template === 'PRODUCT') {
    SelectedArticleTemplate = ProductTemplate;
  } else if (template === 'DISCONTINUED') {
    SelectedArticleTemplate = DiscontinuedTemplate;
  } else {
    SelectedArticleTemplate = GeneralTemplate;
  }

  return SelectedArticleTemplate ? (
    <SelectedArticleTemplate contentType={contentType} article={article} onChangeData={_onChangeData} />
  ) : (
    <p>NO Template function defined for {template}</p>
  );
};

export default ArticleTemplate;
