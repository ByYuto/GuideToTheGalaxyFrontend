import React from 'react';
import { EmbedLayout } from './styled-components';
import { MdClose } from 'react-icons/md';
///import { removeEmbed } from '../../../redux/reducers/newArticleState';
import { validateEmbed } from '../../../utils/validations';

export default function EmbedPreview({ id, embedSource }) {
  //const dispatch = useDispatch();
  const handleRemoveEmbed = () => {
    //dispatch(removeEmbed(id));
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
