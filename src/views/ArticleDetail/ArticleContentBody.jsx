import React from 'react';
import ImageContent from './ImageContent';
import PropTypes from 'prop-types';
import ArticleEmbed from '../../components/CreateArticle/ShareArticle/ArticleEmbed';
import VideoContent from './VideoContent';

export default function ArticleContentBody({ articleContent }) {
  return (
    <>
      {articleContent.map((elm, index) => {
        if (elm.type === 'paragraph') {
          if (elm.content[0]?.length < 1) {
            return <p key={index}>{''}</p>;
          }
          const currentParagraph = elm.content.reduce((acc, cv) => {
            let currentText = cv.text;
            if (cv.link) {
              currentText = (
                <a target="_blank" href={cv.url}>
                  {currentText}
                </a>
              );
            }
            if (cv.bold) {
              currentText = <b>{currentText}</b>;
            }
            if (cv.italic) {
              currentText = <i>{currentText}</i>;
            }
            if (cv.underline) {
              currentText = <u>{currentText}</u>;
            }

            return (
              <>
                {acc} {currentText}
              </>
            );
          }, '');
          return <p key={index}>{currentParagraph}</p>;
        } else if (elm.type === 'gallery') {
          if (elm.content && elm.content.length > 0) {
            const galleryArr = elm.content.map((image) => ({
              url: image.content.gallery_l,
            }));
            return <ImageContent key={index} images={galleryArr} />;
          }
        } else if (elm.type === 'image') {
          if (elm.content && elm.content.content) {
            return <ImageContent key={index} images={[{ url: elm.content.content.gallery_l }]} />;
          }
        } else if (elm.type === 'article') {
          if (elm.content) {
            return <ArticleEmbed key={index} articleId={elm.content} />;
          }
        } else if (elm.type === 'video') {
          return <VideoContent key={index} content={elm.content} />;
        }
      })}
    </>
  );
}

ArticleContentBody.propTypes = {
  articleContent: PropTypes.array.isRequired,
};
