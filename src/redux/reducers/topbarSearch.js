import { addArticlesHome, setArticlesHome } from './appState';
import { getArticlesFilteredService, getCategoriesList, getSuggestedSearches } from '../../http/articleService';
import { getKeywordsSuggestions } from '../../http/keywordService';
import { setAuthorization } from './authState';
import { get } from 'lodash';

const initialState = {
  searchValue: '',
  searchSuggestions: [
    /*{ active: false, description: 'A title' }*/
  ],
  locationValue: '',
  locationName: '',
  locationSuggestions: [],
  categoryValue: '',
  categoriesList: [],
  keywordSuggestions: [],
  keywordsSelected: [],
  loading: false,
  page: 1,
  error: false,
  errorMessage: '',
  sortValue: 'created_at',
};

const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE';
const CLEAR_SEARCH_VALUE = 'CLEAR_SEARCH_VALUE';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_CATEGORY_VALUE = 'SET_CATEGORY_VALUE';
const SET_PLACE_ID = 'SET_PLACE_ID';
const SET_SEARCH_SUGGESTION = 'SET_SEARCH_SUGGESTION';
const SET_SUGGESTED_KEYWORDS = 'SET_SUGGESTED_KEYWORDS';
const REMOVE_SELECTED_KEYWORD = 'REMOVE_SELECTED_KEYWORD';
const SET_SELECTED_KEYWORD = 'SET_SELECTED_KEYWORD';
const SET_SELECTED_KEYWORDS = 'SET_SELECTED_KEYWORDS';
const SET_SORT = 'SET_SORT';
const SET_PAGE = 'SET_PAGE';

export const onSearchValueChange = (value) => ({ type: CHANGE_SEARCH_VALUE, payload: value });
export const clearSearchValue = () => ({ type: CLEAR_SEARCH_VALUE, payload: '' });
export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const getCategories = () => async (dispatch) => {
  try {
    const response = await getCategoriesList();
    const categories = response.data.map((c) => ({ value: c._id, label: c.name }));
    dispatch(setCategories(categories));
  } catch (e) {
    console.log(e);
  }
};
export const setCategoryValue = (val) => ({ type: SET_CATEGORY_VALUE, payload: val });
export const setPlaceId = (id, addr) => ({ type: SET_PLACE_ID, payload: { id, addr } });
export const getArticlesFiltered = (text, location, category, sort, keywords) => async (dispatch) => {
  try {
    const response = await getArticlesFilteredService(text, location, category, sort, keywords, 1);
    dispatch(setArticlesHome(response.data));
  } catch (e) {
    // TO DO handle unauthorized
    if (e.response?.status === 401) {
      window.localStorage.removeItem('_token');
      dispatch(setAuthorization(false));
      getArticlesFiltered(text, location, category, sort, keywords, 1);
    }
    console.log(e.response);
  }
};

export const getArticlesFilteredSpecificPage = (page) => async (dispatch, getState) => {
  const {
    searchValue,
    locationValue,
    locationName,
    searchSuggestions,
    categoryValue,
    keywordsSelected,
    sortValue,
  } = getState().topbarSearch;
  const keywordsSelectedValue = keywordsSelected ? keywordsSelected.join(',') : '';
  try {
    const response = await getArticlesFilteredService(
      searchValue,
      locationValue,
      categoryValue,
      sortValue,
      keywordsSelectedValue,
      page
    );
    dispatch(addArticlesHome(response.data));
  } catch (e) {
    // TO DO handle unauthorized
    if (e.response?.status === 401) {
      window.localStorage.removeItem('_token');
      dispatch(setAuthorization(false));
      const response2 = await getArticlesFilteredService(
        searchValue,
        locationValue,
        categoryValue,
        sortValue,
        keywordsSelectedValue,
        page
      );
      dispatch(addArticlesHome(response2.data));
    }
    console.log(e.response);
  }
};

export const getArticles = () => async (dispatch, getState) => {
  const state = getState();
  const text = get(state, 'topbarSearch.searchValue');
  const location = get(state, 'topbarSearch.locationValue');
  const category = get(state, 'topbarSearch.categories');
  const keywords = get(state, 'topbarSearch.keywordsSelected');
  //console.log('***Searching for', text, location, category, keywords.join(','));
  try {
    //console.log('Despacho 9');
    const response = await getArticlesFilteredService(text, location, category, keywords);
    dispatch(setArticlesHome(response.data));
  } catch (e) {
    // TO DO handle unauthorized
    if (e.response?.status === 401) {
      window.localStorage.removeItem('_token');
      dispatch(setAuthorization(false));
      //console.log('Despacho 10');
      getArticlesFiltered(text, location, category, keywords);
    }
    console.log(e.response);
  }
};

export const getSearchSuggestion = (value, location, category, keywords) => async (dispatch) => {
  try {
    const response = await getSuggestedSearches(value, location, category, keywords);
    const data = [...response.data.lastSearches, ...response.data.popularSearches];
    const dataTitles = data.map((elm) => ({ active: false, description: elm.text }));
    dispatch(setSearchSuggestion(dataTitles));
  } catch (e) {
    // TO DO handle unauthorized
    console.log(e.response);
  }
};

export const setSearchSuggestion = (suggestions) => ({ type: SET_SEARCH_SUGGESTION, payload: suggestions });

export const getKeywordsSuggested = (categoryId, placeId, currentKeywords) => async (dispatch) => {
  try {
    const response = await getKeywordsSuggestions(categoryId, placeId, currentKeywords);
    dispatch(setSuggestedKeywords(response.data));
  } catch (e) {
    console.log(e.response);
  }
};

export const setSuggestedKeywords = (keywords) => ({ type: SET_SUGGESTED_KEYWORDS, payload: keywords });
export const setSelectedKeyword = (tag) => ({ type: SET_SELECTED_KEYWORD, payload: tag });
export const setSelectedKeywords = (tags) => ({ type: SET_SELECTED_KEYWORDS, payload: tags });
export const removeKeyword = (tag) => ({ type: REMOVE_SELECTED_KEYWORD, payload: tag });

export const setSort = (value) => ({ type: SET_SORT, payload: value });
export const setPage = (value) => ({ type: SET_PAGE, payload: value });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_SEARCH_VALUE:
      //console.log('****Setting search value to', payload);
      return {
        ...state,
        searchValue: payload,
      };
    case CLEAR_SEARCH_VALUE:
      return {
        ...state,
        searchValue: '',
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categoriesList: payload,
      };
    case SET_CATEGORY_VALUE:
      return {
        ...state,
        categoryValue: payload,
      };
    case SET_PLACE_ID:
      return {
        ...state,
        locationValue: payload.id,
        locationName: payload.addr,
      };
    case SET_SEARCH_SUGGESTION:
      return {
        ...state,
        searchSuggestions: payload,
      };
    case SET_SUGGESTED_KEYWORDS:
      return {
        ...state,
        keywordSuggestions: payload,
      };
    case SET_SELECTED_KEYWORD:
      return {
        ...state,
        keywordsSelected: [payload, ...state.keywordsSelected],
      };
    case SET_SELECTED_KEYWORDS:
      return {
        ...state,
        keywordsSelected: payload,
      };
    case REMOVE_SELECTED_KEYWORD:
      const newArr = state.keywordsSelected.filter((elm) => elm !== payload);
      return {
        ...state,
        keywordsSelected: newArr,
      };
    case SET_SORT: {
      return {
        ...state,
        sortValue: payload,
      };
    }
    case SET_PAGE: {
      return {
        ...state,
        page: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
