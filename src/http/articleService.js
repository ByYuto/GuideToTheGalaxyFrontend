import axios from 'axios';
const api = process.env.REACT_APP_API_URL;
const GET_ARTICLES = api + '/articles';
const GET_EMBED_ARTICLES = GET_ARTICLES + '/embeddables';

export const getArticleService = async () => {
  const token = await localStorage.getItem('_token');
  if (token !== null) {
    return axios.get(GET_ARTICLES, { headers: { Authorization: `Bearer ${token}` } });
  } else {
    return axios.get(GET_ARTICLES);
  }
};

export const getEmbedArticlesService = async (filter) => {
  const token = await localStorage.getItem('_token');
  const param = filter == '' ? '' : `?text=${filter}`;
  return axios.get(GET_EMBED_ARTICLES + param, { headers: { Authorization: `Bearer ${token}` } });
};

export const getEmbedArticleService = async (id) => {
  return axios.get(`${GET_EMBED_ARTICLES}/${id}`);
};

export const getArticleByIdService = async (id) => {
  return axios.get(`${GET_ARTICLES}/${id}`);
};
