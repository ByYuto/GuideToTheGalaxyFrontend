import React, { useState, useEffect } from 'react';
import Input from '../../UI/Input';
import { CheckIcon, VideoMediaIcon } from '../../../assets/icons/svg-icons';
import { ShareEmbedLayout } from './styled-components';
import { validateEmbed } from '../../../utils/validations';

export default function ShareEmbed({ index, showEmbed, confirmVideo, editorState }) {
  const [embed, setEmbed] = useState('');
  const [validEmbed, setValidEmbed] = useState(false);
  const handleEmbedValue = (value) => {
    setEmbed(value);
  };

  useEffect(() => {
    const isValid = validateEmbed(embed, true);
    setValidEmbed(isValid.valid);
  }, [embed]);

  const getEmbedType = (isYoutube, isVimeo) => (isYoutube && 'youtube') || (isVimeo && 'vimeo') || 'embed';

  const handleSubmitValue = () => {
    if (validEmbed) {
      showEmbed(false);
      const params = new URL(embed);
      const isYoutube = /youtube.com/.test(embed);
      const isVimeo = /vimeo.com/.test(embed);
      let videoId;
      if (isYoutube) {
        videoId = params.searchParams.get('v');
      } else if (isVimeo) {
        videoId = params.searchParams.get('v');
        const regExp = /\/\d+/;
        const match = embed.match(regExp);
        const result = match[0].split('/');
        videoId = result[1];
      } else {
        videoId = embed;
      }
      const embedType = getEmbedType(isYoutube, isVimeo);
      /*const data = {
        content: [
          {
            type: 'embed',
            children: [{ source: videoId }],
            embedType: embedType,
          },
        ],
      };

      dispatch(insertEmbed(index, data));*/
      confirmVideo(editorState, videoId, embedType);
    }
  };

  const handleEnterSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmitValue();
    }
  };

  return (
    <ShareEmbedLayout disabled={!validEmbed} onKeyDown={handleEnterSubmit}>
      <Input
        leftIcon={
          <>
            <VideoMediaIcon className="icon-search" />
          </>
        }
        placeholder={'Paste your videolink'}
        value={embed}
        block
        onChange={(value) => handleEmbedValue(value)}
        readOnly={false}
        handleKeyDown={(e) => {
          if (e.keyCode === 27) {
            e.preventDefault();
            showEmbed(false);
            return;
          }

          return;
        }}
        onBlur={null}
        onFocus={null}
        actionButton={
          <button
            className="action-button"
            disabled={!validEmbed}
            onClick={(e) => {
              e.preventDefault();
              handleSubmitValue();
            }}
          >
            <CheckIcon />
          </button>
        }
      />
    </ShareEmbedLayout>
  );
}
