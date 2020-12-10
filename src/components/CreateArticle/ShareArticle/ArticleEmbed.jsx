import React from 'react';
import ArticleEmbedView from './ArticleEmbedView';
import { useArticle } from '../../../hooks/useArticle';

export default function ArticleEmbed({ articleId, isPreview = false }) {
  const { article, error } = useArticle(articleId);
  return (
    <>
      {!error.status ? article && <ArticleEmbedView {...article} isPreview={isPreview} /> : <div>{error.message}</div>}
    </>
  );
}
