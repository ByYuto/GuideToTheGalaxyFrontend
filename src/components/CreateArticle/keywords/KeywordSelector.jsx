import React, { useEffect } from 'react';
import { KeywordSelectorLayout } from './styled-components';
import FlexContainer from '../../UI/FlexContainer';
import SearchKeywords from './SearchKeywords';
import { useSelector, useDispatch } from 'react-redux';
import Keyword from './Keyword';
import { setKeyword } from '../../../redux/reducers/newArticleState';
import { getRecommendedKeywords } from '../../../redux/reducers/keywords';
import { getCatId } from '../../../utils/utils';

export default function KeywordSelector() {
  const {
    newArticle: { keywords, categoryId, contentTypeId },
  } = useSelector((store) => store.newArticle);
  const { recommendedKeywords } = useSelector((store) => store.keywords);
  const { categories } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  useEffect(() => {
    const catId = getCatId(categories, categoryId);
    dispatch(getRecommendedKeywords(catId, contentTypeId));
  }, []);
  return (
    <KeywordSelectorLayout>
      <FlexContainer column elmWidth={'50%'} align="stretch" className="add-keyword-container">
        <h5>YOUR KEYWORDS</h5>
        <div>
          <SearchKeywords />
        </div>
        <FlexContainer breakRow="wrap">
          {keywords && keywords.length > 0 ? (
            keywords.map((k, index) => <Keyword key={index} name={k} tagType="primary" />)
          ) : (
            <div>No keyword selected yet...</div>
          )}
        </FlexContainer>
      </FlexContainer>
      <FlexContainer column elmWidth={'50%'} align="stretch" className="recommend-keyword-container">
        <h5>RECOMMENDED</h5>
        <FlexContainer breakRow="wrap">
          {recommendedKeywords && recommendedKeywords.length > 0 ? (
            recommendedKeywords.map((k, index) => (
              <Keyword
                handleClick={() => {
                  const indexFound = keywords.findIndex((v) => v === k);
                  if (indexFound === -1) {
                    dispatch(setKeyword(k));
                  } else {
                    return;
                  }
                }}
                key={index}
                name={k}
                tagType="secondary"
                readonlyTag
                cursorPointer
              />
            ))
          ) : (
            <div>No keywords to recommend yet...</div>
          )}
        </FlexContainer>
      </FlexContainer>
    </KeywordSelectorLayout>
  );
}
