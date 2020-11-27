import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { decorator } from '../../redux/reducers/newArticleState';
import ArticleEmbed from '../../components/ArticleDetails/ShareArticle/ArticleEmbed';
import EmbedPreview from '../../components/ArticleDetails/ShareEmbed/EmbedPreview';
import ImageEditorComponent from '../../components/ArticleDetails/ImageEditor/ImageEditorComponent';
import styled from 'styled-components';

const EditorReadOnlyLayout = styled.div`
  & .article-container {
    color: inherit;
    text-decoration: none;
    outline: 0;

    &:hover {
      color: inherit;
      text-decoration: none;
      outline: 0;
    }
  }
`;

export default function ArticleContentBody({ articleContent }) {
  const contentEditor = convertFromRaw(articleContent);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentEditor, decorator));
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

  const mediaBlockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false,
      };
    }

    return null;
  };
  return (
    <EditorReadOnlyLayout>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        readOnly={true}
        blockRendererFn={mediaBlockRenderer}
      />
    </EditorReadOnlyLayout>
  );
}

ArticleContentBody.propTypes = {
  articleContent: PropTypes.object.isRequired,
};
