import { findKeywords, getRecommendedKeywordsService } from '../../http/keywordService';

const initialState = {
  inputValue: '',
  keywordsSuggestions: [],
  recommendedKeywords: [],
  error: false,
  errorMessage: '',
};

const INSERT_INPUT_VALUE = 'INSERT_INPUT_VALUE';
//const GET_SUGGESTED_KEYWORDS = 'GET_SUGGESTED_KEYWORDS';
const SET_SUGGESTED_KEYWORDS = 'SET_SUGGESTED_KEYWORDS';
const SET_RECOMMENDED = 'SET_RECOMMENDED';

export const setInputValue = (value) => ({ type: INSERT_INPUT_VALUE, payload: value });

export const getKeywordsSuggestions = (value) => async (dispatch) => {
  try {
    const response = await findKeywords(value);
    dispatch(setKeywordsSuggestions(response.data));
  } catch (e) {
    console.log(e.response.data.error || e.response.errorMessage);
  }
};

export const getRecommendedKeywords = (cat, cont) => async (dispatch) => {
  try {
    const response = await getRecommendedKeywordsService(cat, cont);
    dispatch(setKeywordsRecommended(response.data));
  } catch (e) {
    console.log(e.response?.data?.error || e);
  }
};

const setKeywordsSuggestions = (suggestions) => ({ type: SET_SUGGESTED_KEYWORDS, payload: suggestions });
const setKeywordsRecommended = (suggestions) => ({ type: SET_RECOMMENDED, payload: suggestions });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INSERT_INPUT_VALUE:
      return {
        ...state,
        inputValue: payload,
      };

    case SET_SUGGESTED_KEYWORDS:
      return {
        ...state,
        keywordsSuggestions: payload,
      };

    case SET_RECOMMENDED:
      return {
        ...state,
        recommendedKeywords: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
