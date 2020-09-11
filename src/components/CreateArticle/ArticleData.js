import React, { useEffect } from 'react';
import Caption from '../UI/Caption';
import styled from 'styled-components';
import ArticleTemplate from './ArticleTemplate';
import UploadInput from '../UI/forms/UploadInput';
import { useSelector, useDispatch } from 'react-redux';
import { makeFormDraft, updateValidationTemplate } from '../../redux/reducers/newArticleState';
import PlaceholderImg from '../../assets/images/Rectangle.png';
import { generalTemplate } from '../../utils/constants';

const StyledArticleImage = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relativee;

  @media (max-width: 600px) {
    min-height: 360px;
    justify-content: space-around;
  }

  & .no-margin {
    margin-bottom: 0;
  }
`;
const StyledArticleFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 10px;
`;

const StyledArticleData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-top: 34px;
  /*border-top: 1px solid #151531;*/

  @media (max-width: 768px) {
    flex-direction: column;
  }

  ${Caption} {
    text-align: center;
  }

  ${StyledArticleFields} {
    flex-basis: 0;
    flex-grow: 7;
  }
  ${StyledArticleImage} {
    flex-basis: 0;
    flex-grow: 3;
  }
`;

const categoriesSelector = (state) => state.app.categories;
const getContentType = (categories, categoryId, contentTypeId) => {
  if (
    categoryId !== null &&
    categoryId !== '' &&
    categoryId !== undefined &&
    contentTypeId !== null &&
    contentTypeId !== '' &&
    contentTypeId !== undefined
  ) {
    const category = categories.find((category) => category.name === categoryId);
    const subCategory = category.contentTypes.find((contentType) => contentType.name === contentTypeId);
    return subCategory;
  } else {
    return generalTemplate;
  }
};

const ArticleData = ({ article, showImage, onChange, readOnly }) => {
  const categories = useSelector(categoriesSelector);
  const { draftForm, articleValidations } = useSelector((store) => store.newArticle);
  const dispatch = useDispatch();
  const content = getContentType(categories, article.categoryId, article.contentTypeId);
  const contentType = content ? content : draftForm[0];
  const formData = article ? article : draftForm[0].content;
  const changeWithDraft = (articleContent) => {
    const draftContent = { ...contentType, content: articleContent };
    dispatch(makeFormDraft(draftContent));
    onChange(articleContent);
  };

  useEffect(() => {
    const existTemplate = Object.keys(articleValidations);
    if (existTemplate.length <= 0) {
      const validationTemplate = {};
      for (const key in contentType) {
        if (key !== 'name' && key !== 'template') {
          if (contentType[key].required) {
            if (key === 'date') {
              validationTemplate[key] = { valid: true, errorType: '' };
            } else {
              validationTemplate[key] = { valid: false, errorType: '' };
            }
          }
        }
      }
      dispatch(updateValidationTemplate({ ...validationTemplate, ...articleValidations }));
    }
  }, [articleValidations]);

  return (
    <StyledArticleData>
      <StyledArticleFields>
        <Caption bold>KEY INFO</Caption>
        <ArticleTemplate contentType={contentType} article={formData} onChange={changeWithDraft} readOnly={readOnly} />
      </StyledArticleFields>
      <StyledArticleImage>
        {contentType?.image && (
          <React.Fragment>
            <Caption bold className="no-margin">
              FEATURE PHOTO
            </Caption>
            <UploadInput
              contentType={contentType}
              onChange={changeWithDraft}
              srcImg={formData.photo?.url || PlaceholderImg}
              readOnly={readOnly}
            />
          </React.Fragment>
        )}
      </StyledArticleImage>
    </StyledArticleData>
  );
};

export default ArticleData;
