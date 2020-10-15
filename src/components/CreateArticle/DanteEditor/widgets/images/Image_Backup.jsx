import React, { useState, useRef } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';

export const useImageWidget = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isImageInputShow, showImageInput] = useState(false);
  const imageInputRef = useRef(null);
  const [focusedInput, setFocusInput] = useState(false);

  const _confirmMedia = (e, editorState, onChangeEditor) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imageUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    onChangeEditor(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
    showImageInput(false);
    setImageUrl('');

    //focus on editor
  };

  const _onURLInputKeyDown = (e, editorState, onChangeEditor) => {
    if (e.which === 13) {
      _confirmMedia(e, editorState, onChangeEditor);
    }
  };

  const _promptForMedia = (type) => {
    showImageInput(true);
    setImageUrl('');
    setFocusInput(true);
  };
  const _addImage = () => {
    _promptForMedia('image');
  };

  return {
    confirmMedia: _confirmMedia,
    onURLInputKeyDown: _onURLInputKeyDown,
    promptForMedia: _promptForMedia,
    addImage: _addImage,
    imageUrl: imageUrl,
    isImageInputShow: isImageInputShow,
    focusedInput: focusedInput,
    imageInputRef: imageInputRef,
    setImageUrl: setImageUrl,
  };
};

export const imageStyles = {
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
  media: {
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial',
  },
};
