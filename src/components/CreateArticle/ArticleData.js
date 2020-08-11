import React from 'react';
import Caption from '../UI/Caption';
import styled from 'styled-components';
import ArticleTemplate from './ArticleTemplate';
import UploadInput from '../UI/forms/UploadInput';
import { useSelector, useDispatch } from 'react-redux';
import { makeFormDraft } from '../../redux/reducers/newArticleState';

const StyledArticleImage = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  if (contentTypeId === 'New Content Type') {
    return {
      name: 'New Content Type',
      template: 'GENERAL',
      title: {
        placeholder: 'Article title',
        required: true,
        tooltip: 'Article title',
      },
      URL: {
        placeholder: 'Put in a URL to help us verify this post',
        required: true,
        tooltip: 'Put in a URL to help us verify this post',
      },
      location: {
        placeholder: 'Where did they used to busk?',
        required: false,
        tooltip: 'Place a location (optional)',
      },
      date: {
        placeholder: 'Passed date',
        required: false,
        tooltip: 'A tooltip',
      },
      image: {
        placeholder: 'Choose an Image',
        required: false,
        tooltip: 'A tooltip',
      },
    };
  } else {
    const category = categories.find((category) => category.name === categoryId);
    return category.contentTypes.find((contentType) => contentType.name === contentTypeId);
  }
};

const ArticleData = ({ article, showImage, onChange }) => {
  const categories = useSelector(categoriesSelector);
  const { draftForm } = useSelector((store) => store.newArticle);
  const dispatch = useDispatch();
  const content = getContentType(categories, article.categoryId, article.contentTypeId);
  const contentType = content ? content : draftForm[0];
  const formData = article ? article : draftForm[0].content;
  const changeWithDraft = (articleContent) => {
    const draftContent = { ...contentType, content: articleContent };
    dispatch(makeFormDraft(draftContent));
    onChange(articleContent);
  };
  return (
    <StyledArticleData>
      <StyledArticleFields>
        <Caption>KEY INFO</Caption>
        <ArticleTemplate contentType={contentType} article={formData} onChange={changeWithDraft} />
      </StyledArticleFields>
      <StyledArticleImage>
        {contentType?.image && (
          <React.Fragment>
            <Caption className="no-margin">FEATURE PHOTO</Caption>
            <UploadInput contentType={contentType} onChange={changeWithDraft} />
          </React.Fragment>
        )}
      </StyledArticleImage>
    </StyledArticleData>
  );
};

export default ArticleData;
