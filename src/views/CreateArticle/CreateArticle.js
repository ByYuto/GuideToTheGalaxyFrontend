import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeAppTopbarDisplay } from '../../redux/reducers/app';
import CreateArticleHeader from '../../components/CreateArticle/CreateArticleHeader';
import View from '../../components/View';
import styled, { ThemeProvider } from 'styled-components';
import CategorySelector from '../../components/CreateArticle/CategorySelector';
import useHiddenTopbar from '../../hooks/useHiddenTopbar';
import CreateArticleFooter from '../../components/CreateArticle/CreateArticleFooter';

const categories = [
  { id: "equipment", title: "Equipment", description: "The stuff you use in the street" },
  { id: "legal", title: "Legal", description: "Legislation, laws, rules, arrests etc" },
  { id: "museum", title: "Museum", description: "Memorable references to Buskers in the media" },
  { id: "supporting_orgs", title: "Supporting Orgs", description: "Other people who like to help buskers out" },
  { id: "general", title: "General", description: "Doesn’t fit in the other categories?" }
]

const StyledContent = styled.div``;

const StyledView = styled(View)`
  height: 100%;
  justify-content: start;

  & > * {
    flex: 0;
  }
  
  ${StyledContent} {
    flex-grow: 1;
  }
`;


const CreateArticle = () => {
  const [category, setCategory] = useState(null);
  useHiddenTopbar(); //hideTopbar

  const onCategoryChange = category => {
    setCategory(category);
  }
  return <ThemeProvider theme={{ isDark: true }}>
    <StyledView>
      <CreateArticleHeader>
        <CategorySelector categories={categories} value={category} onChange={onCategoryChange} />
      </CreateArticleHeader>
      <StyledContent>
        content goes here
      </StyledContent>
      <CreateArticleFooter />
    </StyledView>
  </ThemeProvider>
}

export default CreateArticle;