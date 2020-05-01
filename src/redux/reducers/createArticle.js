const initialState = {
  categoryId: null,
  subcategoryId: null,
  location: null,
  title: null,
  link: null,
  photo: null
}

//Action Types
const CREATEARTICLE_SET_CATEGORYID = "CREATEARTICLE_SET_CATEGORYID";

//Action Creators
export const setCategoryID = (visible) => ({ type: CREATEARTICLE_SET_CATEGORYID, payload: { visible } });

//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATEARTICLE_SET_CATEGORYID:
      return {
        ...state,
        topBar: {
          ...state.topBar,
          visible: payload.visible
        }
      }
    default:
      return state;
  }
}