const initialState = {
  step: 1,
  newArticle: {
    categoryId: '', //'MUSEUM',
    contentTypeId: '', //'CELEBRITY',
    location: '',
    title: '',
    link: '',
    photo: '',
    URL: '',
    content: [
      {
        type: 'text',
        content: '<p>This is my first paragraph</p>',
      },
    ],
  },

  //Override some values Just for TESTING purpose
  /*
  step: 4,
  newArticle: {
    categoryId: 'MUSEUM',
    contentTypeId: 'CELEBRITY',
    location: 'Manizales',
    title: 'Hola mundo',
    link: '',
    URL: 'http://google.com',
    content: [
      {
        type: 'text',
        content: "<p>This is my first paragraph with a link to <a href='http://www.google.com'>Google</a></p>",
      },
      {
        type: 'text',
        content: '<p>This is another paragraph</p>',
      },
    ],
  },*/
};

//Action Types
const UPDATE = 'NEW_ARTICLE/UPDATE';
const SET_STEP = 'NEW_ARTICLE/SET_STEP';

//Action Creators
export const updateNewArticle = (newArticle) => ({ type: UPDATE, payload: newArticle });
export const setNewArticleStep = (step) => ({ type: SET_STEP, payload: { step } });

//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          ...payload,
        },
      };
    case SET_STEP:
      return {
        ...state,
        step: payload.step,
      };
    default:
      return state;
  }
};
