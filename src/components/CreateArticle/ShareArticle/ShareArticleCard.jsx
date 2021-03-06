import React from 'react';
import { PlusIcon, CommentsIcon, PunchIcon, Ellipse } from '../../../assets/icons/svg-icons';
import FlexContainer from '../../UI/FlexContainer';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Tag from '../../UI/Tag';
import { ShareArticleCardLayout } from './styled-components';
import { useSelector } from 'react-redux';

export default function ShareArticleCard({
  _id,
  categoryId,
  contentTypeId,
  title,
  image,
  location,
  keywords,
  textContent,
  closeModal,
  confirmArticle,
  editorState,
}) {
  const handleAddArticle = (e, editorState, _id) => {
    closeModal(false);
    //dispatch(insertEmbedArticle(contentIndex, _id));
    confirmArticle(e, editorState, _id);
  };
  const { isMobile } = useSelector((store) => store.app);

  const filterKeywords = (keywords) => {
    if (!keywords || !keywords.length || keywords.length === 0) {
      return [];
    }

    return keywords.slice(0, 2);
  };

  const keywordsFiltered = filterKeywords(keywords);
  return (
    <ShareArticleCardLayout existImage={!!image}>
      <Card className="article-card">
        <FlexContainer justify="space-between" align="center">
          <div className="breadcrumb">
            {categoryId} <Ellipse /> {contentTypeId} <Ellipse /> {location ? location : 'Worldwide'}
          </div>
          <Button
            className="card-add-button"
            onClick={(e) => {
              handleAddArticle(e, editorState, _id);
            }}
          >
            <PlusIcon />
            Add
          </Button>
        </FlexContainer>

        <FlexContainer className="post-content">
          <div>
            <div>
              <h4>{title}</h4>
            </div>
            <p>{textContent}</p>
          </div>
          {image && image.content?.featured_sm ? (
            <figure>
              <img src={image.content.featured_sm} alt={title} />
            </figure>
          ) : null}
        </FlexContainer>
        <FlexContainer align="center">
          <div style={{ width: '65%' }}>
            <FlexContainer className="keywords-container" justify="flex-start" inline>
              {keywordsFiltered && keywordsFiltered.length > 0
                ? keywordsFiltered.map((k, index) => {
                    if (index > 2) {
                      return null;
                    }
                    return (
                      <Tag tagType="primary" sm key={index}>
                        {k}
                      </Tag>
                    );
                  })
                : null}
            </FlexContainer>
          </div>
          <div style={{ width: '32%' }}>
            <FlexContainer justify="space-between" align="center" className="reactions-toolbar">
              <div>
                <FlexContainer justify="space-around" align="center" inline>
                  <PunchIcon />
                  <span>0</span>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer justify="space-around" align="center" inline>
                  <CommentsIcon />
                  <span>0</span>
                </FlexContainer>
              </div>
            </FlexContainer>
          </div>
        </FlexContainer>
      </Card>
    </ShareArticleCardLayout>
  );
}
