import { useState, useEffect } from 'react';
import { getEmbedArticleService } from '../http/articleService';


export const useArticle = (articleId) => {
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

  return {
      article,
      error
  }
};
