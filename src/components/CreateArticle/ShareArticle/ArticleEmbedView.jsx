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
import { FlexboxGrid } from 'rsuite';
import { screen } from '../../../utils/constants';
import styled from 'styled-components';
import useMobile from '../../../hooks/useMobile';

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
  const isMobile = useMobile();
  const getKeywordsPreview = (keywords) => {
    if (keywords && keywords.length === 0) {
      return [];
    }

    if (window.innerWidth > 864) {
      return keywords?.slice(0, 10);
    } else {
      return keywords?.slice(0, 3);
    }
  };
  const keyWordsCutted = getKeywordsPreview(keywords);
  const cardContent = (
    <ArticleCard fullWidth>
      <FlexContainer column>
        <div style={{ width: '100%' }}>
          <ArticleMainContent>
            <ArticleContentContainer colspan={(!image && !image?.content?.featured_sm) || isMobile ? 24 : 16}>
              <FlexContainer justify="space-between" align="center">
                <div className="breadcrumb">
                  {categoryId} <Ellipse /> {contentTypeId} <Ellipse /> {location ? location : 'Worldwide'}
                </div>
              </FlexContainer>
              <FlexContainer justify="space-between" align="stretch">
                <FlexContainer className="post-content" column breakRow="wrap">
                  <div style={{ flexGrow: 1 }}>
                    <h4>{title}</h4>
                    <p>{textContent}</p>
                    <div></div>
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <KeywordsContainer justify="space-around" inline className="keywords-container">
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
                    </KeywordsContainer>
                  </div>
                </FlexContainer>
              </FlexContainer>
            </ArticleContentContainer>
            {image && image.content?.featured_sm ? (
              <FlexboxGrid.Item colspan={isMobile ? 24 : 8}>
                <FlexContainer justify="flex-end" elmWidth="100%" align="center">
                  <FeaturedImageContainer>
                    <img src={image.content.featured_m} alt={title} />
                  </FeaturedImageContainer>
                </FlexContainer>
              </FlexboxGrid.Item>
            ) : null}
          </ArticleMainContent>
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
    </ArticleCard>
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

const ArticleMainContent = styled(FlexboxGrid)`
  @media (max-width: ${screen.SM}) {
    flex-direction: column;
  }
`;

const ArticleContentContainer = styled(FlexboxGrid.Item)`
  @media (max-width: ${screen.SM}) {
    order: 2;
  }
`;

const ArticleCard = styled(Card)`
  @media (max-width: ${screen.SM}) {
    box-shadow: none;
    border-bottom: 1px solid #f6f8ff;
    filter: none;
    border-radius: none;
    padding-bottom: 24px;
    padding-top: 0px;
  }
`;

const FeaturedImageContainer = styled.figure`
  margin: 0;
  width: 169px;
  height: 138px;
  overflow: hidden;
  border-radius: 16px;
  margin: 0;
  @media (max-width: ${screen.SM}) {
    width: 100%;
    height: auto;
    margin-bottom: 8px;
  }
  & img {
    width: 100%;
    height: auto;
    border-radius: 16px;
  }
`;

const KeywordsContainer = styled(FlexContainer)`
  @media (max-width: ${screen.SM}) {
    margin-top: 16px;
    margin-bottom: 24px;
  }
`;
