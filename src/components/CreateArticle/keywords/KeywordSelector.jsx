import React from 'react';
import { KeywordSelectorLayout } from './styled-components';
import FlexContainer from '../../UI/FlexContainer';
import SearchKeywords from './SearchKeywords';
import { useSelector } from 'react-redux';
import Keyword from './Keyword';

export default function KeywordSelector() {
  const {
    newArticle: { keywords },
  } = useSelector((store) => store.newArticle);
  return (
    <KeywordSelectorLayout>
      <FlexContainer column elmWidth={'50%'} align="stretch" className="add-keyword-container">
        <h5>YOUR KEYWORDS</h5>
        <div>
          <SearchKeywords />
        </div>
        <FlexContainer breakRow>
          {keywords && keywords.length > 0 ? (
            keywords.map((k, index) => <Keyword key={index} name={k} tagType="primary" />)
          ) : (
            <div>No keyword selected yet...</div>
          )}
        </FlexContainer>
      </FlexContainer>
      <FlexContainer column elmWidth={'50%'} align="stretch" className="recommend-keyword-container">
        <h5>RECOMMENDED</h5>
        <FlexContainer breakRow>
          {keywords && keywords.length > 0 ? (
            keywords.map((k, index) => <Keyword key={index} name={k} tagType="secondary" readonlyTag />)
          ) : (
            <div>No keywords to recommend yet...</div>
          )}
        </FlexContainer>
      </FlexContainer>
    </KeywordSelectorLayout>
  );
}
