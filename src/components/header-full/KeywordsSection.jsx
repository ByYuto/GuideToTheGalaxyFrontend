import React, { useEffect, useRef, useState } from 'react';
import FlexContainer from '../UI/FlexContainer';
import Tag from '../UI/Tag';
import Dropdown from '../UI/dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getKeywordsSuggested, setSelectedKeyword, removeKeyword } from '../../redux/reducers/topbarSearch';
import _ from 'lodash';
import { IoIosClose } from 'react-icons/io';
import { LeftArrowIcon, RightArrowIcon, SortIcon } from '../../assets/icons/svg-icons';
export default function KeywordsSection() {
  const { keywordSuggestions, keywordsSelected, categoryValue, locationValue } = useSelector(
    (store) => store.topbarSearch
  );
  const dispatch = useDispatch();

  const keywordContainer = useRef(null);
  const addTag = (tag) => {
    dispatch(setSelectedKeyword(tag));
  };
  const [visibleRight, setVisibleRight] = useState(true);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const buildKeywordsArr = (available, selected) => {
    const availableFiltered = _.difference(available, selected);
    return availableFiltered;
  };

  const handleShowLeftArrow = () => {
    if (keywordContainer && keywordContainer.current) {
      const currentScrollPosition = keywordContainer.current.scrollLeft;
      if (currentScrollPosition !== 0) {
        setVisibleLeft(true);
      } else {
        setVisibleLeft(false);
      }
    }
  };
  const handleShowRightArrow = () => {
    if (keywordContainer && keywordContainer.current) {
      const scrollableWidth = keywordContainer.current.scrollWidth;
      const noScrollableWidth = Math.ceil(keywordContainer.current.offsetWidth);
      const currentScrollPosition = keywordContainer.current.scrollLeft;
      const topScroll = Math.ceil(scrollableWidth - currentScrollPosition);
      if (topScroll === noScrollableWidth) {
        setVisibleRight(false);
      } else {
        setVisibleRight(true);
      }
    }
  };

  const handleRightScroll = () => {
    if (keywordContainer && keywordContainer.current) {
      setCurrentPosition((keywordContainer.current.scrollLeft += 50));
    }
  };
  const handleLeftScroll = () => {
    if (keywordContainer && keywordContainer.current) {
      setCurrentPosition((keywordContainer.current.scrollLeft -= 50));
    }
  };
  const keywordsFiltered = buildKeywordsArr(keywordSuggestions, keywordsSelected);
  useEffect(() => {
    dispatch(getKeywordsSuggested(categoryValue, locationValue));
    handleShowLeftArrow();
    handleShowRightArrow();
    keywordContainer.current.addEventListener('scroll', () => {
      handleShowLeftArrow();
      handleShowRightArrow();
    });
    const keywordContainerRef = keywordContainer.current;
    return () => {
      keywordContainerRef.removeEventListener('scroll', () => {
        handleShowLeftArrow();
        handleShowRightArrow();
        keywordContainerRef.scrollLeft = 0;
      });
    };
  }, [categoryValue, locationValue, visibleRight, visibleLeft, currentPosition]);
  return (
    <FlexContainer className="keywords-container" align="center">
      <FlexContainer elmWidth="10%" justify="flex-start">
        <Dropdown
          icon={<SortIcon className="location-icon" />}
          options={[
            { active: true, description: 'Sort by popular' },
            { active: false, description: 'Sort by recent' },
          ]}
          defaultOption={'Sort by popular'}
        />
      </FlexContainer>
      <FlexContainer className="keywords-hidden" elmWidth="80%">
        {visibleLeft && keywordsFiltered?.length > 0 && (
          <>
            <div className="left-arrow">
              <button onClick={handleLeftScroll}>
                <LeftArrowIcon />
              </button>
            </div>
            <div className="left-arrow-blurred"></div>
          </>
        )}
        <div ref={keywordContainer} className="keywords">
          {keywordsSelected?.length > 0 &&
            keywordsSelected.map((tag, index) => (
              <Tag className="selected-keywords" key={index} md tagType="primary">
                {tag}
                <IoIosClose className="closable" size={24} onClick={() => dispatch(removeKeyword(tag))} />
              </Tag>
            ))}
          {keywordsFiltered?.length > 0 &&
            keywordsFiltered.map((tag, index) => (
              <Tag key={index} md tagType="secondary" onClick={() => addTag(tag)}>
                {tag}
              </Tag>
            ))}
        </div>
        {visibleRight && keywordsFiltered?.length > 0 && (
          <>
            <div className="right-arrow">
              <button onClick={handleRightScroll}>
                <RightArrowIcon />
              </button>
            </div>
            <div className="right-arrow-blurred"></div>
          </>
        )}
      </FlexContainer>
    </FlexContainer>
  );
}
