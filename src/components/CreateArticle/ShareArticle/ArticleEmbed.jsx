import React, { useState, useEffect } from 'react';
import ArticleEmbedView from './ArticleEmbedView';
import { getEmbedArticleService } from '../../../http/articleService';
export default function ArticleEmbed({ articleId, isPreview = false }) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState({ status: false, message: '' });
  useEffect(() => {
    getArticle(articleId);
  }, [articleId]);
  const getArticle = async (artid) => {
    try {
      const resp = await getEmbedArticleService(artid);
      setArticle(resp.data);
    } catch (e) {
      setError({ status: true, message: e.response.data?.error || e.response.message });
    }
  };
  return (
    <>
      {!error.status ? article && <ArticleEmbedView {...article} isPreview={isPreview} /> : <div>{error.message}</div>}
    </>
  );
}
