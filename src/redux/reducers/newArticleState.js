const initialState = {
  step: 1,
  validStep1: false,
  validStep2: false,
  validStep3: false,
  validStep4: false,
  newArticle: {
    categoryId: '', //'MUSEUM',
    contentTypeId: '', //'CELEBRITY',
    location: '',
    title: '',
    link: '',
    photo: '',
    URL: '',
    discontinued_law: false,
    date: null,
    content: [
      {
        type: 'text',
        content: '<p>This is my first paragraph</p>',
      },
    ],
  },
  draftForm: [],

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
const CATEGORY_SELECTION = 'CATEGORY_SELECTION';
const DRAFT_FORM = 'DRAFT_FORM';

//Action Creators
export const updateNewArticle = (newArticle) => ({ type: UPDATE, payload: newArticle });
export const setNewArticleStep = (step) => ({ type: SET_STEP, payload: { step } });

export const categorySelected = (id) => ({ type: CATEGORY_SELECTION, payload: id });

export const makeFormDraft = (form) => ({ type: DRAFT_FORM, payload: form });

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
    case CATEGORY_SELECTION:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          categoryId: payload,
        },
      };
    case SET_STEP:
      return {
        ...state,
        step: payload.step,
      };
    case DRAFT_FORM:
      return {
        ...state,
        draftForm: [payload],
      };
    default:
      return state;
  }
};
