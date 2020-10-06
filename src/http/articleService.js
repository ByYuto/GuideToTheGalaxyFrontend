import axios from 'axios';
const api = process.env.REACT_APP_API_URL;
const GET_ARTICLES = api + '/articles';
const GET_ARTICLES_BY_SEARCH = api + '/search';
const GET_EMBED_ARTICLES = GET_ARTICLES + '/embeddables';
const GET_CATEGORY_LIST = api + '/categories/list';
const GET_SUGGESTED_ARTICLES = api + '/articles/suggestions';
const GET_SEARCH_SUGGESTIONS = api + '/search/suggestions';
export const getArticleService = async () => {
  const token = await localStorage.getItem('_token');
  if (token !== null) {
    return axios.get(GET_ARTICLES, { headers: { Authorization: `Bearer ${token}` } });
  } else {
    return axios.get(GET_ARTICLES);
  }
};

export const getArticlesFilteredService = async (text, location, category, keywords) => {
  const token = await localStorage.getItem('_token');
  let params = '';
  if (text.length > 0) {
    params += `?text=${text}`;
  }
  if (category.length > 0 && text.length > 0 && location.length > 0 && keywords.length > 0) {
    params += `&categoryId=${category}`;
  } else if (category.length > 0 && text.length === 0 && location.length === 0 && keywords.length === 0) {
    params += `?categoryId=${category}`;
  }
  if (location.length > 0 && text.length > 0 && category.length > 0 && keywords.length > 0) {
    params += `&placeId=${location}`;
  } else if (location.length > 0 && text.length === 0 && category.length === 0 && keywords.length === 0) {
    params += `?placeId=${location}`;
  }
  if (keywords.length > 0 && location.length > 0 && text.length > 0 && category.length > 0) {
    params += `&keywords=${keywords}`;
  } else if (keywords.length > 0 && location.length === 0 && text.length === 0 && category.length === 0) {
    params += `?keywords=${keywords}`;
  }
  if (token !== null) {
    return axios.get(GET_ARTICLES_BY_SEARCH + params, { headers: { Authorization: `Bearer ${token}` } });
  } else {
    return axios.get(GET_ARTICLES_BY_SEARCH + params);
  }
};

export const getSuggestedArticles = async (filter) => {
  const token = await localStorage.getItem('_token');
  const params = filter == '' ? '' : `?text=${filter}`;

  if (token !== null) {
    return axios.get(GET_SUGGESTED_ARTICLES + params, { headers: { Authorization: `Bearer ${token}` } });
  } else {
    return axios.get(GET_SUGGESTED_ARTICLES + params);
  }
};

export const getSuggestedSearches = async (text, location, category, keywords) => {
  const token = await localStorage.getItem('_token');
  let params = '';
  if (text.length > 0) {
    params += `?text=${text}`;
  }
  if (category.length > 0 && text.length > 0 && location.length > 0 && keywords.length > 0) {
    params += `&categoryId=${category}`;
  } else if (category.length > 0 && text.length === 0 && location.length === 0 && keywords.length === 0) {
    params += `?categoryId=${category}`;
  }
  if (location.length > 0 && text.length > 0 && category.length > 0 && keywords.length > 0) {
    params += `&placeId=${location}`;
  } else if (location.length > 0 && text.length === 0 && category.length === 0 && keywords.length === 0) {
    params += `?placeId=${location}`;
  }
  if (keywords.length > 0 && location.length > 0 && text.length > 0 && category.length > 0) {
    params += `&keywords=${keywords}`;
  } else if (keywords.length > 0 && location.length === 0 && text.length === 0 && category.length === 0) {
    params += `?keywords=${keywords}`;
  }

  if (token !== null) {
    return axios.get(GET_SEARCH_SUGGESTIONS + params, { headers: { Authorization: `Bearer ${token}` } });
  } else {
    return axios.get(GET_SEARCH_SUGGESTIONS + params);
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

export const getCategoriesList = async () => {
  return axios.get(GET_CATEGORY_LIST);
};
