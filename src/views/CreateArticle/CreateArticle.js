import React, { useState, useEffect } from 'react';
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
  StyledViewContent,
  MaxWidthContainer,
  StyledCategorySelectorContainer,
  StyledCategorySelectorTooltip,
  StyledContentTypeSelectorContainer,
} from './StyledComponents';
import { toast } from 'react-toastify';
import ArticleData from '../../components/CreateArticle/ArticleData';
import { getCategories } from '../../redux/reducers/appState';
import Stepper from '../../components/UI/Stepper';
import ArticleContent from '../../components/CreateArticle/ArticleContent';
import Divider from '../../components/UI/Divider';
import Layer from '../../components/UI/Layer';

/*
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
*/

/*
const contentTypes = {
  equipment: [
    'MICROPHONE',
    'LOOP PEDALS',
    'AMPS',
    'CASHLESS',
    'GUITAR',
    'CASE',
    'OTHER SUBCATEGORY',
    'OTHER SUBCATEGORY2',
    'OTHER SUBCATEGORY3',
    'OTHER SUBCATEGORY4',
  ],
  legal: ['ABOGADOS', 'PLEITOS', 'DEMANDAS'],
  museum: [],
  supporting_orgs: [],
  general: [],
};
*/

const nextDisabledSelector = (state) => {
  const { newArticle, step } = state.newArticle;
  if (step === 1) {
    return !newArticle.categoryId || !newArticle.contentTypeId;
  } else {
  }
};

const categoriesSelector = (state) => state.app.categories;
const getContentTypes = (categories, selectedCategory) => {
  return categories.find((category) => category.name === selectedCategory).contentTypes;
};
const CreateArticle = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { newArticle, step } = useSelector((state) => state.newArticle);
  const [customContent, setCustomContent] = useState(null);
  const nextDisabled = useSelector(nextDisabledSelector);
  const categories = useSelector(categoriesSelector);
  const contentTypesAvailableForSelectedCategory =
    categories && newArticle.categoryId ? getContentTypes(categories, newArticle.categoryId) : null;
  useHiddenTopbar(); //hideTopbar

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onCategoryChange = (category) => {
    dispatch(updateNewArticle({ categoryId: category, validStep1: false }));
  };
  const onContentTypeChange = (contentType) => {
    dispatch(updateNewArticle({ contentTypeId: contentType, validStep1: true }));
    dispatch(setNewArticleStep(2));
  };

  const onExitClick = () => {
    history.push('/');
  };

  const onNextClick = () => {
    dispatch(setNewArticleStep(step + 1));
    //toast('Ahora estamos en la segunda pantalla!');
  };

  const onCustomContentBlur = (value) => {
    if (customContent === value) {
      return;
    }

    console.log('ESTE ES', { contentTypesAvailableForSelectedCategory, value });
    if (
      contentTypesAvailableForSelectedCategory &&
      contentTypesAvailableForSelectedCategory.find((cat) => cat.name === value)
    ) {
      //Content type already exists
      toast(`content type ${value} already added`);
    }
    if (!customContent) {
      toast(`Content type added: ${value}`);
    } else if (value) {
      toast(`Content type edited: ${value}`);
    }
    setCustomContent(value);
  };

  const onChangeArticle = (article) => {
    //console.log('Dispatching new article with', article);
    dispatch(updateNewArticle(article));
  };

  const arePersistingContent = () => newArticle.title || newArticle.location || newArticle.link || newArticle.photo;
  return (
    <ThemeProvider theme={{ isDark: true }}>
      <StyledView>
        {categories ? (
          <React.Fragment>
            <CreateArticleHeader>
              <MaxWidthContainer>
                <StyledCategorySelectorContainer>
                  <CategorySelector
                    categories={categories}
                    value={newArticle.categoryId}
                    onChange={onCategoryChange}
                    showDescriptions={newArticle.categoryId === null}
                  />
                  {!newArticle.categoryId ? (
                    <StyledCategorySelectorTooltip>Select a category for your post!</StyledCategorySelectorTooltip>
                  ) : null}
                </StyledCategorySelectorContainer>
              </MaxWidthContainer>
              <MaxWidthContainer>
                <StyledContentTypeSelectorContainer>
                  {newArticle.categoryId ? (
                    <div style={{ height: '50px', overflow: 'hidden', width: '100%' }}>
                      {contentTypesAvailableForSelectedCategory ? (
                        <ContentTypeSelector
                          contentTypes={contentTypesAvailableForSelectedCategory}
                          value={newArticle.contentTypeId}
                          onChange={onContentTypeChange}
                          onCustomContentBlur={onCustomContentBlur}
                        />
                      ) : (
                        <p>No content types defined for this category</p>
                      )}
                      {step === 1 ? (
                        <StyledCategorySelectorTooltip>
                          Select a Content Type for your post to help other users find it, and for them to quickly
                          identify what kind of content it is.
                        </StyledCategorySelectorTooltip>
                      ) : null}
                    </div>
                  ) : null}
                </StyledContentTypeSelectorContainer>
              </MaxWidthContainer>
            </CreateArticleHeader>
            {arePersistingContent() || newArticle.validStep1 ? (
              <div style={{ position: 'relative' }}>
                {!newArticle.validStep1 && <Layer className="layer-blocker" />}
                <Divider className="create-article-divider" />
                <MaxWidthContainer>
                  <ArticleData article={newArticle} onChange={onChangeArticle} showImage={true} />
                </MaxWidthContainer>
              </div>
            ) : null}
          </React.Fragment>
        ) : (
          <p>Loading...</p>
        )}
        <div style={{ zIndex: 3 }}>
          <ThemeProvider theme={{ isDark: step <= 2 }}>
            <StyledViewContent>
              {step >= 3 && categories ? (
                <ArticleContent
                  article={newArticle}
                  onChangeArticle={onChangeArticle}
                  //onKeyDown={(a, b) => console.log('PASO POR AQUI', a, b)}
                />
              ) : null}
              <Stepper step={step} />
            </StyledViewContent>
          </ThemeProvider>

          <CreateArticleFooter
            exitDisabled={false}
            onExitClick={onExitClick}
            nextDisabled={nextDisabled}
            onNextClick={onNextClick}
          />
        </div>
      </StyledView>
    </ThemeProvider>
  );
};

export default CreateArticle;
