import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledView, MaxWidthContainer, ArticleDetailContainer } from './styled-components';
import FlexContainer from '../../components/UI/FlexContainer';
import DownloadPdf from '../../components/UI/download-pdf/DownloadPdf';
import AvatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import { Ellipse, CalendarIcon, OpenlinkIcon, LockIcon, EditIcon } from '../../assets/icons/svg-icons';
import ToolbarReactions from '../../components/UI/reaction-toolbar/ToolbarReactions';
import Tag from '../../components/UI/Tag';
import AuthorMeta from '../../components/UI/author-post/AuthorMeta';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearArticleDetails, getArticleDetailBySlug } from '../../redux/reducers/articleDetail';
import Loader from '../../components/UI/Loader';
import { getDateFormatted } from '../../utils/utils';
import ArticleContentBody from './ArticleContentBody';
import Button from '../../components/UI/Button';
import { setSelectedKeyword } from '../../redux/reducers/topbarSearch';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SITE_TITLE } from '../../utils/constants';
import CommentBox from '../../components/ArticleDetails/Comments/CommentBox';

export default function ArticleDetail() {
  const { categoryId, slug } = useParams();
  const dispatch = useDispatch();
  const { article, error, errorMessage, loading } = useSelector((store) => store.articleDetail);
  const { isMobile } = useSelector((store) => store.app);

  const history = useHistory();
  useEffect(() => {
    return () => {
      dispatch(clearArticleDetails());
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(getArticleDetailBySlug(slug));
  }, [categoryId, slug, dispatch]);

  useEffect(() => {
    if (article) {
      //TODO: Load article comments
    }
  }, [article, dispatch]);

  useEffect(() => {
    if (article && article.categoryId.toLowerCase() !== categoryId) {
      //console.log(`Reemplazando url por /${article.categoryId.toLowerCase()}/${slug}`);
      history.replace(`/${article.categoryId.toLowerCase()}/${slug}`);
    }
  }, [article, categoryId, history, slug]);

  const handleTagClick = (tag) => {
    dispatch(setSelectedKeyword(tag));
    history.push('/search');
  };

  const onPostComment = (comment) => {
    console.log('Posteando el comentario: ', comment);
  };

  return (
    <ArticleDetailContainer>
      <Helmet>
        <title>{'Article Detail'}</title>
      </Helmet>
      {error && (
        <StyledView>
          <MaxWidthContainer>
            <p>{errorMessage}</p>
          </MaxWidthContainer>
        </StyledView>
      )}
      {!error && !loading && (
        <>
          <ThemeProvider theme={{ isDark: true }}>
            <Helmet>
              <title>
                {article?.title || 'Article Detail'} - {SITE_TITLE}
              </title>
            </Helmet>
            <StyledView className="header-content">
              <MaxWidthContainer>
                <div className="breadcrumb">
                  {article?.categoryId}
                  <Ellipse /> {article?.contentTypeId} <Ellipse /> {article?.location?.locality || 'Worldwide'}
                </div>
                <FlexContainer className="metadata-container" align="stretch">
                  <FlexContainer elmWidth="80%" column align="stretch">
                    <h2>{article?.title}</h2>

                    {article?.date && (
                      <div className="metadata-date">
                        <CalendarIcon className="head-article-content-icon" />
                        <span>Passed: {getDateFormatted(article.date)}</span>
                        {article?.other && <span className="discontinued-date-label">Discontinued</span>}
                      </div>
                    )}
                    {isMobile && (
                      <FlexContainer align="center" className="featured-img-container">
                        {(article?.image?.content?.featured_m || article.image?.content?.large) && (
                          <figure className="featured-img">
                            <img
                              src={article.image.content.featured_m || article.image.content.large}
                              alt={article?.title || ''}
                            />
                          </figure>
                        )}
                      </FlexContainer>
                    )}
                    <div className="metadata-url">
                      {article && article.URL && article.categoryId !== 'TOOLS' && (
                        <a href={article.URL} target="_blank" rel="noopener noreferrer">
                          <OpenlinkIcon className="head-article-content-icon-link" />
                          {article.URL}
                        </a>
                      )}
                      {article && article.URL && article.categoryId === 'TOOLS' && (
                        <Button primary className="button-buy">
                          <a href={article.URL} target="_blank" rel="noopener noreferrer">
                            Buy here
                          </a>
                        </Button>
                      )}
                    </div>
                  </FlexContainer>
                  {!isMobile && (
                    <FlexContainer elmWidth="20%" align="center" className="featured-img-container">
                      {(article?.image?.content?.featured_m || article?.image?.content?.large) && (
                        <figure className="featured-img">
                          <img
                            src={article.image.content.featured_m || article?.image?.content?.large}
                            alt={article?.title || ''}
                          />
                        </figure>
                      )}
                    </FlexContainer>
                  )}
                </FlexContainer>
              </MaxWidthContainer>
            </StyledView>
            <StyledView className="after-header-content">
              <MaxWidthContainer>
                <FlexContainer align="center">
                  <figure className="post-author-avatar">
                    <img src={AvatarPlaceholder} alt={article?.user?.name || ''} />
                  </figure>
                  <div className="author-metadata">
                    <div>
                      <strong>{article?.user?.name}</strong>
                    </div>
                    <div className="post-metadata-date">
                      <span>{article?.updated_at && getDateFormatted(article.updated_at)}</span>
                    </div>
                  </div>
                </FlexContainer>
                <FlexContainer align="center">
                  <ToolbarReactions articleId={article?._id} liked={article?.liked} likes={article?.likes} />
                </FlexContainer>
              </MaxWidthContainer>
            </StyledView>
          </ThemeProvider>
          <ThemeProvider theme={{ isDark: false }}>
            <StyledView>
              <MaxWidthContainer className="content-container">
                {article?.content ? <ArticleContentBody articleContent={article.content} /> : null}
              </MaxWidthContainer>
            </StyledView>
            <StyledView>
              <MaxWidthContainer>
                {article?.pdf && article?.pdf.url && (
                  <DownloadPdf
                    fileName={article.pdf.filename}
                    pdfUrl={article.pdf.url}
                    originalFilename={article.pdf.originalFilename}
                  />
                )}
                {article && article.URL && article.categoryId === 'TOOLS' && (
                  <Button primary className="button-buy">
                    <a href={article.URL} target="_blank" rel="noopener noreferrer">
                      Buy here
                    </a>
                  </Button>
                )}
              </MaxWidthContainer>
            </StyledView>
            <StyledView>
              <MaxWidthContainer className="footer-author-meta">
                {article &&
                  article.keywords &&
                  article.keywords.length > 0 &&
                  article.keywords.map((k, index) => (
                    <Tag key={index} md tagType="primary" onClick={() => handleTagClick(k)}>
                      {k}
                    </Tag>
                  ))}
              </MaxWidthContainer>
              <MaxWidthContainer className="footer-author-meta">
                {article?.user && article?.updated_at && (
                  <AuthorMeta
                    authorName={article?.user?.name}
                    postDate={article?.updated_at && getDateFormatted(article.updated_at)}
                    avatarUrl={article?.user?.avatar}
                  />
                )}
              </MaxWidthContainer>
              <MaxWidthContainer className="reactions-column">
                <FlexContainer align="stretch" elmWidth="100%" justify="space-between">
                  {article?.communityEditsAllowed ? (
                    <FlexContainer align="center" elmWidth="40%" className="contributions-bar">
                      <FlexContainer elmWidth="100%">
                        <FlexContainer align="center" elmWidth="100%" className="contributions-counter">
                          <span className="contributions-number">0</span>
                          <span>CONTRIBUTIONS</span>
                        </FlexContainer>
                      </FlexContainer>
                      <FlexContainer elmWidth="100%">
                        <FlexContainer align="center" elmWidth="100%">
                          <EditIcon className="contributions-number" />
                          <span>SUGGEST EDIT</span>
                        </FlexContainer>
                      </FlexContainer>
                    </FlexContainer>
                  ) : (
                    <FlexContainer align="center" elmWidth="60%">
                      <span className="edit-lock">
                        <LockIcon />
                        EDIT LOCKED
                      </span>
                    </FlexContainer>
                  )}

                  <FlexContainer align="center" elmWidth="30%" justify="flex-end">
                    <ToolbarReactions
                      postDetail
                      articleId={article?._id}
                      liked={article?.liked}
                      likes={article?.likes}
                    />
                  </FlexContainer>
                </FlexContainer>
              </MaxWidthContainer>
            </StyledView>
            <StyledView className="comments-section">
              <MaxWidthContainer>
                <CommentBox onPostComment={onPostComment} onClose={() => console.log('Closed')} />
                {/*<CommentsK comments={comments} />*/}
              </MaxWidthContainer>
            </StyledView>
          </ThemeProvider>
        </>
      )}
      {!error && loading && (
        <StyledView>
          <MaxWidthContainer>
            <FlexContainer justify="center">
              <Loader color="#6670F0" />
            </FlexContainer>
          </MaxWidthContainer>
        </StyledView>
      )}
    </ArticleDetailContainer>
  );
}
