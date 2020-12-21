import React, { useState, useRef, useEffect } from 'react';
import { EditorLayout } from './styled-components';
import { Editor, EditorState, CompositeDecorator, RichUtils } from 'draft-js';
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
  const editorState = newArticle.content;
  const setEditorState = (editorData) => dispatch(onChangeArticleContent(editorData));
  const [isFocusEditor, setFocusEditor] = useState(false);
  const [styledToolbarOut, setStyledToolbarOut] = useState(false);
  const [mediaToolbarOut, setMediaToolbarOut] = useState(false);
  const [editorOut, setEditorOut] = useState(false);
  const [linkInputActive, setLinkInputActive] = useState('disabled');
  const [newLinkEntityKey, setLinkEntityKey] = useState(null);
  const imageInputRef = useRef(null);
  const editorContainer = useRef(null);
  const [currentBlockKey, setBlockKey] = useState(null);
  const [imagesGallery, setImagesGallery] = useState([]);
  const [urlValue, setUrlValue] = useState('');
  const [selectionState, setSelectionState] = useState(null);
  const editorRef = useRef(null);
  const editorDraftRef = useRef(null);
  const makeFocus = () => editorDraftRef.current.focus();
  const styledToolbarRef = useRef(null);
  const mediaToolbarRef = useRef(null);
  const [topDistance, setTopDistance] = useState(0);
  const [embedActive, setEmbedActivation] = useState(false);

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
      setLinkInputActive('inactive');
    }
  };

  const _confirmLink = async (editorState) => {
    const currentSelection = selectionState;
    const currentUrlValue = urlValue;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: currentUrlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = await EditorState.set(editorState, { currentContent: contentStateWithEntity });
    await setEditorState(RichUtils.toggleLink(newEditorState, currentSelection, entityKey));
    setLinkEntityKey(entityKey);
  };

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
    const isCollapse = selection.isCollapsed();
    if (isCollapse) {
      setLinkInputActive('disabled');
    }

    if (!isCollapse && linkInputActive === 'disabled') {
      setLinkInputActive('inactive');
    }
    if (newLinkEntityKey && linkInputActive === 'active') {
      setLinkInputActive('inactive');
      setUrlValue('');
      setSelectionState(null);
      setLinkEntityKey(null);
    }

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
  }, [urlValue, editorState, linkInputActive, newLinkEntityKey, topDistance]);

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
  const urlInput = (
    <Popover isOpen={linkInputActive === 'active'}>
      <div style={{ zIndex: 999 }}>
        <InsertLink
          onKeyDown={_onLinkInputKeyDown}
          url={urlValue}
          onClickBtn={_confirmLink}
          editorState={editorState}
          onChangeInput={onURLChange}
          onClear={() => {
            setUrlValue('');
          }}
          setLinkInputActive={setLinkInputActive}
        />
      </div>
    </Popover>
  );
  useEffect(() => {
    if (step === 3) {
      makeFocus();
    }
  }, [step]);
  return (
    <EditorLayout
      ref={editorContainer}
      className="editor-parent-container"
      linkInputActive={linkInputActive === 'active' ? 1 : 0}
    >
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
          linkInputActive={linkInputActive}
          setLinkInputActive={setLinkInputActive}
          setSelectionState={setSelectionState}
        />
      </div>
      <div
        className="fixed-styled-toolbar-container"
        style={{
          width: '180px',
          position: editorOut && !styledToolbarOut ? 'fixed' : 'relative',
          top: editorOut && !styledToolbarOut ? '2%' : '0',
          left: editorOut && !styledToolbarOut ? '16.5%' : '0',
          display: editorOut && !styledToolbarOut ? 'block' : 'none',
          zIndex: 5,
          opacity: isFocusEditor || embedActive ? 1 : 0,
        }}
      >
        <TextFormat
          editorState={editorState}
          setEditorState={setEditorState}
          promptLink={_promptForLink}
          linkInputActive={linkInputActive}
          setLinkInputActive={setLinkInputActive}
          setSelectionState={setSelectionState}
        />
      </div>
      <div>
        {urlInput}
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
            readOnly={linkInputActive === 'active'}
            onFocus={() => setFocusEditor(true)}
            onBlur={() => setFocusEditor(false)}
            ref={editorDraftRef}
          />
        </div>
      </div>
      <FlexContainer justify="center">
        <div
          style={{
            width: '250px',
            position: editorOut && !mediaToolbarOut ? 'fixed' : 'relative',
            top: editorOut && !mediaToolbarOut ? '70%' : '0',
            left: editorOut && !mediaToolbarOut ? '40%' : '0',
            display: editorOut && !mediaToolbarOut ? 'block' : 'none',
            zIndex: 5,
            opacity: isFocusEditor || embedActive ? 1 : 0,
          }}
          className="fixed-media-toolbar-container"
        >
          <MediaToolbar
            editorState={editorState}
            onChangeEditor={setEditorState}
            imageInputRef={imageInputRef}
            embedActive={embedActive}
            setEmbedActivation={setEmbedActivation}
          />
        </div>
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
