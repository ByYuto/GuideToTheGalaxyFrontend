import { getArticleService, getEmbedArticlesService, getEmbedArticleService } from '../../http/articleService';
import { getMeContributionsService } from '../../http/profileService';
import { setAuthorization } from './authState';
const initialState = {
  contributions: [],
  error: false,
  loading: false,
  errorMessage: '',
  lastItem: undefined,
  totalItems: undefined,
};

//actions

const ADD_ME_CONTRIBUTIONS = 'ADD_ME_CONTRIBUTIONS';
const LOADING_ME_CONTRIBUTIONS = 'LOADING_ME_CONTRIBUTIONS';
const ERROR_CONTRIBUTION = 'ERROR_CONTRIBUTION';

// action creators
export const getMeContributions =
  (forceFirst = false) =>
  async (dispatch, getState) => {
    //const lastContributionId = getState().profile.lastContributionId;
    dispatch(loadingMeContributions(true));
    try {
      const response = await getMeContributionsService();
      //dispatch(setArticles(response.data));
      dispatch(
        addMeContributions({ contributions: response.data, totalItems: response.headers['x-pagination-total-items'] })
      );
    } catch (e) {
      /*
      if (e.response.status === 401) {
        dispatch(setAuthorization(false));
      }
      dispatch({ error: true, errorMessage: e.response.data?.error || e.response.statusText });
      */
    } finally {
      dispatch(loadingMeContributions(false));
    }
  };

export const addMeContributions = ({ contributions, totalItems }) => ({
  type: ADD_ME_CONTRIBUTIONS,
  payload: { contributions, totalItems },
});

export const loadingMeContributions = (isLoading) => ({ type: LOADING_ME_CONTRIBUTIONS, payload: isLoading });

//export const setErrorArticles = (error) => ({ type: ERROR_ARTICLES, payload: error });

//export const setFilterValue = (value) => ({ type: SET_FILTER_VALUE, payload: value });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ME_CONTRIBUTIONS:
      return {
        ...state,
        contributions: [...state.contributions, ...payload.contributions],
        totalContributions: payload.totalItems !== 'null' ? payload.totalItems : undefined,
      };
    case LOADING_ME_CONTRIBUTIONS:
      return {
        ...state,
        loading: payload,
      };
    case ERROR_CONTRIBUTION:
      return {
        ...state,
        error: payload.error,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};
