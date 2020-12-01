import uid from 'uid';
import { uploadImage, createArticle } from '../../http/createArticleService';
import { setAuthorization } from './authState';
import {EditorState, CompositeDecorator} from 'draft-js';
import {Link, findLinkEntities} from '../../components/CreateArticle/DanteEditor/ContentEditor';

export const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

const initialState = {
  step: 1,
  newArticle: {
    categoryId: '', //'MUSEUM',
    contentTypeId: '', //'CELEBRITY',
    location: '',
    title: '',
    link: '',
    photo: {
      imageId: '',
      url: '',
    },
    URL: '',
    discontinued_law: false,
    date: new Date(),
    pdf: null,
    contributions: false,
    keywords: [],
    content: EditorState.createEmpty(decorator)
  },
  articleValidations: {},
  currentValueEditor: [],
  draftForm: [],
  currentIndex: 0,
  error: false,
  errorMessage: '',
  loading: false,
  success: null,
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
const CLEAR_DATA = 'CLEAR_DATA';
const ON_CHANGE_CONTENT = 'ON_CHANGE_CONTENT';
const LOADING = 'LOADING';
const ARTICLE_ERROR = 'ARTICLE_ERROR';
const PDF_INSERT = 'PDF_INSERT';
const ACTIVATE_CONTRIBUTIONS = 'ACTIVATE_CONTRIBUTIONS';
const ARTICLE_SUCCESS = 'ARTICLE_SUCCESS';
const INSERT_EMBED_ARTICLE = 'INSERT_EMBED_ARTICLE';
const INSERT_KEYWORD = 'INSERT_KEYWORD';
const REMOVE_KEYWORD = 'REMOVE_KEYWORD';
const CUSTOM_SUBCATEGORY = 'CUSTOM_SUBCATEGORY';
//Action Creators
export const updateNewArticle = (newArticle) => ({ type: UPDATE, payload: newArticle });
export const setNewArticleStep = (step) => ({ type: SET_STEP, payload: { step } });
export const categorySelected = (id) => ({ type: CATEGORY_SELECTION, payload: id });
export const makeFormDraft = (form) => ({ type: DRAFT_FORM, payload: form });
export const insertArticleContent = (data) => ({ type: INSERT_CONTENT, payload: data });
export const onChangeArticleContent = (data) => ({ type: ON_CHANGE_CONTENT, payload: data });
export const changeFocusEditor = (id) => ({ type: CHANGE_EDITOR_FOCUS, payload: id });
export const updateValidationTemplate = (articleValidations) => ({
  type: UPDATE_VALIDATIONS,
  payload: articleValidations,
});

export const insertEmbed = (index, content) => ({
  type: INSERT_EMBED,
  payload: { index: index, content: { id: uid(), ...content, type: 'embed' } },
});

export const insertEmbedArticle = (index, articleId) => ({
  type: INSERT_EMBED_ARTICLE,
  payload: { index: index, content: { id: uid(), content: articleId, type: 'article' } },
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
    if (error.response.status === 401) {
      dispatch(setAuthorization(false));
    }
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
    if (error.response.status === 401) {
      dispatch(setAuthorization(false));
    }
    console.log(error.message);
  }
};
const addImagesSuccess = (contentId, images) => ({ type: ADD_IMAGES_SUCCESS, payload: { contentId, images } });
export const deleteImage = (contentId, index) => ({ type: DELETE_IMAGE, payload: { contentId, index } });
export const deleteContent = (contentId) => ({ type: DELETE_CONTENT, payload: { contentId } });
export const validateField = (field) => ({ type: VALIDATE_FIELD, payload: { ...field } });
export const clearArticleData = () => ({ type: CLEAR_DATA });
export const loadingArticle = (isLoading) => ({ type: LOADING, payload: isLoading });
export const errorArticle = (error) => ({ type: ARTICLE_ERROR, payload: error });
export const saveArticle = (article) => async (dispatch) => {
  dispatch(loadingArticle(true));
  dispatch(errorArticle({ error: false, message: '' }));
  const response = await createArticle(article);
  if (response.status === 200) {
    dispatch(loadingArticle(false));
    dispatch(successSavedArticle(response.data._id));
  } else {
    if (response.status === 401) {
      dispatch(setAuthorization(false));
    }
    dispatch(loadingArticle(false));
    dispatch(errorArticle({ error: true, message: response.message }));
  }
};
export const successSavedArticle = (response) => ({ type: ARTICLE_SUCCESS, payload: response });
export const insertPdf = (fileId) => ({ type: PDF_INSERT, payload: fileId });
export const activateContributions = (value) => ({ type: ACTIVATE_CONTRIBUTIONS, payload: value });
export const setArticleContent = (articleId) => ({ type: INSERT_EMBED_ARTICLE, payload: articleId });
export const setKeyword = (value) => ({ type: INSERT_KEYWORD, payload: value });
export const removeKeyword = (value) => ({ type: REMOVE_KEYWORD, payload: value });

export const onChangeCustomSubcategory = (value) => ({ type: CUSTOM_SUBCATEGORY, payload: value })
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
              type: 'paragraph',
            },
          ],
        },
        currentIndex: index,
      };
    case ON_CHANGE_CONTENT:
     
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          content: payload,
        },
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
    case CLEAR_DATA:
      return {
        ...initialState,
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        error: payload.error,
        errorMessage: payload.message,
      };
    case PDF_INSERT:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          pdf: payload,
        },
      };
    case ACTIVATE_CONTRIBUTIONS:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contributions: payload,
        },
      };
    case ARTICLE_SUCCESS:
      return {
        ...state,
        success: payload,
      };

    case INSERT_EMBED_ARTICLE:
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
    case INSERT_KEYWORD: {
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          keywords: [...state.newArticle.keywords, payload.toLowerCase()],
        },
      };
    }
    case REMOVE_KEYWORD:
      const keywords = state.newArticle.keywords.filter((k) => k !== payload);
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          keywords: keywords,
        },
      };
    case CUSTOM_SUBCATEGORY:
      return {
        ...state,
        newArticle: {
          ...state.newArticle,
          contentTypeId: payload,
        },
      };
    default:
      return state;
  }
};
