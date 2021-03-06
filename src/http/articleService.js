import axios from 'axios';
const api = process.env.REACT_APP_API_URL;
const GET_ARTICLES = api + '/articles';
const GET_ARTICLES_BY_SEARCH = api + '/search';
const GET_EMBED_ARTICLES = GET_ARTICLES + '/embeddables';
const GET_CATEGORY_LIST = api + '/categories/list';
const GET_SUGGESTED_ARTICLES = api + '/articles/suggestions';
const GET_SEARCH_SUGGESTIONS = api + '/search/suggestions';
export const getArticleService = async (keywords) => {
  const token = await localStorage.getItem('_token');
  if (token !== null) {
    return axios.get(`${GET_ARTICLES}${keywords ? '?keywords=' + keywords : ''}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return axios.get(`${GET_ARTICLES}${keywords ? '?keywords=' + keywords : ''}`);
  }
};

export const getArticlesFilteredService = async (text, location, category, sort, keywords, page) => {
  const token = await localStorage.getItem('_token');
  const params = new URLSearchParams();
  if (text) {
    params.set('text', text);
  }
  if (category) {
    params.set('categoryId', category);
  }
  if (location) {
    params.set('placeId', location);
  }
  if (sort) {
    params.set('sortBy', sort);
  }
  //console.log('Keywords es', keywords, keywords.lenght, keywords[2]);

  if (keywords && keywords.length) {
    params.set('keywords', keywords);
  }

  if (page) {
    const limit = 20;
    params.set('limit', limit);
    params.set('skip', (page - 1) * limit);
  }
  //console.log('Consultando articulos', params.toString());

  if (token !== null) {
    return axios.get(GET_ARTICLES_BY_SEARCH + '?' + params, { headers: { Authorization: `Bearer ${token}` } });
  } else {
    return axios.get(GET_ARTICLES_BY_SEARCH + '?' + params);
  }
};

export const getSuggestedArticles = async (filter) => {
  const token = await localStorage.getItem('_token');
  const params = filter === '' ? '' : `?text=${filter}`;

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
  if (category.length > 0 && params.includes('?')) {
    params += `&categoryId=${category}`;
  }
  if (category.length > 0 && !params.includes('?')) {
    params += `?categoryId=${category}`;
  }
  if (location.length > 0 && params.includes('?')) {
    params += `&placeId=${location}`;
  }

  if (location.length > 0 && !params.includes('?')) {
    params += `?placeId=${location}`;
  }
  if (keywords.length > 0 && params.includes('?')) {
    params += `&keywords=${keywords}`;
  }
  if (keywords.length > 0 && !params.includes('?')) {
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
  const param = filter === '' ? '' : `?text=${filter}`;
  return axios.get(GET_EMBED_ARTICLES + param, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const getEmbedArticleService = async (id) => {
  const token = await localStorage.getItem('_token');
  return axios.get(`${GET_EMBED_ARTICLES}/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const getArticleByIdService = async (id) => {
  const token = await localStorage.getItem('_token');
  return axios.get(`${GET_ARTICLES}/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const getArticleBySlugService = async (slug) => {
  const token = await localStorage.getItem('_token');
  return axios.get(`${GET_ARTICLES}/by-slug/${slug}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const getCategoriesList = async () => {
  const token = await localStorage.getItem('_token');
  return axios.get(GET_CATEGORY_LIST, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};
