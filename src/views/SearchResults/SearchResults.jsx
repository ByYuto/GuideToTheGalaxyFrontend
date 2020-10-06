import React, { useEffect } from 'react';
import { StyledView, MaxWidthContainer } from './styled-components';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getArticlesHome } from '../../redux/reducers/appState';
import ArticleEmbedView from '../../components/CreateArticle/ShareArticle/ArticleEmbedView';
import { useParams } from 'react-router-dom';
import Loader from '../../components/UI/Loader';

export default function SearchResults() {
  const { articles } = useSelector((store) => store.app);
  const { searchValue, locationValue, categoryValue, keywordsSelected, loading, error } = useSelector(
    (store) => store.topbarSearch
  );
  const dispatch = useDispatch();
  const {} = useParams();
  useEffect(() => {
    dispatch(getArticlesHome());
  }, [searchValue, locationValue, categoryValue, keywordsSelected.length]);
  return (
    <ThemeProvider theme={{ isDark: false }}>
      <StyledView>
        <MaxWidthContainer>
          {articles?.length > 0 ? (
            articles.map((a, index) => <ArticleEmbedView key={index} {...a} />)
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
    </ThemeProvider>
  );
}
