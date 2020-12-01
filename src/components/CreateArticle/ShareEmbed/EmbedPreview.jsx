import React from 'react';
import { EmbedLayout } from './styled-components';
import { MdClose } from 'react-icons/md';
///import { removeEmbed } from '../../../redux/reducers/newArticleState';
import { validateEmbed } from '../../../utils/validations';
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

export default function EmbedPreview({ embedSource, blockKey, onChangeEditor, stateEditor }) {
  const handleRemoveEmbed = (e) => {
    e.preventDefault();
    onChangeEditor(resetBlockWithType(stateEditor, 'unstyled', blockKey));
  };
  const validUri = validateEmbed(embedSource).valid;
  let videoUri = embedSource;
  if (!validUri) {
    const isYoutube = /^.{1,12}$/.test(embedSource);
    const isVimeo = /^\d+$/.test(embedSource);
    if (isYoutube) {
      videoUri = `https://www.youtube.com/embed/${embedSource}`;
    }
    if (isVimeo) {
      videoUri = `https://player.vimeo.com/video/${embedSource}`;
    }
  }

  return (
    <EmbedLayout>
      <div>
        <MdClose onClick={handleRemoveEmbed} />
      </div>
      <iframe title={videoUri} src={videoUri} frameBorder="0" samesite="false"></iframe>
    </EmbedLayout>
  );
}
