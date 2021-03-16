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
            {articles?.length > 0 ? (
              <InfiniteScroll dataLength={articles.length} next={fetchData} hasMore={true}>
                {articles.map((a) => (
                  <ArticleEmbedView className="articles-feed" key={a._id} {...a} />
                ))}
              </InfiniteScroll>
            ) : (
              <FlexContainer align="center" justify="center" className="no-posts-container">
                <div>No posts related on your search...</div>
              </FlexContainer>
            )}
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
