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
    contents: [
      {
        id: 0,
        content: [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  },
  currentValueEditor: [],
  draftForm: [],
  currentIndex: 0,
};

//Action Types
const UPDATE = 'NEW_ARTICLE/UPDATE';
const SET_STEP = 'NEW_ARTICLE/SET_STEP';
const CATEGORY_SELECTION = 'CATEGORY_SELECTION';
const DRAFT_FORM = 'DRAFT_FORM';
const INSERT_CONTENT = 'INSERT_CONTENT';
const CHANGE_EDITOR_FOCUS = 'CHANGE_EDITOR_FOCUS';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

//Action Creators
export const updateNewArticle = (newArticle) => ({ type: UPDATE, payload: newArticle });
export const setNewArticleStep = (step) => ({ type: SET_STEP, payload: { step } });
export const categorySelected = (id) => ({ type: CATEGORY_SELECTION, payload: id });
export const makeFormDraft = (form) => ({ type: DRAFT_FORM, payload: form });
export const insertArticleContent = (data) => ({ type: INSERT_CONTENT, payload: data });
export const changeFocusEditor = (id) => ({ type: CHANGE_EDITOR_FOCUS, payload: id });

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
    case INSERT_CONTENT:
      const index = state.newArticle.contents[state.newArticle.contents.length - 1].id + 1;
      const newContents = state.newArticle.contents.map((content) =>
        content.id === payload.id ? { ...payload } : content
      );
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contents: [
            ...newContents,
            {
              id: index,
              content: [
                {
                  type: 'paragraph',
                  children: [{ text: '' }],
                },
              ],
            },
          ],
        },
        currentIndex: index,
      };
    case CHANGE_EDITOR_FOCUS:
      return {
        ...state,
        currentIndex: payload,
      };
    default:
      return state;
  }
};
