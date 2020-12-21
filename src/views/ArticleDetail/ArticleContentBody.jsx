import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { decorator } from '../../redux/reducers/newArticleState';
import ArticleEmbed from '../../components/CreateArticle/ShareArticle/ArticleEmbed';
import EmbedPreview from '../../components/ArticleDetails/ShareEmbed/EmbedPreview';
import ImageEditorComponent from '../../components/ArticleDetails/ImageEditor/ImageEditorComponent';
import styled from 'styled-components';

const EditorReadOnlyLayout = styled.div`
  & .public-DraftStyleDefault-block.public-DraftStyleDefault-ltr > span {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
  }
  & .article-container {
    color: inherit !important;
    text-decoration: none !important;
    outline: 0 !important;
  }
`;

export default function ArticleContentBody({ articleContent }) {
  const contentEditor = convertFromRaw(articleContent);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentEditor, decorator));

  const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }

    return null;
  };

  useEffect(() => {
    const contentEditor = convertFromRaw(articleContent);
    setEditorState(EditorState.push(editorState, contentEditor));
  }, [articleContent]);
  return (
    <EditorReadOnlyLayout>
      <Editor
        editorState={editorState}
        readOnly={true}
        blockRendererFn={mediaBlockRenderer}
        onChange={setEditorState}
      />
    </EditorReadOnlyLayout>
  );
}

ArticleContentBody.propTypes = {
  articleContent: PropTypes.object.isRequired,
};

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const blockKey = props.block.key;
  const type = entity.getType();

  if (type === 'ARTICLE') {
    const { articleId } = entity.getData();
    return <ArticleEmbed articleId={articleId} />;
  }

  if (type === 'IMAGE') {
    const { images } = entity.getData();

    return <ImageEditorComponent blockKey={blockKey} images={images} />;
  }

  if (type === 'VIDEO') {
    const { videoId } = entity.getData();
    return <EmbedPreview embedSource={videoId} />;
  }

  return null;
};
