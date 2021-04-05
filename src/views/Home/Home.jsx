import React, { useEffect, useState } from 'react';
import { StyledView, MaxWidthContainer, HomeLayout } from './styled-components';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getArticlesHome } from '../../redux/reducers/appState';
import ArticleEmbedView from '../../components/CreateArticle/ShareArticle/ArticleEmbedView';
import FlexContainer from '../../components/UI/FlexContainer';
import Loader from '../../components/UI/Loader';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getArticlesFilteredSpecificPage, setPage } from '../../redux/reducers/topbarSearch';
import { Link } from 'react-router-dom';

export default function Home() {
  const { articles } = useSelector((store) => store.app);
  const { loading, error, keywordsSelected, keywordSuggestions, page } = useSelector((store) => store.topbarSearch);
  const { authorization } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(setPage(page + 1));
  };
  useEffect(() => {
    dispatch(getArticlesFilteredSpecificPage(page));
  }, [dispatch, page]);
  return (
    <ThemeProvider theme={{ isDark: false }}>
      <HomeLayout>
        <StyledView>
          <MaxWidthContainer>
            <InfiniteScroll hasMore={true} next={fetchData} dataLength={articles.length}>
              {articles?.length > 0 ? (
                articles.map((a) => {
                  return <ArticleEmbedView className="articles-feed" {...a} key={a._id} />;
                })
              ) : (
                <FlexContainer align="center" justify="center" className="no-posts-container">
                  <div>No posts related on your search...</div>
                </FlexContainer>
              )}
            </InfiniteScroll>
          </MaxWidthContainer>
        </StyledView>
        {!error && loading && (
          <StyledView>
            <MaxWidthContainer>
              <FlexContainer justify="center">
                <Loader color="#6670F0" />
              </FlexContainer>
            </MaxWidthContainer>
          </StyledView>
        )}
      </HomeLayout>
    </ThemeProvider>
  );
}
