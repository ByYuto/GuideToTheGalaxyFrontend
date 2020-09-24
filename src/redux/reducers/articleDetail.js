import { getArticleByIdService } from '../../http/articleService';
import { setLikeService, unsetLikeService } from '../../http/likeService';

const initialState = {
  article: null,
  error: false,
  loading: false,
  errorMessage: '',
};

const SET_ARTICLE = 'SET_ARTICLE';
const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';
const SET_LIKE = 'SET_LIKE';
const UNSET_LIKE = 'UNSET_LIKE';

export const getArticleDetail = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError({ error: false, errorMessage: '' }));
  try {
    const response = await getArticleByIdService(id);
    dispatch(setLoading(false));
    dispatch(setArticle(response.data));
  } catch (e) {
    dispatch(setLoading(false));
    dispatch(
      setError({
        error: true,
        errorMessage: e.response?.data?.error || e.response?.errorMessage || 'Unexpected error has ocurred...',
      })
    );
  }
};

const setArticle = (article) => ({ type: SET_ARTICLE, payload: article });
const setError = (e) => ({ type: SET_ERROR, payload: e });
const setLoading = (isLoading) => ({ type: SET_LOADING, payload: isLoading });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ARTICLE:
      return {
        ...state,
        article: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload.error,
        errorMessage: payload.errorMessage,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
