import API from '../../lib/API';
import { getArticleService } from '../../http/articleService';
import { setAuthorization } from './authState';
const initialState = {
  topBar: {
    visible: true,
  },
  authorization: false,
  articles: [],
  categories: null,
};

//Action Types
const APP_SET_TOPBAR_DISPLAY = 'APP_SET_TOPBAR_DISPLAY';
const APP_GET_CATEGORIES_REQUEST = 'APP_GET_CATEGORIES_REQUEST';
const APP_GET_CATEGORIES_SUCCESS = 'APP_GET_CATEGORIES_SUCCESS';
const APP_GET_CATEGORIES_ERROR = 'APP_GET_CATEGORIES_ERROR';
const SET_ARTICLES_HOME = 'SET_ARTICLES_HOME';
const LOADING = 'LOADING';

//Action Creators
export const changeAppTopbarDisplay = (visible) => ({ type: APP_SET_TOPBAR_DISPLAY, payload: { visible } });

export const getCategoriesRequest = () => ({ type: APP_GET_CATEGORIES_REQUEST });
export const getCategoriesSuccess = (categories) => ({ type: APP_GET_CATEGORIES_SUCCESS, payload: { categories } });
export const getCategoriesError = () => ({ type: APP_GET_CATEGORIES_ERROR });

export const getArticlesHome = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await getArticleService();
    dispatch(setArticlesHome(response.data));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
    if (e.response?.status === 401) {
      dispatch(setAuthorization(false));
    }
  }
};

export const setArticlesHome = (articles) => ({ type: SET_ARTICLES_HOME, payload: articles });
export const setLoading = (val) => ({ type: LOADING, payload: val });

//Thunk Actions
export const getCategories = () => async (dispatch) => {
  dispatch(getCategoriesRequest());
  const categories = await API.getCategories();
  dispatch(getCategoriesSuccess(categories.data));
};

//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_SET_TOPBAR_DISPLAY:
      return {
        ...state,
        topBar: {
          ...state.topBar,
          visible: payload.visible,
        },
      };
    case APP_GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories,
      };
    case SET_ARTICLES_HOME:
      return {
        ...state,
        articles: payload,
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
