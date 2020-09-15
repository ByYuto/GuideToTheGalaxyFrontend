import React, { useState, useEffect } from 'react';
import ArticleEmbedView from './ArticleEmbedView';
import { getEmbedArticleService } from '../../../http/articleService';
export default function ArticleEmbed({ id, articleId }) {
  const [article, setArticle] = useState(null);
  const [error, setError] = useState({ status: false, message: '' });
  useEffect(() => {
    getArticle(articleId);
  }, []);
  const getArticle = async (artid) => {
    try {
      const resp = await getEmbedArticleService(artid);
      setArticle(resp.data);
    } catch (e) {
      setError({ status: true, message: e.response.data?.error || e.response.message });
    }
  };
  return <>{!error.status ? article && <ArticleEmbedView {...article} /> : <div>{error.message}</div>}</>;
}
