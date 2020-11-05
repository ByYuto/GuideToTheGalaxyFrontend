import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { KeywordLayout } from './styled-components';
import Tag from '../../UI/Tag';
import { removeKeyword } from '../../../redux/reducers/newArticleState';
import { useDispatch } from 'react-redux';

export default function Keyword({ name, tagType, readonlyTag, handleClick, cursorPointer }) {
  const dispatch = useDispatch();
  return (
    <KeywordLayout readonlyTag={readonlyTag} onClick={handleClick} cursorPointer={cursorPointer}>
      <Tag tagType={tagType} md>
        {name}
        {!readonlyTag && <IoIosClose className="closable" size={24} onClick={() => dispatch(removeKeyword(name))} />}
      </Tag>
    </KeywordLayout>
  );
}
