import React, { useState, useEffect } from 'react';
import Input from '../../UI/Input';
import { CheckIcon, VideoMediaIcon } from '../../../assets/icons/svg-icons';
import { ShareEmbedLayout } from './styled-components';
import { validateEmbed } from '../../../utils/validations';
import { insertEmbed } from '../../../redux/reducers/newArticleState';
import { useDispatch } from 'react-redux';

export default function ShareEmbed({ index, showEmbed }) {
  const [embed, setEmbed] = useState('');
  const [validEmbed, setValidEmbed] = useState(false);
  const handleEmbedValue = (value) => {
    setEmbed(value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const isValid = validateEmbed(embed, true);
    setValidEmbed(isValid.valid);
  }, [embed]);

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
      const data = {
        content: [
          {
            type: 'embed',
            children: [{ source: videoId }],
          },
        ],
      };

      dispatch(insertEmbed(index, data));
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
        onBlur={null}
        onFocus={null}
        actionButton={
          <button
            className="action-button"
            disabled={!validEmbed}
            onClick={(e) => {
              e.preventDefault();
              console.log('clicked');
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
