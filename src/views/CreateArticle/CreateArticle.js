import React from 'react';
import CreateArticleHeader from '../../components/CreateArticle/CreateArticleHeader';
import { ThemeProvider } from 'styled-components';
import CategorySelector from '../../components/CreateArticle/CategorySelector';
import useHiddenTopbar from '../../hooks/useHiddenTopbar';
import CreateArticleFooter from '../../components/CreateArticle/CreateArticleFooter';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNewArticle, setNewArticleStep } from '../../redux/reducers/newArticleState';
import ContentTypeSelector from '../../components/CreateArticle/ContentTypeSelector';
import {
  StyledView,
  MaxWidthContainer,
  StyledCategorySelectorContainer,
  StyledCategorySelectorTooltip,
  StyledContentTypeSelectorContainer,
  StyledContent,
} from './StyledComponents';
//import { toast } from 'react-toastify';

const categories = [
  {
    id: 'equipment',
    title: 'Equipment',
    description: 'The equipment you use in the street, plus books, surveys, polls, placemaking, guides...',
  },
  {
    id: 'legal',
    title: 'Legal',
    description: 'Legislation, laws, rules, arrests and everything political. Help others (or ask for help) here.',
  },
  {
    id: 'museum',
    title: 'Museum',
    description: 'Festivals, organisations, services, lawyers, videographers, and anyone else who works with buskers.',
  },
  {
    id: 'supporting_orgs',
    title: 'Supporting Orgs',
    description:
      'Buskers in TV/movies/fine art, busking historical events, ex-busking celebrities, busker hall-of-famers etc.',
  },
  {
    id: 'general',
    title: 'General',
    description: 'Have something that doesn’t fit elsewhere? Want to start a debate? Post it here.',
  },
];

const contentTypes = {
  equipment: [
    'microphone',
    'loop_pedal',
    'amps',
    'cashless',
    'guitar',
    'case',
    'other_subcategory1',
    'other_subcategory2',
    'other_subcategory3',
    'other_subcategory4',
  ],
  legal: ['abogados', 'pleitos', 'demandas'],
  museum: [],
  supporting_orgs: [],
  general: [],
};

const nextDisabledSelector = (state) => {
  const { newArticle, step } = state.newArticle;
  if (step === 1) {
    return !newArticle.categoryId || !newArticle.contentTypeId;
  } else {
  }
};

const CreateArticle = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { newArticle, step } = useSelector((state) => state.newArticle);
  const nextDisabled = useSelector(nextDisabledSelector);
  console.log({ step, newArticle });
  useHiddenTopbar(); //hideTopbar

  const onCategoryChange = (category) => {
    dispatch(updateNewArticle({ categoryId: category, contentTypeId: null }));
  };
  const onContentTypeChange = (contentType) => {
    dispatch(updateNewArticle({ contentTypeId: contentType }));
  };

  const onExitClick = () => {
    history.push('/');
  };

  const onNextClick = () => {
    dispatch(setNewArticleStep(step + 1));
    //toast('Ahora estamos en la segunda pantalla!');
  };

  return (
    <ThemeProvider theme={{ isDark: true }}>
      <StyledView>
        <MaxWidthContainer>
          <CreateArticleHeader>
            <StyledCategorySelectorContainer>
              <CategorySelector
                categories={categories}
                value={newArticle.categoryId}
                onChange={onCategoryChange}
                showDescriptions={newArticle.categoryId === null}
                readOnly={step !== 1}
              />
              {!newArticle.categoryId ? (
                <StyledCategorySelectorTooltip>Select a category for your post!</StyledCategorySelectorTooltip>
              ) : null}
            </StyledCategorySelectorContainer>
            <StyledContentTypeSelectorContainer>
              {newArticle.categoryId ? (
                <React.Fragment>
                  <ContentTypeSelector
                    contentTypes={contentTypes[newArticle.categoryId]}
                    value={newArticle.contentTypeId}
                    onChange={onContentTypeChange}
                    readOnly={step !== 1}
                  />
                  {step === 1 ? (
                    <StyledCategorySelectorTooltip>
                      Select a Content Type for your post to help other users find it, and for them to quickly identify
                      what kind of content it is.
                    </StyledCategorySelectorTooltip>
                  ) : null}
                </React.Fragment>
              ) : null}
            </StyledContentTypeSelectorContainer>
          </CreateArticleHeader>
          <StyledContent>content goes here</StyledContent>
        </MaxWidthContainer>
        <CreateArticleFooter
          exitDisabled={false}
          onExitClick={onExitClick}
          nextDisabled={nextDisabled}
          onNextClick={onNextClick}
        />
      </StyledView>
    </ThemeProvider>
  );
};

export default CreateArticle;
