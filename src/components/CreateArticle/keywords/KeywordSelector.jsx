import React, { useEffect, useState } from 'react';
import { KeywordSelectorLayout } from './styled-components';
import FlexContainer from '../../UI/FlexContainer';
import SearchKeywords from './SearchKeywords';
import { useSelector, useDispatch } from 'react-redux';
import Keyword from './Keyword';
import { setKeyword } from '../../../redux/reducers/newArticleState';
import { getRecommendedKeywords } from '../../../redux/reducers/keywords';
import { getCatId } from '../../../utils/utils';
import { buildKeywordsArr } from './utils';
import Notice from '../../../components/UI/notice/Notice';

export default function KeywordSelector() {
  const {
    newArticle: { keywords, categoryId, contentTypeId },
  } = useSelector((store) => store.newArticle);
  const { recommendedKeywords } = useSelector((store) => store.keywords);
  const { categories } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const [notice, setNotice] = useState(false);
  useEffect(() => {
    const catId = getCatId(categories, categoryId);
    dispatch(getRecommendedKeywords(catId, contentTypeId));
  }, []);
  const recommendedFiltered = buildKeywordsArr(recommendedKeywords, keywords);
  return (
    <KeywordSelectorLayout>
      {notice && (
        <Notice
          duration={4000}
          type="error"
          text={'You reach the max allowed keywords selected'}
          callBack={() => setNotice(false)}
        />
      )}
      <FlexContainer column align="stretch" className="add-keyword-container">
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
      <FlexContainer column align="stretch" className="recommend-keyword-container">
        <h5>RECOMMENDED</h5>
        <FlexContainer breakRow="wrap" className="recommended-keywords-parent">
          {recommendedFiltered && recommendedFiltered.length > 0 ? (
            recommendedFiltered.map((k, index) => (
              <Keyword
                handleClick={() => {
                  const indexFound = keywords.findIndex((v) => v === k);
                  if (indexFound === -1 && keywords.length < 10) {
                    dispatch(setKeyword(k));
                  } else {
                    setNotice(true);
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
