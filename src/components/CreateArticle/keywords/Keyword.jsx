import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { KeywordLayout } from './styled-components';
import Tag from '../../UI/Tag';
import { removeKeyword } from '../../../redux/reducers/newArticleState';
import { useDispatch } from 'react-redux';

export default function Keyword({ name, tagType, readonlyTag }) {
  const dispatch = useDispatch();
  return (
    <KeywordLayout readonlyTag={readonlyTag}>
      <Tag tagType={tagType} md>
        {name}
        {!readonlyTag && <IoIosClose className="closable" size={24} onClick={() => dispatch(removeKeyword(name))} />}
      </Tag>
    </KeywordLayout>
  );
}
