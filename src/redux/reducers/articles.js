import { getArticleService, getEmbedArticlesService, getEmbedArticleService } from '../../http/articleService';
import { setAuthorization } from './authState';
const initialState = {
  articles: [],
  embedArticles: [],
  filter: '',
  error: false,
  loading: false,
  errorMessage: '',
};

//actions

const SET_ARTICLES = 'SET_ARTICLES';
const SET_FILTERED_ARTICLES = 'SET_FILTERED_ARTICLES';
const LOADING_ARTICLES = 'LOADING_ARTICLES';
const ERROR_ARTICLES = 'ERROR_ARTICLES';
const SET_FILTER_VALUE = 'SET_FILTER_VALUE';

// action creators
export const getArticles = () => async (dispatch) => {
  dispatch(loadingArticles(true));
  try {
    const response = await getArticleService();
    dispatch(loadingArticles(false));
    dispatch(setArticles(response.data));
  } catch (e) {
    if (e.response.status === 401) {
      dispatch(setAuthorization(false));
    }
    dispatch(loadingArticles(false));
    dispatch({ error: true, errorMessage: e.response.data?.error || e.response.statusText });
  }
};

export const getEmbedArticles = (value) => async (dispatch) => {
  dispatch(loadingArticles(true));
  try {
    const response = await getEmbedArticlesService(value);
    dispatch(loadingArticles(false));
    dispatch(setFilteredArticles(response.data));
  } catch (e) {
    if (e.response.status === 401) {
      dispatch(setAuthorization(false));
    }
    dispatch(loadingArticles(false));
    dispatch(setErrorArticles({ error: true, errorMessage: e.response.data?.error || e.response.statusText }));
  }
};

export const getEmbedArticle = (id) => async (dispatch) => {
  dispatch(loadingArticles(true));
  try {
    const response = await getEmbedArticleService(id);
    dispatch(loadingArticles(false));
    dispatch(setFilteredArticles(response.data));
  } catch (e) {
    if (e.response.status === 401) {
      dispatch(setAuthorization(false));
    }
    dispatch(loadingArticles(false));
    dispatch(setErrorArticles({ error: true, errorMessage: e.response.data?.error || e.response.statusText }));
  }
};

export const setArticles = (articles) => ({ type: SET_ARTICLES, payload: articles });

export const setFilteredArticles = (articles) => ({ type: SET_FILTERED_ARTICLES, payload: articles });

export const loadingArticles = (isLoading) => ({ type: LOADING_ARTICLES, payload: isLoading });

export const setErrorArticles = (error) => ({ type: ERROR_ARTICLES, payload: error });

export const setFilterValue = (value) => ({ type: SET_FILTER_VALUE, payload: value });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: [state.articles, ...payload],
      };
    case SET_FILTERED_ARTICLES:
      return {
        ...state,
        embedArticles: [...payload],
      };
    case LOADING_ARTICLES:
      return {
        ...state,
        loading: payload,
      };
    case ERROR_ARTICLES:
      return {
        ...state,
        error: payload.error,
        errorMessage: payload.errorMessage,
      };

    case SET_FILTER_VALUE:
      return {
        ...state,
        filter: payload,
      };

    default:
      return state;
  }
};
