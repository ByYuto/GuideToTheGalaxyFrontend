import React, { useState } from 'react';
import CreateArticleHeader from '../../components/CreateArticle/CreateArticleHeader';
import View from '../../components/View';
import styled, { ThemeProvider } from 'styled-components';
import CategorySelector from '../../components/CreateArticle/CategorySelector';
import useHiddenTopbar from '../../hooks/useHiddenTopbar';
import CreateArticleFooter from '../../components/CreateArticle/CreateArticleFooter';
import CreateArticleTooltip from '../../components/CreateArticle/CreateArticleTooltip';

const categories = [
  { id: "equipment", title: "Equipment", description: "The equipment you use in the street, plus books, surveys, polls, placemaking, guides..." },
  { id: "legal", title: "Legal", description: "Legislation, laws, rules, arrests and everything political. Help others (or ask for help) here." },
  { id: "museum", title: "Museum", description: "Festivals, organisations, services, lawyers, videographers, and anyone else who works with buskers." },
  { id: "supporting_orgs", title: "Supporting Orgs", description: "Buskers in TV/movies/fine art, busking historical events, ex-busking celebrities, busker hall-of-famers etc." },
  { id: "general", title: "General", description: "Have something that doesn’t fit elsewhere? Want to start a debate? Post it here." }
]

const StyledContent = styled.div``;

const StyledCategorySelectorTooltip = styled(CreateArticleTooltip)`
left: calc(100% + 12px);
top: 0;
`;

const StyledArticleHeaderContainer = styled.div`
position: relative;
max-width: 1000px;
`
const StyledView = styled(View)`
  height: 100%;
  justify-content: start;

  & > * {
    flex: 0;
  }
  
  ${StyledContent} {
    flex-grow: 1;
    background: ${props => props.theme.baseColors.dark};
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
        <StyledArticleHeaderContainer>
          <CategorySelector categories={categories} value={category} onChange={onCategoryChange} />
          <StyledCategorySelectorTooltip>Select a category for your post!</StyledCategorySelectorTooltip>
        </StyledArticleHeaderContainer>
      </CreateArticleHeader>
      <StyledContent>
        content goes here
      </StyledContent>
      <CreateArticleFooter />
    </StyledView>
  </ThemeProvider>
}

export default CreateArticle;