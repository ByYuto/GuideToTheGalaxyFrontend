import React from 'react';
import { EmbedLayout } from './styled-components';

export default function EmbedPreview({ content }) {
  const contentArr = content.split(':');
  let videoUri = contentArr[1];
  const videoType = contentArr[0];
  if (videoType === 'youtube') {
    videoUri = `https://www.youtube.com/embed/${videoUri}`;
  }
  if (videoType === 'vimeo') {
    videoUri = `https://player.vimeo.com/video/${videoUri}`;
  }

  return (
    <EmbedLayout>
      <iframe title={videoType} src={videoUri} frameBorder="0" samesite="false"></iframe>
    </EmbedLayout>
  );
}
