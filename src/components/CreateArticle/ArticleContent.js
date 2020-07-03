import React, { useState, useRef } from 'react';
import Caption from '../UI/Caption';
import Input from '../UI/Input';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import ArticleTemplate from './ArticleTemplate';
import { Editor } from '@tinymce/tinymce-react';

const StyledArticleImage = styled.div`
  padding: 0 10px;
`;
const StyledArticleFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 10px;
`;

const StyledArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: 34px;
  border-top: 1px solid #151531;

  ${Caption} {
    text-align: center;
  }

  ${StyledArticleFields} {
    flex-basis: 0;
    flex-grow: 7;
  }
  ${StyledArticleImage} {
    flex-basis: 0;
    flex-grow: 3;
  }
`;

export const MaxWidthContainer = styled.div`
  max-width: 1016px;
  width: 100%;
  margin: auto;
`;

const AddContentContainer = styled.div`
  position: absolute;
  top: 100%;
  box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
`;

const FormatContentContainer = styled.div`
  position: absolute;
  bottom: 100%;
  box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
`;

const ArticleContentPartContainer = styled.div`
  position: relative;
  margin: 20px 0px;
  box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
  border-radius: 8px;
  border: 1px solid transparent;
  ${(props) =>
    props.focused
      ? css`
          outline: 0;
          border-color: ${(props) => props.theme.accentColors.primary.color};

          .mce-content-body:focus {
            outline: 0;
          }
        `
      : null}
`;

/*
const categoriesSelector = (state) => state.app.categories;
const getContentType = (categories, categoryId, contentTypeId) => {
  const category = categories.find((category) => category.name === categoryId);
  return category.contentTypes.find((contentType) => contentType.name === contentTypeId);
};
*/
const ArticleContentPart = ({ contentPart, contentIndex, article, onChange, onKeyDown, onAddContentPart }) => {
  const [focused, setFocused] = useState(false);
  const blurTimeoutId = useRef(null);
  const tinyMCEEditorRef = useRef(null);
  const [selectionChangeCount, setSelectionChangeCount] = useState(0);
  const handleEditorChange = (content, editor) => {
    onChange && onChange(content);
  };
  const _onFocus = (e) => {
    clearTimeout(blurTimeoutId.current);
    setFocused(true);
  };
  const _onBlur = (e) => {
    blurTimeoutId.current = setTimeout(() => {
      setFocused(false);
    }, 10);
  };
  //tinyMCEEditorRef.current.editor.editorCommands.queryCommandState('Bold');
  return (
    <ArticleContentPartContainer onFocus={_onFocus} onBlur={_onBlur} tabIndex={0} focused={focused}>
      {tinyMCEEditorRef.current && (
        <FormatContentContainer style={{ marginLeft: '200px' }}>
          <button
            onClick={() => tinyMCEEditorRef.current.editor.editorCommands.execCommand('Bold')}
            style={{
              fontWeight:
                tinyMCEEditorRef.current.editor.editorCommands.queryCommandState('Bold') === true ? 'bolder' : 'normal',
            }}
          >
            B
          </button>
          <button>I</button>
        </FormatContentContainer>
      )}
      <Editor
        ref={tinyMCEEditorRef}
        apiKey="hgxskwg9eqfbgmwxdybae640x48524e9fu29wko5bsvywhs1"
        inline={true}
        init={{
          menubar: false,
          branding: false,
          plugins: ['autolink link fullscreen insertdatetime media table paste'],
          toolbar: 'bold italic link unlink',
          //toolbar: '',
          link_context_toolbar: true,
          default_link_target: '_blank',
          link_assume_external_targets: true,
        }}
        value={contentPart.content}
        onEditorChange={handleEditorChange}
        onKeyDown={onKeyDown}
        onInit={(event, editor) => {
          console.log('Editor on init', editor);
        }}
        onSelectionChange={() => setSelectionChangeCount(selectionChangeCount + 1)}
      />
      {focused && (
        <AddContentContainer>
          <AddContentComponent index={contentIndex} onAddContentPart={onAddContentPart}></AddContentComponent>
        </AddContentContainer>
      )}
    </ArticleContentPartContainer>
  );
};

const AddContentComponent = ({ index, onAddContentPart }) => {
  const onAddParagraph = () => {
    onAddContentPart && onAddContentPart(index, 'text');
  };
  const onAddMedia = () => {
    onAddContentPart && onAddContentPart(index, 'media');
  };

  const onAddPhoto = () => {
    onAddContentPart && onAddContentPart(index, 'photo');
  };

  const onAddLink = () => {
    onAddContentPart && onAddContentPart(index, 'link');
  };

  return (
    <div>
      <button onClick={onAddParagraph}>Add Paragraph</button>
      <button onClick={onAddMedia}>Add Media</button>
      <button onClick={onAddPhoto}>Add Photo</button>
      <button onClick={onAddLink}>Add Link</button>
    </div>
  );
};

const ArticleContent = ({ article, onChange, onKeyDown }) => {
  console.log(article.content);
  const onAddContentPart = (index, type, data) => {
    console.log('trying to add a ' + type + ' content at index ' + index);
  };
  return (
    <StyledArticleContent>
      <MaxWidthContainer>
        <p style={{ textAlign: 'center' }}>
          <Caption>MAIN CONTENT</Caption>
        </p>
        {article.content && article.content.length
          ? article.content.map((contentPart, index) => (
              <ArticleContentPart
                key={index}
                contentIndex={index}
                contentPart={contentPart}
                onKeyDown={onKeyDown}
                onAddContentPart={onAddContentPart}
              />
            ))
          : null}
      </MaxWidthContainer>
    </StyledArticleContent>
  );
};

export default ArticleContent;
