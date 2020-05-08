const initialState = {
  categoryId: null,
  contentTypeId: null,
  location: null,
  title: null,
  link: null,
  photo: null
}

//Action Types
const NEW_ARTICLE_UPDATE = "NEW_ARTICLE_UPDATE";

//Action Creators
export const updateNewArticle = (payload) => ({ type: NEW_ARTICLE_UPDATE, payload: payload });

//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NEW_ARTICLE_UPDATE:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}