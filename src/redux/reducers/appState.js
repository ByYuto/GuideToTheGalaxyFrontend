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
  stickyNav: false,
  showToast: false,
  toastMessage: '',
  toastType: 'success',
  isMobile: false,
  showSearch: true,
};

//Action Types
const APP_SET_TOPBAR_DISPLAY = 'APP_SET_TOPBAR_DISPLAY';
const APP_GET_CATEGORIES_REQUEST = 'APP_GET_CATEGORIES_REQUEST';
const APP_GET_CATEGORIES_SUCCESS = 'APP_GET_CATEGORIES_SUCCESS';
const APP_GET_CATEGORIES_ERROR = 'APP_GET_CATEGORIES_ERROR';
const SET_ARTICLES_HOME = 'SET_ARTICLES_HOME';
const ADD_ARTICLES_HOME = 'ADD_ARTICLES_HOME';
const LOADING = 'LOADING';
const UPDATE_TOAST = 'UPDATE_TOAST';
const SET_STICKY = 'SET_STICKY';
const SET_MOBILE = 'SET_MOBILE';
const SHOW_SEARCH = 'SHOW_SEARCH';
//Action Creators
export const changeAppTopbarDisplay = (visible) => ({ type: APP_SET_TOPBAR_DISPLAY, payload: { visible } });

export const getCategoriesRequest = () => ({ type: APP_GET_CATEGORIES_REQUEST });
export const getCategoriesSuccess = (categories) => ({ type: APP_GET_CATEGORIES_SUCCESS, payload: { categories } });
export const getCategoriesError = () => ({ type: APP_GET_CATEGORIES_ERROR });
export const setStickyHeader = (val) => ({ type: SET_STICKY, payload: val });

export const getArticlesHome = (keywords) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await getArticleService(keywords ? keywords : undefined);
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
export const addArticlesHome = (articles) => ({ type: ADD_ARTICLES_HOME, payload: articles });
export const setLoading = (val) => ({ type: LOADING, payload: val });
export const updateToast = (showToast, toastMessage, toastType) => ({
  type: UPDATE_TOAST,
  payload: { showToast, toastMessage, toastType },
});
export const setMobile = (val) => ({ type: SET_MOBILE, payload: val });
export const setVisibleSearch = (val) => ({ type: SHOW_SEARCH, payload: val });
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
    case ADD_ARTICLES_HOME:
      return {
        ...state,
        articles: [...state.articles, ...payload],
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case SET_STICKY:
      return {
        ...state,
        stickyNav: payload,
      };
    case SET_MOBILE:
      return {
        ...state,
        isMobile: payload,
      };
    case SHOW_SEARCH:
      return {
        ...state,
        showSearch: payload,
      };
    case UPDATE_TOAST:
      return {
        ...state,
        showToast: payload.showToast,
        toastMessage: payload.toastMessage,
        toastType: payload.toastType || 'error',
      };

    default:
      return state;
  }
};
