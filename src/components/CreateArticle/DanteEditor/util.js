import { EditorState } from 'draft-js';

export const resetBlockWithType = (editorState, newType = 'unstyled') => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const key = selectionState.getStartKey();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(key);

  const newBlock = block.merge({
    text: '',
    type: newType,
    data: {},
  });
  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0,
    }),
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
};

export const getURLFromCursor = (editorState) => {
  const entity = getEntityFromCursor(editorState, 'LINK');
  if (!entity) {
    return null;
  }
  return entity.getData().url;
};

export const getEntityKeyFromCursor = (editorState, type = null) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const startOffset = selection.getStartOffset();
  const block = contentState.getBlockForKey(startKey);

  const entityKey = block.getEntityAt(startOffset);

  return entityKey;
};

export const getEntityFromCursor = (editorState, type = null) => {
  const contentState = editorState.getCurrentContent();
  const entityKey = getEntityKeyFromCursor(editorState);

  if (!entityKey) {
    //If no key was found, return null
    return null;
  }

  //Get entity
  const entity = contentState.getEntity(entityKey);

  //If no entity, returns null
  if (!entity) {
    return null;
  }

  //If no type dilter was specified, returns the entity found
  if (!type) {
    return entity;
  }

  //If a type was specified, if type doesnt match with specified type, returns null
  if (entity.getType() !== type) {
    return null;
  }

  //An entity was found and type matches
  return entity;
};
