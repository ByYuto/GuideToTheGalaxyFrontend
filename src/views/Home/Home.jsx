import React, { useEffect } from 'react';
import { StyledView, MaxWidthContainer } from './styled-components';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getArticlesHome } from '../../redux/reducers/appState';
import ArticleEmbedView from '../../components/CreateArticle/ShareArticle/ArticleEmbedView';
import FlexContainer from '../../components/UI/FlexContainer';
import Loader from '../../components/UI/Loader';

export default function Home() {
  const { articles } = useSelector((store) => store.app);
  const { loading, error } = useSelector((store) => store.topbarSearch);
  const { authorization } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (articles.length < 1) {
      dispatch(getArticlesHome());
    }
  }, [authorization]);
  return (
    <ThemeProvider theme={{ isDark: false }}>
      <StyledView>
        <MaxWidthContainer>
          {articles?.length > 0 ? (
            articles.map((a, index) => <ArticleEmbedView key={index} {...a} />)
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
    </ThemeProvider>
  );
}
