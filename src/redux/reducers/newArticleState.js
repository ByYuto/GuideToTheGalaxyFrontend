import uid from 'uid';
import { uploadImage } from '../../http/createArticleService';

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
  articleValidations: {},
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
const ADD_IMAGES_SUCCESS = 'ADD_IMAGES_SUCCESS';
const ADD_IMAGES_CONTENT_SUCCESS = 'ADD_IMAGES_CONTENT_SUCCESS';
const DELETE_IMAGE = 'DELETE_IMAGE';
const DELETE_CONTENT = 'DELETE_CONTENT';
const VALIDATE_FIELD = 'VALIDATE_FIELD';
const UPDATE_VALIDATIONS = 'UPDATE_VALIDATIONS';
const INSERT_EMBED = 'INSERT_EMBED';
const REMOVE_EMBED = 'REMOVE_EMBED';

//Action Creators
export const updateNewArticle = (newArticle) => ({ type: UPDATE, payload: newArticle });
export const setNewArticleStep = (step) => ({ type: SET_STEP, payload: { step } });
export const categorySelected = (id) => ({ type: CATEGORY_SELECTION, payload: id });
export const makeFormDraft = (form) => ({ type: DRAFT_FORM, payload: form });
export const insertArticleContent = (data) => ({ type: INSERT_CONTENT, payload: data });
export const changeFocusEditor = (id) => ({ type: CHANGE_EDITOR_FOCUS, payload: id });
export const updateValidationTemplate = (articleValidations) => ({
  type: UPDATE_VALIDATIONS,
  payload: articleValidations,
});

export const insertEmbed = (index, content) => ({
  type: INSERT_EMBED,
  payload: { index: index, content: { id: uid(), ...content, type: 'embed' } },
});

export const removeEmbed = (id) => ({ type: REMOVE_EMBED, payload: id });

export const addImagesContent = (index, files) => async (dispatch) => {
  try {
    const images = await Promise.all(files.map(uploadImage));
    dispatch(
      addImagesContentSuccess(
        index,
        images.filter((image) => image.url)
      )
    );
  } catch (error) {
    // TODO: show error
    console.log(error.message);
  }
};
const addImagesContentSuccess = (index, images) => ({ type: ADD_IMAGES_CONTENT_SUCCESS, payload: { index, images } });

export const addImages = (contentId, files) => async (dispatch) => {
  try {
    const images = await Promise.all(files.map(uploadImage));
    dispatch(
      addImagesSuccess(
        contentId,
        images.filter((image) => image.url)
      )
    );
  } catch (error) {
    // TODO: show error
    console.log(error.message);
  }
};
const addImagesSuccess = (contentId, images) => ({ type: ADD_IMAGES_SUCCESS, payload: { contentId, images } });
export const deleteImage = (contentId, index) => ({ type: DELETE_IMAGE, payload: { contentId, index } });
export const deleteContent = (contentId) => ({ type: DELETE_CONTENT, payload: { contentId } });
export const validateField = (field) => ({ type: VALIDATE_FIELD, payload: { ...field } });

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
    case DELETE_CONTENT: {
      const { contentId } = payload;
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contents: state.newArticle.contents.filter((item) => item.id !== contentId),
        },
      };
    }
    case DELETE_IMAGE: {
      const { contentId, index } = payload;
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contents: state.newArticle.contents.map((item) => {
            if (item.id === contentId) {
              return {
                ...item,
                content: [
                  {
                    children: item.content[0].children.filter((_, childrenIndex) => childrenIndex !== index),
                  },
                ],
              };
            }
            return item;
          }),
        },
      };
    }
    case ADD_IMAGES_SUCCESS: {
      const { contentId, images } = payload;
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contents: state.newArticle.contents.map((item) => {
            if (item.id === contentId) {
              return {
                ...item,
                content: [
                  {
                    children: [...item.content[0].children, ...images],
                  },
                ],
              };
            }
            return item;
          }),
        },
      };
    }
    case ADD_IMAGES_CONTENT_SUCCESS: {
      const { images, index } = payload;
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contents: [
            ...state.newArticle.contents.slice(0, index),
            {
              id: uid(),
              type: 'image',
              content: [
                {
                  children: images,
                },
              ],
            },
            ...state.newArticle.contents.slice(index),
          ],
        },
      };
    }
    case VALIDATE_FIELD:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
        },
        articleValidations: {
          ...state.articleValidations,
          ...payload,
        },
      };
    case UPDATE_VALIDATIONS:
      return {
        ...state,
        articleValidations: {
          ...payload,
        },
      };
    case INSERT_EMBED:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contents: [
            ...state.newArticle.contents.slice(0, payload.index),
            payload.content,
            ...state.newArticle.contents.slice(payload.index),
          ],
        },
      };
    case REMOVE_EMBED:
      const elementIndex = state.newArticle.contents.findIndex((v) => v.id === payload);
      const contents = [
        ...state.newArticle.contents.slice(0, elementIndex),
        ...state.newArticle.contents.slice(elementIndex + 1),
      ];
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contents: [...contents],
        },
      };
    default:
      return state;
  }
};
