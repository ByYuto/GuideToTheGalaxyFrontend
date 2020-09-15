import React, { useState, useRef } from 'react';
import Caption from '../UI/Caption';
import styled, { css } from 'styled-components';
import ContentEditor from '../UI/editor/ContentEditor';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '../UI/Divider';
import UploadPdf from '../UI/forms/UploadPdf';
import ToggleContributor from '../UI/ToggleContributor';
import ImageEditorComponent from './ImageEditor/ImageEditorComponent';
import EmbedPreview from './ShareEmbed/EmbedPreview';
import ArticleEmbed from './ShareArticle/ArticleEmbed';

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
  font-size: 1.5em;
  border-radius: 5px;
`;

const ArticleContentPartContainer = styled.div`
  position: relative;
  margin: 20px 0px;
  box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
  border-radius: 8px;
  border: 1px solid transparent;

  & .light-tooltip {
    color: white;
  }
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

const EditorButton = styled.button`
  border: none;
  background-color: transparent;
  outline: 0;
  box-shadow: none;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #6670f0;
  }
`;

const ArticleContent = ({ article, onChangeArticle, onKeyDown }) => {
  const { newArticle, currentIndex } = useSelector((store) => store.newArticle);
  const { contents } = newArticle;
  const onAddContentPart = (index, type, data) => {
    //console.log('trying to add a ' + type + ' content at index ' + index);
    const newArticle = { ...article };
    newArticle.content.splice(index + 1, 0, {
      content: 'hello world',
      type,
    });
    onChangeArticle(newArticle);
  };

  const onContentPartChange = (index, content) => {
    //console.log('trying to add a ' + type + ' content at index ' + index);
    const newArticle = JSON.parse(JSON.stringify(article));
    newArticle.content[index].content = content;
    onChangeArticle && onChangeArticle(newArticle);
  };

  return (
    <StyledArticleContent>
      <MaxWidthContainer>
        <p style={{ textAlign: 'center' }}>
          <Caption bold>MAIN CONTENT</Caption>
        </p>
      </MaxWidthContainer>
      <MaxWidthContainer>
        {contents.length > 0 ? (
          contents.map((contentObj, index) => {
            if (contentObj.type === 'image') {
              return (
                <ImageEditorComponent
                  key={contentObj.id}
                  contentId={contentObj.id}
                  images={contentObj.content[0].children}
                />
              );
            }
            if (contentObj.type === 'embed') {
              return (
                <EmbedPreview
                  key={contentObj.id}
                  id={contentObj.id}
                  embedSource={contentObj.content[0].children[0].source}
                />
              );
            }

            if (contentObj.type === 'article') {
              return <ArticleEmbed key={contentObj.id} id={contentObj.id} articleId={contentObj.content} />;
            }
            return (
              <ContentEditor
                index={index}
                key={contentObj.id}
                id={contentObj.id}
                editorValue={contentObj.content}
                focused={currentIndex === contentObj.id}
              />
            );
          })
        ) : (
          <ContentEditor
            key={0}
            editorValue={[
              {
                type: 'paragraph',
                children: [{ text: '' }],
              },
            ]}
          />
        )}
      </MaxWidthContainer>
      <MaxWidthContainer>
        <Divider />
        <UploadPdf />
        <ToggleContributor />
      </MaxWidthContainer>
    </StyledArticleContent>
  );
};

export default ArticleContent;
