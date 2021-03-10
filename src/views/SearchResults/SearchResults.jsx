import React, { useEffect } from 'react';
import { StyledView, MaxWidthContainer, SearchResultsLayout } from './styled-components';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import ArticleEmbedView from '../../components/CreateArticle/ShareArticle/ArticleEmbedView';
import { useParams } from 'react-router-dom';
import Loader from '../../components/UI/Loader';

export default function SearchResults() {
  const { articles } = useSelector((store) => store.app);
  const { loading, error } = useSelector((store) => store.topbarSearch);
  const {} = useParams();
  return (
    <ThemeProvider theme={{ isDark: false }}>
      <SearchResultsLayout>
        <StyledView>
          <MaxWidthContainer>
            {articles?.length > 0 ? (
              articles.map((a, index) => <ArticleEmbedView className="articles-feed" key={index} {...a} />)
            ) : (
              <FlexContainer align="center" justify="center">
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
      </SearchResultsLayout>
    </ThemeProvider>
  );
}
