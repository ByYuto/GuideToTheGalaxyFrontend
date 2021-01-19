import React, { useEffect, useRef, useState } from 'react';
import FlexContainer from '../UI/FlexContainer';
import Tag from '../UI/Tag';
import Dropdown from '../UI/dropdown/Dropdown';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getKeywordsSuggested, setSelectedKeyword, removeKeyword } from '../../redux/reducers/topbarSearch';
import _ from 'lodash';
import { IoIosClose } from 'react-icons/io';
import { LeftArrowIcon, RightArrowIcon, SortIcon, PlusIcon } from '../../assets/icons/svg-icons';
import { setVisibleSearch } from '../../redux/reducers/appState';

export default function KeywordsSection() {
  const { keywordSuggestions, keywordsSelected, categoryValue, locationValue } = useSelector(
    (store) => store.topbarSearch
  );
  const { showSearch } = useSelector((store) => store.app);
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
    dispatch(getKeywordsSuggested(categoryValue, locationValue, keywordsSelected));
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
  }, [
    categoryValue,
    locationValue,
    visibleRight,
    visibleLeft,
    currentPosition,
    keywordSuggestions.length,
    keywordsSelected.length,
  ]);

  return (
    <KeywordsSectionLayout className="keywords-container" align="center">
      <SorterContainer justify="flex-start">
        <SorterDropdown
          icon={<SortIcon className="location-icon" />}
          options={[{ description: 'Sort by popular' }, { description: 'Sort by recent' }]}
          defaultOption={'Sort by popular'}
        />
        {!showSearch ? (
          <button onClick={() => dispatch(setVisibleSearch(true))}>
            <PlusIcon /> Show search
          </button>
        ) : (
          <button onClick={() => dispatch(setVisibleSearch(false))}>
            <IoIosClose size={24} /> Hide search
          </button>
        )}
      </SorterContainer>
      <KeywordsContainer className="keywords-hidden">
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
              <Tag className="selected-keywords" key={index} mt tagType="primary">
                {tag}
                <IoIosClose className="closable" size={24} onClick={() => dispatch(removeKeyword(tag))} />
              </Tag>
            ))}
          {keywordsFiltered?.length > 0 &&
            keywordsFiltered.map((tag, index) => (
              <Tag key={index} mt tagType="secondary" onClick={() => addTag(tag)}>
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
      </KeywordsContainer>
    </KeywordsSectionLayout>
  );
}
const SorterDropdown = styled(Dropdown)`
  @media (max-width: 864px) {
    background: #151531;
    width: 50%;
    & input {
      background: #151531;
    }
  }
`;
const SorterContainer = styled(FlexContainer)`
  width: 10%;
  @media (max-width: 864px) {
    width: 100%;
    order: 2;
    background: #151531;
    justify-content: space-between;
  }

  & button {
    display: none;
    @media (max-width: 864px) {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: 0;
      background: none;
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      display: flex;
      align-items: center;
      color: #9695b7;
      height: 40px;

      & svg path,
      svg rect,
      svg circle {
        fill: #9695b7;
        stroke: #9695b7;
      }
    }
  }
`;

const KeywordsContainer = styled(FlexContainer)`
  width: 970px;
  overflow: hidden;
  overflow-x: scroll;
  align-items: center;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 600px) {
    width: 100vw;
  }
`;

const KeywordsSectionLayout = styled(FlexContainer)`
  position: relative;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  & > div:first-child {
    padding-right: 15px;
    margin-right: 15px;
    border-right: solid 1px #151531;
    width: 200px;
    @media (max-width: 600px) {
      width: 100vw;
      padding-right: 0px;
      margin-right: 0px;
    }
  }
  & .keywords {
    width: auto;
    white-space: nowrap;
    overflow-y: hidden;
    position: relative;
    /* box-shadow: inset 0 20px 20px rgba(21, 21, 49, 0.7);*/
    & > span {
      cursor: pointer;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
