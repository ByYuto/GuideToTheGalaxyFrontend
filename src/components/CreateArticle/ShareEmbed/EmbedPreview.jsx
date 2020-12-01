import React from 'react';
import { EmbedLayout } from './styled-components';
import { MdClose } from 'react-icons/md';
import { validateEmbed } from '../../../utils/validations';
import { resetBlockWithType } from '../DanteEditor/util';

export default function EmbedPreview({ embedSource, blockKey, onChangeEditor, editorState }) {
  const handleRemoveEmbed = (e) => {
    e.preventDefault();
    onChangeEditor(resetBlockWithType(editorState, 'unstyled', blockKey));
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
