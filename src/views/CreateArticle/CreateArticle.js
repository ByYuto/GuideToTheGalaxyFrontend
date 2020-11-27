import React, { useState, useEffect, useRef } from 'react';
import CreateArticleHeader from '../../components/CreateArticle/CreateArticleHeader';
import { ThemeProvider } from 'styled-components';
import CategorySelector from '../../components/CreateArticle/CategorySelector';
import useHiddenTopbar from '../../hooks/useHiddenTopbar';
import CreateArticleFooter from '../../components/CreateArticle/CreateArticleFooter';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNewArticle,
  setNewArticleStep,
  clearArticleData,
  saveArticle,
  successSavedArticle,
  errorArticle,
} from '../../redux/reducers/newArticleState';
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
import Modal from '../../components/UI/modal/Modal';
import { useModal } from '../../components/UI/modal/useModal';
import { getContentType, setArticleContent } from './helpers';
import Notice from '../../components/UI/notice/Notice';
import KeywordSelector from '../../components/CreateArticle/keywords/KeywordSelector';
import {convertToRaw} from 'draft-js';


const categoriesSelector = (state) => state.app.categories;
const getContentTypes = (categories, selectedCategory) => {
  return categories.find((category) => category.name === selectedCategory).contentTypes;
};
const hasFieldsErrors = (articleValidations) => {
  const fields = Object.values(articleValidations);

  return fields.reduce((acc, curr) => {
    if (!curr.valid && !acc) {
      return true;
    } else {
      return acc;
    }
  }, false);
}
const CreateArticle = () => {
  const modal = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const refHeaderContainer = useRef(null);
  const refContentContainer = useRef(null);
  const refParentContainer = useRef(null);
  const [contentHeight, setContentHeight] = useState(100);
  const { newArticle, step, articleValidations, error, errorMessage, success, loading } = useSelector(
    (state) => state.newArticle
  );
  const [customContent, setCustomContent] = useState(null);
  const categories = useSelector(categoriesSelector);
  const contentTypesAvailableForSelectedCategory =
    categories && newArticle.categoryId ? getContentTypes(categories, newArticle.categoryId) : null;
  useHiddenTopbar(); //hideTopbar
  const rawContent = convertToRaw(newArticle.content.getCurrentContent());
  
  useEffect(()=> {

    resizeLayer();
  window.addEventListener('resize', () => resizeLayer());

  return () => {
    window.removeEventListener('resize', () => resizeLayer());
  };
}, [newArticle.contentTypeId, contentHeight, newArticle]);

const resizeLayer = () => {
  if(refContentContainer &&
    refContentContainer.current &&
    refHeaderContainer &&
    refHeaderContainer.current &&
    refParentContainer &&
    refParentContainer.current) {
  
  const refContentSize = refParentContainer.current.offsetHeight - refHeaderContainer.current.offsetHeight;
  const newSize = window.innerHeight < 723 ? refContentSize + 60 : refContentSize;
  setContentHeight(newSize);
  }
};

  useEffect(() => {     
   
     if(rawContent && (rawContent?.blocks[0]?.text !== "" || rawContent?.blocks?.length > 1)){
      dispatch(updateNewArticle({ validStep3: true }));
    } else {
      dispatch(updateNewArticle({ validStep3: false }));
    }    
  }, [dispatch,   JSON.stringify(rawContent)]);

  useEffect(() => {
    const hasArticleDataError = hasFieldsErrors(articleValidations);
    dispatch(updateNewArticle({ validStep2: !hasArticleDataError && newArticle.contentTypeId }));
  }, [articleValidations, newArticle.contentTypeId, hasFieldsErrors, dispatch]);  

  useEffect(()=> {
      dispatch(getCategories());
  }, [])



  const onCategoryChange = (category) => {
    dispatch(updateNewArticle({ categoryId: category, contentTypeId: null, validStep1: false }));
    dispatch(setNewArticleStep(1));
  };
  const onContentTypeChange = (contentType) => {
    dispatch(updateNewArticle({ contentTypeId: contentType, validStep1: true, articleValidations: {} }));
    dispatch(setNewArticleStep(2));
  };

  const onExitClick = () => {
    dispatch(clearArticleData());
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

  const onPublishArticle = () => {
    if (newArticle.validStep1 && newArticle.validStep2 && newArticle.validStep3) {
      const contentType = getContentType(categories, newArticle.categoryId, newArticle.contentTypeId);
      const article = setArticleContent(newArticle, contentType, categories);
      dispatch(saveArticle(article));
    } else {
      return;
    }
  };
  return (
    <ThemeProvider theme={{ isDark: true }}>
      {success && (
        <Notice
          duration={2000}
          type="success"
          text="Your article has been Published"
          callBack={() => {
            dispatch(clearArticleData());
            history.push(`/article/${success}`);
            dispatch(successSavedArticle(false));
          }}
        />
      )}
      {error && (
        <Notice
          duration={4000}
          type="error"
          text={errorMessage}
          callBack={() => dispatch(errorArticle({ error: false, errorType: '' }))}
        />
      )}
      {loading && <Notice duration={0} type="info" text="Saving post..." />}
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
              <div height={contentHeight}>
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
                />
              ) : null}
            </StyledViewContent>
          </ThemeProvider>
          <StyledViewContent>
            {step >= 4 ? (
              <MaxWidthContainer>
                <KeywordSelector />
              </MaxWidthContainer>
            ) : null}
          </StyledViewContent>
        </StyledView>
        <div style={{ zIndex: 50 }}>
          <ThemeProvider theme={{ isDark: step !== 3 }}>
            <StyledViewContent>
              <div
                style={{
                  backgroundColor: !newArticle.validStep1 ? 'rgba(21, 21, 49, 0.7)' : 'transparent',
                }}
              >
                <Stepper step={step} />
              </div>
            </StyledViewContent>
          </ThemeProvider>
          <CreateArticleFooter
            exitDisabled={false}
            onExitClick={step > 1 && arePersistingContent() ? modal.handleClick : onExitClick}
            nextDisabled={!newArticle.validStep2}
            nexDisabledStep2={newArticle.validStep2 && !newArticle.validStep3}
            showNextStep2={step === 3}
            showNextStep1={step < 3}
            onNextClick={onNextClick}
            publish={step > 3 && newArticle.validStep1 && newArticle.validStep2}
            publishDisabled={!newArticle.validStep3}
            onPublish={onPublishArticle}
          />
        </div>
      </CreateArticleContainerLayout>
      <Modal
        title="Exit Page"
        setVisibility={modal.handleClick}
        visible={modal.visible}
        elmHeight="auto"
        elmWidth="496px"
        textOk="Leave"
        okClick={onExitClick}
        header={undefined}
      >
        <p style={{ textAlign: 'center', marginTop: "16px" }}>
          Are you sure you want to exit this page?
          <br /> You’ll lose all your progress
        </p>
      </Modal>
    </ThemeProvider>
  );
};

export default CreateArticle;
