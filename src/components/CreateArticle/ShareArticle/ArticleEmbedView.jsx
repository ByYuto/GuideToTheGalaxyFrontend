import React from 'react';
import { Ellipse } from '../../../assets/icons/svg-icons';
import FlexContainer from '../../UI/FlexContainer';
import Card from '../../UI/Card';
import Tag from '../../UI/Tag';
import { ShareArticleCardView, ShareArticleCardPreview } from './styled-components';
import ToolbarReactions from '../../UI/reaction-toolbar/ToolbarReactions';
import AuthorMeta from '../../UI/author-post/AuthorMeta';
import { getDateFormatted } from '../../../utils/utils';
import { setSelectedKeyword } from '../../../redux/reducers/topbarSearch';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Row, Col, FlexboxGrid } from 'rsuite';

export default function ArticleEmbedView({
  _id,
  categoryId,
  contentTypeId,
  title,
  image,
  location,
  keywords,
  textContent,
  user,
  create_at,
  updated_at,
  liked,
  likes,
  isPreview,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const keyWordsCutted = keywords?.slice(0, 10) || [];
  const cardContent = (
    <Card fullWidth>
      <FlexContainer column>
        <div style={{ width: '100%' }}>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={image && image.content?.featured_sm ? 16 : 24}>
              <FlexContainer justify="space-between" align="center">
                <div className="breadcrumb">
                  {categoryId} <Ellipse /> {contentTypeId} <Ellipse /> {location ? location : 'Worldwide'}
                </div>
              </FlexContainer>
              <FlexContainer justify="space-between" align="stretch">
                <FlexContainer className="post-content" column breakRow="wrap" elmWidth="100%">
                  <div style={{ flexGrow: 1 }}>
                    <h4>{title}</h4>
                    <p>{textContent}</p>
                    <div></div>
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <FlexContainer justify="space-around" inline className="keywords-container">
                      {keyWordsCutted && keyWordsCutted.length > 0
                        ? keyWordsCutted.map((k, index) => (
                            <>
                              {isPreview ? (
                                <Tag tagType="primary" sm key={index} className="tag-embed-post">
                                  {k}
                                </Tag>
                              ) : (
                                <Tag
                                  tagType="primary"
                                  sm
                                  key={index}
                                  className="tag-embed-post"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleTagClick(k);
                                  }}
                                >
                                  {k}
                                </Tag>
                              )}
                            </>
                          ))
                        : null}
                    </FlexContainer>
                  </div>
                </FlexContainer>
              </FlexContainer>
            </FlexboxGrid.Item>
            {image && image.content?.featured_sm ? (
              <FlexboxGrid.Item colspan={8}>
                <FlexContainer justify="flex-end" elmWidth="100%" align="center">
                  <figure>
                    <img src={image.content.featured_m} alt={title} />
                  </figure>
                </FlexContainer>
              </FlexboxGrid.Item>
            ) : null}
          </FlexboxGrid>
        </div>
        <div style={{ width: '100%' }}>
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>
              {user && (
                <AuthorMeta
                  authorName={user?.name}
                  postDate={(updated_at && getDateFormatted(updated_at)) || (create_at && getDateFormatted(create_at))}
                  avatarUrl={user?.avatar}
                />
              )}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <FlexContainer justify="space-evenly" align="center" className="reactions-toolbar" elmWidth="100%">
                <ToolbarReactions articleId={_id} liked={liked} likes={likes} />
              </FlexContainer>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      </FlexContainer>
    </Card>
  );
  const handleTagClick = (tag) => {
    dispatch(setSelectedKeyword(tag));
    history.push('/search');
  };
  return (
    <div key={_id}>
      {!isPreview ? (
        <ShareArticleCardView to={`/article/${_id}`}>{cardContent}</ShareArticleCardView>
      ) : (
        <ShareArticleCardPreview>{cardContent}</ShareArticleCardPreview>
      )}
    </div>
  );
}
