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