const initialState = {
  step: 1,
  newArticle: {
    categoryId: '', //'MUSEUM',
    contentTypeId: '', //'CELEBRITY',
    location: '',
    title: '',
    link: '',
    photo: '',
  },
  //Override some values to test
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
  },
};

//Action Types
const NEW_ARTICLE_UPDATE = 'NEW_ARTICLE_UPDATE';
const SET_NEW_ARTICLE_STEP = 'SET_NEW_ARTICLE_STEP';

//Action Creators
export const updateNewArticle = (newArticle) => ({ type: NEW_ARTICLE_UPDATE, payload: newArticle });
export const setNewArticleStep = (step) => ({ type: SET_NEW_ARTICLE_STEP, payload: { step } });

//Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NEW_ARTICLE_UPDATE:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          ...payload,
        },
      };
    case SET_NEW_ARTICLE_STEP:
      return {
        ...state,
        step: payload.step,
      };
    default:
      return state;
  }
};
