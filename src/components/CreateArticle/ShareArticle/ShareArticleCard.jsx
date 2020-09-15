import React from 'react';
import { PlusIcon, CommentsIcon, PunchIcon, Ellipse } from '../../../assets/icons/svg-icons';
import FlexContainer from '../../UI/FlexContainer';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Tag from '../../UI/Tag';
import { ShareArticleCardLayout } from './styled-components';
import { insertEmbedArticle } from '../../../redux/reducers/newArticleState';
import { useDispatch } from 'react-redux';

export default function ShareArticleCard({
  _id,
  categoryId,
  contentTypeId,
  title,
  image,
  location,
  keywords,
  textContent,
  contentIndex,
  closeModal,
}) {
  const dispatch = useDispatch();
  const handleAddArticle = () => {
    closeModal(false);
    dispatch(insertEmbedArticle(contentIndex, _id));
  };
  return (
    <ShareArticleCardLayout existImage={!!image}>
      <Card>
        <FlexContainer justify="space-between" align="center">
          <div className="breadcrumb">
            {categoryId} <Ellipse /> {contentTypeId} <Ellipse /> {location ? location : 'Worldwide'}
          </div>
          <Button
            className="card-add-button"
            onClick={() => {
              handleAddArticle();
            }}
          >
            <PlusIcon />
            Add
          </Button>
        </FlexContainer>

        <FlexContainer className="post-content">
          <div>
            <div>
              <h4>{title}</h4>
            </div>
            <p>{textContent}</p>
          </div>
          {image && image.content?.featured_sm ? (
            <figure>
              <img src={image.content.featured_sm} />
            </figure>
          ) : null}
        </FlexContainer>
        <FlexContainer>
          <div style={{ width: '65%' }}>
            <FlexContainer justify="space-around" inline>
              {keywords && keywords.length > 0 ? keywords.map((k, index) => <Tag key={index}>{k}</Tag>) : null}
            </FlexContainer>
          </div>
          <div style={{ width: '32%' }}>
            <FlexContainer justify="space-between" align="center" className="reactions-toolbar">
              <div>
                <FlexContainer justify="space-around" align="center" inline>
                  <PunchIcon />
                  <span>0</span>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer justify="space-around" align="center" inline>
                  <CommentsIcon />
                  <span>0</span>
                </FlexContainer>
              </div>
            </FlexContainer>
          </div>
        </FlexContainer>
      </Card>
    </ShareArticleCardLayout>
  );
}
