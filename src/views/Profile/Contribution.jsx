import moment from 'moment';
import React from 'react';
import { mockComponent } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';
import { Ellipse } from '../../assets/icons/svg-icons';
import {
  ContributionDate,
  ContributionArticleLocation,
  ContributionArticleTitle,
  ContributionText,
  ContributionContainer,
} from './styled-components';
const Contribution = ({
  type,
  created_at,
  article: { title, textContent, categoryId, contentTypeId, location, slug },
  comment,
}) => {
  created_at = moment(created_at);
  return (
    <ContributionContainer>
      {created_at.isValid() ? <ContributionDate>{created_at.format('MMM DD, YYYY')}</ContributionDate> : null}
      {type === 'CREATE_ARTICLE' ? (
        <>
          <ContributionArticleLocation>
            {categoryId}
            <Ellipse /> {contentTypeId} <Ellipse /> {location?.locality || 'Worldwide'}
          </ContributionArticleLocation>

          <ContributionArticleTitle>{title}</ContributionArticleTitle>
          <ContributionText>{textContent}</ContributionText>
        </>
      ) : null}
      {type === 'COMMENT_ARTICLE' ? (
        <>
          <ContributionText>
            Commented on <Link to={`/${categoryId.toLowerCase()}/${slug}`}>{title}</Link>
          </ContributionText>
          <ContributionText>{comment?.comment}</ContributionText>
        </>
      ) : null}
    </ContributionContainer>
  );
};

export default Contribution;
