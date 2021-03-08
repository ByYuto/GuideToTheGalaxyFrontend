import React, { useState, useRef, useEffect } from 'react';
import { EditorLayout, TextToolbarFixed, MediaToolbarFixed } from './styled-components';
import { Editor, EditorState, RichUtils } from 'draft-js';
import TextFormat from './style-toolbar/TextFormat';
import 'draft-js/dist/Draft.css';
import InsertLink from './widgets/link/InsertLink';
import MediaToolbar from './media-toolbar/MediaToolbar';
import ArticleEmbed from '../ShareArticle/ArticleEmbed';
import EmbedPreview from '../ShareEmbed/EmbedPreview';
import ImageEditorComponent from '../ImageEditor/ImageEditorComponent';
import { uploadImage } from '../../../http/createArticleService';
import FlexContainer from '../../UI/FlexContainer';
import Popover from 'react-text-selection-popover';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeArticleContent } from '../../../redux/reducers/newArticleState';
import { useCallback } from 'react';
import { getEntityFromCursor, getEntityKeyFromCursor, getURLFromCursor } from './util';
import { startsWith } from 'lodash';

const EDITOR_VISIBLE_DISTANCE = 153;
const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};

const MAX_FILES = 4;

export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

function ContentEditor() {
  const dispatch = useDispatch();
  const { newArticle, step } = useSelector((store) => store.newArticle);
  const { isMobile } = useSelector((store) => store.app);
  const editorState = newArticle.content;
  const setEditorState = (editorData) => dispatch(onChangeArticleContent(editorData));
  const [isFocusEditor, setFocusEditor] = useState(false);
  const [styledToolbarOut, setStyledToolbarOut] = useState(false);
  const [mediaToolbarOut, setMediaToolbarOut] = useState(false);
  const [editorOut, setEditorOut] = useState(false);
  const [linkPopupOpened, setLinkPopupOpened] = useState(false);
  const [linkButtonState, setLinkButtonState] = useState('disabled');
  const [newLinkEntityKey, setLinkEntityKey] = useState(null);
  const imageInputRef = useRef(null);
  const editorContainer = useRef(null);
  const [currentBlockKey, setBlockKey] = useState(null);
  const [imagesGallery, setImagesGallery] = useState([]);
  const [urlValue, setUrlValue] = useState('');
  const [selectionState, setSelectionState] = useState(null);
  const editorRef = useRef(null);
  const editorDraftRef = useRef(null);
  const urlInputRef = useRef(null);
  const makeFocus = () => editorDraftRef.current.focus();
  const urlMakeFocus = () => (urlInputRef.current ? urlInputRef.current.focus() : null);
  const styledToolbarRef = useRef(null);
  const mediaToolbarRef = useRef(null);
  const [topDistance, setTopDistance] = useState(0);
  const [embedActive, setEmbedActivation] = useState(false);
  const [linkButtonActive, setLinkButtonActive] = useState(false);

  const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
        props: {
          setEditorState: setEditorState,
          imageInputRef: imageInputRef,
          setBlockKey: setBlockKey,
          setImagesGallery: setImagesGallery,
          editorState: editorState,
        },
      };
    }

    return null;
  };

  const _promptForLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      linkPopupOpened(false);
    }
  };

  const fixUrl = (url) => {
    if (!startsWith(url, 'https://') && !startsWith(url, 'http://')) {
      return 'http://' + url;
    }
    return url;
  };
  const _confirmLink = useCallback(() => {
    const currentSelection = editorState.getSelection(); //selectionState;
    const contentState = editorState.getCurrentContent();
    const currentUrlValue = fixUrl(urlValue);
    if (currentSelection.isCollapsed()) {
      const entityKey = getEntityKeyFromCursor(editorState, 'LINK');
      if (entityKey) {
        const newContentState = contentState.replaceEntityData(entityKey, { url: currentUrlValue });
        const newEditorState = EditorState.set(editorState, { currentContent: newContentState });
        setEditorState(newEditorState);
      }
    } else {
      const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: currentUrlValue });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
      setEditorState(RichUtils.toggleLink(newEditorState, currentSelection, entityKey));
      setLinkEntityKey(entityKey);
    }
  }, [editorState, urlValue]);

  const _onLinkInputKeyDown = (e, editorState) => {
    if (e.which === 13) {
      _confirmLink(editorState);
    }
  };

  const onURLChange = (val) => setUrlValue(val);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const handleUploadImage = async (event, editorState, onChangeEditor, blockKey, images) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    if (files && files.length && MAX_FILES - (images.length + files.length) >= 0) {
      const imageResponse = await Promise.all(files.map(uploadImage));
      confirmMedia(editorState, onChangeEditor, imageResponse, blockKey);
    }
  };

  const confirmMedia = (editorState, onChangeEditor, imageInfo, blockKey) => {
    const contentState = editorState.getCurrentContent();
    const imageBlock = contentState.getBlockForKey(blockKey);
    const imageEntity = imageBlock.getEntityAt(0);
    const imageEntityF = contentState.getEntity(imageEntity);
    const { images } = imageEntityF.getData();
    contentState.replaceEntityData(imageEntity, {
      images: [...images, ...imageInfo],
    });
    setBlockKey(null);
    setImagesGallery([]);
    const newEditorState = EditorState.createWithContent(contentState);
    onChangeEditor(newEditorState);
  };

  useEffect(() => {
    if (editorContainer && editorContainer.current) {
      if (topDistance > EDITOR_VISIBLE_DISTANCE) {
        setEditorOut(true);
      }

      if (topDistance < EDITOR_VISIBLE_DISTANCE) {
        setEditorOut(false);
      }
    }

    const selection = editorState.getSelection();
    const isCollapsed = selection.isCollapsed();
    //console.log({ isCollapsed, urlValue });
    if (isCollapsed) {
      setLinkButtonState(!urlValue ? 'disabled' : 'active');
    } else {
      setLinkButtonState('inactive');
    }

    //if (!isCollapsed && linkInputActive === 'disabled') {
    //setLinkButtonState('inactive');
    //}
    //if (newLinkEntityKey && linkInputActive === 'active') {
    //setLinkInputActive('inactive');
    //setUrlValue('');
    //setSelectionState(null);
    //setLinkEntityKey(null);
    //}

    Promise.resolve(
      typeof window.IntersectionObserver !== 'undefined' ? window.IntersectionObserver : import('intersection-observer')
    ).then(() => {
      const options = {
        root: document,
        rootMargin: '0px',
        threshold: 0,
        trackVisibility: true,
        delay: 100,
      };

      const observer = new window.IntersectionObserver(observerHandler, options);
      if (mediaToolbarRef && styledToolbarRef && mediaToolbarRef.current && styledToolbarRef.current) {
        observer.observe(mediaToolbarRef.current);
        observer.observe(styledToolbarRef.current);
      }

      //observer.observe(editorRef.current);
    });

    document.querySelector('.article-body-container').addEventListener('scroll', () => {
      const scrollElm = document.querySelector('.article-body-container');
      setTopDistance(scrollElm.scrollTop);
    });

    return () => {
      document.querySelector('.article-body-container').removeEventListener('scroll', () => {
        const scrollElm = document.querySelector('.article-body-container');
        setTopDistance(scrollElm.scrollTop);
      });
    };
  }, [urlValue, editorState, newLinkEntityKey, topDistance]);

  const observerHandler = (entries, observer) => {
    entries.forEach((elm) => {
      if (elm.target.classList.contains('styled-toolbar-container')) {
        const isIntersected = elm.isIntersecting;
        setStyledToolbarOut(isIntersected);
      }
      if (elm.target.classList.contains('media-toolbar-container')) {
        const isIntersected = elm.isIntersecting;
        setMediaToolbarOut(isIntersected);
      }
    });
  };

  const onUrlInputBlur = () => {
    setLinkPopupOpened(false);
  };
  const onUrlInputClear = () => {
    setUrlValue('');
  };
  const urlInput = (inputRef) => (
    <Popover isOpen={linkPopupOpened}>
      <div style={{ zIndex: 999 }}>
        <InsertLink
          inputRef={urlInputRef}
          onKeyDown={_onLinkInputKeyDown}
          url={urlValue}
          onClickBtn={_confirmLink}
          editorState={editorState}
          onChangeInput={onURLChange}
          onClear={onUrlInputClear}
          onBlur={onUrlInputBlur}
          //setLinkInputActive={setLinkInputActive}
        />
      </div>
    </Popover>
  );

  useEffect(() => {
    if (step === 3) {
      makeFocus();
    }
  }, [step]);

  useEffect(() => {
    if (linkPopupOpened) {
      urlMakeFocus();
    }
  }, [linkPopupOpened]);

  useEffect(() => {
    const url = getURLFromCursor(editorState);
    //if (url) {
    setUrlValue(url);
    //}
  }, [editorState]);

  useEffect(() => {
    const entity = getEntityFromCursor(editorState, 'LINK');
    if (entity) {
      console.log(entity.toObject());
    }
  }, [editorState]);

  const handleUserKeyPress = useCallback((event) => {
    const { key, keyCode, ctrlKey } = event;

    console.log({ key, keyCode, ctrlKey });
    if (keyCode === 75 && ctrlKey === true) {
      event.preventDefault();
      console.log('Detected CMD + K, Opening link input');
      //const url = getURLFromCursor(editorState);
      //if (url) {
      //setUrlValue(url);
      setLinkPopupOpened(true);

      //}
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const onLinkButtonClick = (event) => {
    event.preventDefault();
    setSelectionState(editorState.getSelection());
    setLinkPopupOpened(true);
    //promptLink();
  };
  return (
    <EditorLayout ref={editorContainer} className="editor-parent-container" linkPopupOpened={linkPopupOpened ? 1 : 0}>
      <div
        style={{ width: '180px', opacity: isFocusEditor || embedActive ? 1 : 0 }}
        ref={styledToolbarRef}
        className="styled-toolbar-container"
      >
        <TextFormat
          editorState={editorState}
          setEditorState={setEditorState}
          promptLink={_promptForLink}
          imageInputRef={imageInputRef}
          linkButtonState={linkButtonState}
          setLinkButtonState={setLinkButtonState}
          setSelectionState={setSelectionState}
          onLinkButtonClick={onLinkButtonClick}
        />
      </div>
      <TextToolbarFixed
        className="fixed-styled-toolbar-container"
        editorOut={editorOut}
        styledToolbarOut={styledToolbarOut}
        isFocusEditor={isFocusEditor}
        embedActive={embedActive}
        isMobile={isMobile}
      >
        <TextFormat
          editorState={editorState}
          setEditorState={setEditorState}
          promptLink={_promptForLink}
          imageInputRef={imageInputRef}
          linkButtonState={linkButtonState}
          setLinkButtonState={setLinkButtonState}
          setSelectionState={setSelectionState}
          onLinkButtonClick={onLinkButtonClick}
        />
      </TextToolbarFixed>
      <div>
        {urlInput()}
        <div
          ref={editorRef}
          onClick={makeFocus}
          className="editor-container"
          onBlur={() => {
            setFocusEditor(false);
          }}
        >
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Enter some text..."
            blockRendererFn={mediaBlockRenderer}
            handleKeyCommand={handleKeyCommand}
            readOnly={false}
            onFocus={() => setFocusEditor(true)}
            onBlur={() => setFocusEditor(false)}
            ref={editorDraftRef}
          />
        </div>
      </div>
      <FlexContainer justify="center">
        <MediaToolbarFixed
          className="fixed-media-toolbar-container"
          editorOut={editorOut}
          mediaToolbarOut={mediaToolbarOut}
          isFocusEditor={isFocusEditor}
          embedActive={embedActive}
          isMobile={isMobile}
        >
          <MediaToolbar
            editorState={editorState}
            onChangeEditor={setEditorState}
            imageInputRef={imageInputRef}
            embedActive={embedActive}
            setEmbedActivation={setEmbedActivation}
          />
        </MediaToolbarFixed>
        <div
          ref={mediaToolbarRef}
          className="media-toolbar-container"
          style={{ opacity: isFocusEditor || embedActive ? 1 : 0 }}
        >
          <MediaToolbar
            editorState={editorState}
            onChangeEditor={setEditorState}
            imageInputRef={imageInputRef}
            embedActive={embedActive}
            setEmbedActivation={setEmbedActivation}
          />
        </div>
      </FlexContainer>
      <input
        className="d-none"
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={(e) => {
          e.preventDefault();
          handleUploadImage(e, editorState, setEditorState, currentBlockKey, imagesGallery);
        }}
        multiple
      />
    </EditorLayout>
  );
}

export const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};

const Media = (props) => {
  const { setEditorState, imageInputRef, setBlockKey, setImagesGallery, editorState } = props.blockProps;
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const blockKey = props.block.key;
  const type = entity.getType();

  if (type === 'ARTICLE') {
    const { articleId } = entity.getData();
    return <ArticleEmbed isPreview={true} articleId={articleId} />;
  }

  if (type === 'IMAGE') {
    const { images } = entity.getData();

    return (
      <ImageEditorComponent
        blockKey={blockKey}
        images={images}
        {...props}
        onChangeEditor={setEditorState}
        contentState={props.contentState}
        imageInputRef={imageInputRef}
        setBlockKey={setBlockKey}
        setImagesGallery={setImagesGallery}
        readOnly={false}
        editorState={editorState}
      />
    );
  }

  if (type === 'VIDEO') {
    const { videoId } = entity.getData();
    return (
      <EmbedPreview
        blockKey={blockKey}
        embedSource={videoId}
        contentState={props.contentState}
        onChangeEditor={setEditorState}
        editorState={editorState}
      />
    );
  }

  return null;
};

export default ContentEditor;
