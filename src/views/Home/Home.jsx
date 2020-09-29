import React, { useEffect } from 'react';
import { StyledView, MaxWidthContainer } from './styled-components';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getArticlesHome } from '../../redux/reducers/appState';
import ArticleEmbedView from '../../components/CreateArticle/ShareArticle/ArticleEmbedView';

export default function Home() {
  const { articles } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  useEffect(() => {
    if (articles.length < 1) {
      dispatch(getArticlesHome());
    }
  }, []);
  return (
    <ThemeProvider theme={{ isDark: false }}>
      <StyledView>
        <MaxWidthContainer>
          {articles?.length > 0 && articles.map((a, index) => <ArticleEmbedView key={index} {...a} />)}
        </MaxWidthContainer>
      </StyledView>
    </ThemeProvider>
  );
}
