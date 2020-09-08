import React, { useState, useEffect, useRef } from 'react';
import CreateArticleHeader from '../../components/CreateArticle/CreateArticleHeader';
import { ThemeProvider } from 'styled-components';
import CategorySelector from '../../components/CreateArticle/CategorySelector';
import useHiddenTopbar from '../../hooks/useHiddenTopbar';
import CreateArticleFooter from '../../components/CreateArticle/CreateArticleFooter';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNewArticle, setNewArticleStep, makeFormDraft } from '../../redux/reducers/newArticleState';
import ContentTypeSelector from '../../components/CreateArticle/ContentTypeSelector';
import {
  StyledView,
  StyledViewContent,
  MaxWidthContainer,
  StyledCategorySelectorContainer,
  StyledCategorySelectorTooltip,
  StyledContentTypeSelectorContainer,
  CreateArticleContainerLayout,
} from './StyledComponents';
import { toast } from 'react-toastify';
import ArticleData from '../../components/CreateArticle/ArticleData';
import { getCategories } from '../../redux/reducers/appState';
import Stepper from '../../components/UI/Stepper';
import ArticleContent from '../../components/CreateArticle/ArticleContent';
import Divider from '../../components/UI/Divider';
import Layer from '../../components/UI/Layer';

const nextDisabledSelector = (state) => {
  const { newArticle, step } = state.newArticle;
  if (step === 1) {
    return !newArticle.validStep1;
  } else if (step === 2) {
    return !newArticle.validStep2;
  } else if (step === 3) {
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
  const refHeaderContainer = useRef(null);
  const refContentContainer = useRef(null);
  const refParentContainer = useRef(null);
  const [contentHeight, setContentHeight] = useState(100);
  const { newArticle, step, articleValidations } = useSelector((state) => state.newArticle);
  const [customContent, setCustomContent] = useState(null);
  const nextDisabled = useSelector(nextDisabledSelector);
  const categories = useSelector(categoriesSelector);
  const contentTypesAvailableForSelectedCategory =
    categories && newArticle.categoryId ? getContentTypes(categories, newArticle.categoryId) : null;
  useHiddenTopbar(); //hideTopbar
  const fields = Object.keys(articleValidations);
  let fieldsInvalids = false;
  for (const prop in articleValidations) {
    if (!articleValidations[prop].valid) {
      fieldsInvalids = true;
    }
  }
  useEffect(() => {
    dispatch(getCategories());

    if (fields.length > 0) {
      dispatch(updateNewArticle({ validStep2: !fieldsInvalids }));
    }

    if (
      refContentContainer &&
      refContentContainer.current &&
      refHeaderContainer &&
      refHeaderContainer.current &&
      refParentContainer &&
      refParentContainer.current
    ) {
      const refContentSize = refParentContainer.current.offsetHeight - refHeaderContainer.current.offsetHeight;
      const newSize = window.innerHeight < 723 ? refContentSize + 30 : refContentSize;
      setContentHeight(newSize);
    }
  }, [dispatch, articleValidations, newArticle.validStep2]);

  const onCategoryChange = (category) => {
    dispatch(updateNewArticle({ categoryId: category, contentTypeId: null, validStep1: false }));
    dispatch(setNewArticleStep(1));
  };
  const onContentTypeChange = (contentType) => {
    dispatch(updateNewArticle({ contentTypeId: contentType, validStep1: true, articleValidations: {} }));
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
    if (customContent === value || value === 'New Content Type') {
      return;
    }

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
    dispatch(updateNewArticle({ ...article }));
    dispatch(setNewArticleStep(2));
  };

  const arePersistingContent = () => newArticle.title || newArticle.location || newArticle.link || newArticle.photo;
  return (
    <ThemeProvider theme={{ isDark: true }}>
      <CreateArticleContainerLayout>
        <StyledView className="article-body-container" ref={refParentContainer}>
          {categories ? (
            <React.Fragment>
              <CreateArticleHeader headerRef={refHeaderContainer}>
                <MaxWidthContainer>
                  <StyledCategorySelectorContainer>
                    <CategorySelector
                      categories={categories}
                      value={newArticle.categoryId}
                      onChange={onCategoryChange}
                      showDescriptions={step < 3}
                    />
                    {!newArticle.categoryId ? (
                      <StyledCategorySelectorTooltip className="category-tooltip">
                        Select a category for your post!
                      </StyledCategorySelectorTooltip>
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
              <div>
                {!newArticle.validStep1 && (
                  <Layer layerHeight={contentHeight} className="layer-blocker" ref={refContentContainer} />
                )}
                <Divider className="create-article-divider" />
                <MaxWidthContainer>
                  <ArticleData article={newArticle} onChange={onChangeArticle} showImage={true} />
                </MaxWidthContainer>
              </div>
            </React.Fragment>
          ) : (
            <p>Loading...</p>
          )}

          <ThemeProvider theme={{ isDark: step <= 2 }}>
            <StyledViewContent>
              {step >= 3 && categories ? (
                <ArticleContent
                  article={newArticle}
                  onChangeArticle={onChangeArticle}
                  //onKeyDown={(a, b) => console.log('PASO POR AQUI', a, b)}
                />
              ) : null}
            </StyledViewContent>
          </ThemeProvider>
        </StyledView>
        <div style={{ zIndex: 50 }}>
          <ThemeProvider theme={{ isDark: step <= 2 }}>
            <StyledViewContent>
              <div
                style={{
                  backgroundColor: !newArticle.validStep1 ? 'rgba(21, 21, 49, 0.7)' : '#1F1F3D',
                }}
              >
                <Stepper step={step} />
              </div>
            </StyledViewContent>
          </ThemeProvider>
          <CreateArticleFooter
            exitDisabled={false}
            onExitClick={onExitClick}
            nextDisabled={!newArticle.validStep2}
            onNextClick={onNextClick}
          />
        </div>
      </CreateArticleContainerLayout>
    </ThemeProvider>
  );
};

export default CreateArticle;
