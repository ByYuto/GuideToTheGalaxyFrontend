const initialState = {
  searchValue: '',
  searchSuggestions: [{ active: false, description: 'A title' }],
  locationValue: '',
  locationSuggestions: [],
  categoryValue: '',
  categoriesSuggestions: [],
};

const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE';
const CLEAR_SEARCH_VALUE = 'CLEAR_SEARCH_VALUE';
export const onSearchValueChange = (value) => ({ type: CHANGE_SEARCH_VALUE, payload: value });
export const clearSearchValue = () => ({ type: CLEAR_SEARCH_VALUE, payload: '' });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_SEARCH_VALUE:
      return {
        ...state,
        searchValue: payload,
      };
    case CLEAR_SEARCH_VALUE:
      return {
        ...state,
        searchValue: '',
      };
    default:
      return {
        ...state,
      };
  }
};
