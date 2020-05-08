import React, { useState } from 'react';
import CreateArticleHeader from '../../components/CreateArticle/CreateArticleHeader';
import View from '../../components/View';
import styled, { ThemeProvider } from 'styled-components';
import CategorySelector from '../../components/CreateArticle/CategorySelector';
import useHiddenTopbar from '../../hooks/useHiddenTopbar';
import CreateArticleFooter from '../../components/CreateArticle/CreateArticleFooter';
import CreateArticleTooltip from '../../components/CreateArticle/CreateArticleTooltip';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNewArticle } from '../../redux/reducers/newArticleState';
import ContentTypeSelector from '../../components/CreateArticle/ContentTypeSelector';


const categories = [
  { id: "equipment", title: "Equipment", description: "The equipment you use in the street, plus books, surveys, polls, placemaking, guides..." },
  { id: "legal", title: "Legal", description: "Legislation, laws, rules, arrests and everything political. Help others (or ask for help) here." },
  { id: "museum", title: "Museum", description: "Festivals, organisations, services, lawyers, videographers, and anyone else who works with buskers." },
  { id: "supporting_orgs", title: "Supporting Orgs", description: "Buskers in TV/movies/fine art, busking historical events, ex-busking celebrities, busker hall-of-famers etc." },
  { id: "general", title: "General", description: "Have something that doesn’t fit elsewhere? Want to start a debate? Post it here." }
];

const contentTypes = {
  equipment: ["microphone", "loop_pedal", "amps", "cashless", "guitar", "case", "other_subcategory1", "other_subcategory2", "other_subcategory3", "other_subcategory4"],
  legal: ["abogados", "pleitos", "demandas"],
  museum: [],
  supporting_orgs: [],
  general: [],
}

const StyledContent = styled.div``;

const StyledCategorySelectorTooltip = styled(CreateArticleTooltip)`
  left: calc(100% + 12px);
  top: 0;
`;

const StyledCategorySelectorContainer = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
`
const StyledContentTypeSelectorContainer = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
`

const MaxWidthContainer = styled.div`
  max-width: 1016px;
  width: 100%;
  margin: auto;
`

const StyledView = styled(View)`
  height: 100%;
  justify-content: start;
  & > * {
    flex: 0;
  }
  
  ${MaxWidthContainer} {
    flex-grow: 1;
    background: ${props => props.theme.baseColors.dark};
  }
`;

const CreateArticle = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const newArticle = useSelector(state => state.newArticle);

  //TestCode
  newArticle.categoryId = "equipment";
  console.log("new article", newArticle);

  useHiddenTopbar(); //hideTopbar

  const onCategoryChange = category => {
    dispatch(updateNewArticle({ categoryId: category }));
  }
  const onContentTypeChange = contentType => {
    dispatch(updateNewArticle({ contentTypeId: contentType }));
  }

  const onExitClick = () => {
    history.push("/");
  }

  return <ThemeProvider theme={{ isDark: true }}>
    <StyledView>
      <MaxWidthContainer>
        <CreateArticleHeader>
          <StyledCategorySelectorContainer>
            <CategorySelector categories={categories} value={newArticle.categoryId} onChange={onCategoryChange} showDescriptions={newArticle.categoryId === null} />
            {!newArticle.categoryId ? <StyledCategorySelectorTooltip>Select a category for your post!</StyledCategorySelectorTooltip> : null}
          </StyledCategorySelectorContainer>
          <StyledContentTypeSelectorContainer>
            {newArticle.categoryId ? <ContentTypeSelector contentTypes={contentTypes[newArticle.categoryId]} value={newArticle.contentTypeId} onChange={onContentTypeChange} /> : null}
          </StyledContentTypeSelectorContainer>
        </CreateArticleHeader>
        <StyledContent>
          content goes here
      </StyledContent>
      </MaxWidthContainer>
      <CreateArticleFooter onExitClick={onExitClick} />
    </StyledView>
  </ThemeProvider>
}

export default CreateArticle;
