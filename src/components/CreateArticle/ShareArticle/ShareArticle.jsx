import React, { useEffect } from 'react';
import { ShareArticleLayout } from './styled-components';
import SearchBar from '../../UI/search-bar/SearchBar';
import FlexContainer from '../../UI/FlexContainer';
import ShareArticleCard from './ShareArticleCard';
//import { getArticles, getEmbedArticle, getEmbedArticles } from '../../../redux/reducers/articles';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../UI/Loader';
import { getEmbedArticles } from '../../../redux/reducers/articles';
export default function ShareArticle({ contentIndex, closeModal, confirmArticle, editorState }) {
  const { embedArticles, loading } = useSelector((store) => store.articles);
  const dispatch = useDispatch();
  useEffect(() => {
    if (embedArticles.length < 1) {
      dispatch(getEmbedArticles(''));
    }
  }, [dispatch, embedArticles]);
  return (
    <ShareArticleLayout loading={loading ? 'true' : null}>
      <SearchBar />
      <FlexContainer className="articles-container">
        {!loading ? (
          embedArticles.length > 0 ? (
            embedArticles.map((article, index) => (
              <ShareArticleCard
                confirmArticle={confirmArticle}
                closeModal={closeModal}
                contentIndex={contentIndex}
                key={index}
                {...article}
                editorState={editorState}
              />
            ))
          ) : (
            <div>No data to display...</div>
          )
        ) : (
          <Loader color="#6670F0" />
        )}
      </FlexContainer>
    </ShareArticleLayout>
  );
}
