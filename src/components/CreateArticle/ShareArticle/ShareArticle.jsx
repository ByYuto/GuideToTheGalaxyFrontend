import React, { useEffect } from 'react';
import { ShareArticleLayout } from './styled-components';
import SearchBar from '../../UI/search-bar/SearchBar';
import FlexContainer from '../../UI/FlexContainer';
import ShareArticleCard from './ShareArticleCard';
//import { getArticles, getEmbedArticle, getEmbedArticles } from '../../../redux/reducers/articles';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../../UI/Loader';
import { getEmbedArticles } from '../../../redux/reducers/articles';
export default function ShareArticle({ contentIndex, closeModal }) {
  const { embedArticles, loading, error, errorMessage } = useSelector((store) => store.articles);
  const dispatch = useDispatch();
  useEffect(() => {
    if (embedArticles.length < 1) {
      dispatch(getEmbedArticles(''));
    }
  }, []);
  return (
    <ShareArticleLayout loading={loading}>
      <SearchBar />
      <FlexContainer className="articles-container">
        {!loading ? (
          embedArticles.length > 0 ? (
            embedArticles.map((article, index) => (
              <ShareArticleCard closeModal={closeModal} contentIndex={contentIndex} key={index} {...article} />
            ))
          ) : (
            <div>No data to display...</div>
          )
        ) : (
          <Loader color="#6670F0">
            <div></div>
            <div></div>
          </Loader>
        )}
      </FlexContainer>
    </ShareArticleLayout>
  );
}
