import React from 'react';
import { EmbedLayout } from './styled-components';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removeEmbed } from '../../../redux/reducers/newArticleState';

export default function EmbedPreview({ id, embedSource }) {
  const dispatch = useDispatch();
  const handleRemoveEmbed = () => {
    dispatch(removeEmbed(id));
  };
  return (
    <EmbedLayout key={id}>
      <div>
        <MdClose onClick={handleRemoveEmbed} />
      </div>
      <iframe title={id} src={embedSource} frameBorder="0" samesite="false"></iframe>
    </EmbedLayout>
  );
}
