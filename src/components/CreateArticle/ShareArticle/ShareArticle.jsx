import React from 'react';
import { ShareArticleLayout } from './styled-components';
import SearchBar from '../../UI/search-bar/SearchBar';
import FlexContainer from '../../UI/FlexContainer';
import ShareArticleCard from './ShareArticleCard';

export default function ShareArticle() {
  return (
    <ShareArticleLayout>
      <SearchBar />
      <FlexContainer className="articles-container">
        <ShareArticleCard />
        <ShareArticleCard />
        <ShareArticleCard />
        <ShareArticleCard />
      </FlexContainer>
    </ShareArticleLayout>
  );
}
