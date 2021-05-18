import React from 'react';
import { Ellipse } from '../../assets/icons/svg-icons';
import {
  ContributionDate,
  ContributionArticleLocation,
  ContributionArticleTitle,
  ContributionText,
  ContributionContainer,
} from './styled-components';
const Contribution = (contribution) => {
  return (
    <ContributionContainer>
      <ContributionDate>June 14, 2019</ContributionDate>
      <ContributionArticleLocation>
        Category <Ellipse /> Subcategory <Ellipse /> Location
      </ContributionArticleLocation>
      <ContributionArticleTitle>An honest review of the 10+ Amps for busking</ContributionArticleTitle>
      <ContributionText>
        Choosing the right amp for your act can be intimidating for a new street performer and still pretty confusing...
      </ContributionText>
    </ContributionContainer>
  );
};

export default Contribution;
