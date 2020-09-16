const initialState = {
  inputValue: '',
  keywordsSuggestions: [],
  recommendedKeywords: [],
  error: false,
  errorMessage: '',
};

const INSERT_KEYWORDS = 'INSERT_KEYWORDS';
const INSERT_INPUT_VALUE = 'INSERT_INPUT_VALUE';

export const setInputValue = (value) => ({ type: INSERT_INPUT_VALUE, payload: value });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INSERT_KEYWORDS:
      return {
        ...state,
        keywordsSuggestions: payload,
      };
    case INSERT_INPUT_VALUE:
      return {
        ...state,
        inputValue: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
