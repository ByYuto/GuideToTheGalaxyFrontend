import React from 'react';
import { PlusIcon, CommentsIcon, PunchIcon, Ellipse } from '../../../assets/icons/svg-icons';
import FlexContainer from '../../UI/FlexContainer';
import Card from '../../UI/Card';
import Tag from '../../UI/Tag';
import { ShareArticleCardView } from './styled-components';
import { useDispatch } from 'react-redux';
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';

export default function ArticleEmbedView({
  _id,
  categoryId,
  contentTypeId,
  title,
  image,
  location,
  keywords,
  textContent,
}) {
  //const dispatch = useDispatch();
  return (
    <ShareArticleCardView>
      <Card fullWidth>
        <FlexContainer justify="space-between" align="center">
          <div className="breadcrumb">
            {categoryId} <Ellipse /> {contentTypeId} <Ellipse /> {location ? location : 'Worldwide'}
          </div>
        </FlexContainer>

        <FlexContainer justify="space-between" align="stretch">
          <FlexContainer className="post-content" column breakRow elmWidth="80%">
            <div style={{ flexGrow: 3 }}>
              <h4>{title}</h4>
              <p>{textContent}</p>
            </div>
            <div style={{ flexGrow: 1 }}>
              <FlexContainer justify="space-around" inline>
                {keywords && keywords.length > 0
                  ? keywords.map((k, index) => (
                      <Tag tagType="primary" sm key={index}>
                        {k}
                      </Tag>
                    ))
                  : null}
              </FlexContainer>
            </div>
            <div style={{ flexGrow: 1 }}>
              <FlexContainer align="center">
                <figure className="post-author-avatar">
                  <img src={AvatarPlaceholder} />
                </figure>
                <div className="author-metadata">
                  <div>
                    <strong>Author name</strong>
                  </div>
                  <div>
                    <span>June 12, 2019</span>
                  </div>
                </div>
              </FlexContainer>
            </div>
          </FlexContainer>
          <FlexContainer elmWidth="20%" column justify="flex-end">
            {image && image.content?.featured_sm ? (
              <figure>
                <img src={image.content.featured_m} />
              </figure>
            ) : null}
            <FlexContainer justify="space-evenly" align="center" className="reactions-toolbar" elmWidth="90%">
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
          </FlexContainer>
        </FlexContainer>
      </Card>
    </ShareArticleCardView>
  );
}
