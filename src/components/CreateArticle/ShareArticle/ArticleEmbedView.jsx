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

        <FlexContainer justify="space-between">
          <FlexContainer className="post-content" column>
            <div style={{ flexGrow: 1 }}>
              <h4>{title}</h4>
            </div>
            <p style={{ flexGrow: 3 }}>{textContent}</p>
            <div style={{ flexGrow: 1 }}>
              <FlexContainer justify="space-around" inline>
                {keywords && keywords.length > 0 ? keywords.map((k, index) => <Tag key={index}>{k}</Tag>) : null}
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
          <div>
            {image && image.content?.featured_sm ? (
              <figure>
                <img src={image.content.featured_m} />
              </figure>
            ) : null}
            <FlexContainer justify="space-around" align="center" className="reactions-toolbar">
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
    </ShareArticleCardView>
  );
}
