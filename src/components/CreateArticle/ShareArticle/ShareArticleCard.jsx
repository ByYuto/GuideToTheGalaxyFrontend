import React from 'react';
import { PlusIcon, CommentsIcon, PunchIcon, Ellipse } from '../../../assets/icons/svg-icons';
import FlexContainer from '../../UI/FlexContainer';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import FeaturedImg from '../../../assets/images/Articles/Preview/article-feature.jpg';
import Tag from '../../UI/Tag';
import { ShareArticleCardLayout } from './styled-components';

export default function ShareArticleCard() {
  return (
    <ShareArticleCardLayout>
      <Card>
        <FlexContainer justify="space-between" align="center">
          <div className="breadcrumb">
            Category <Ellipse /> Subcategory <Ellipse /> Location
          </div>
          <Button className="card-add-button">
            <PlusIcon />
            Add
          </Button>
        </FlexContainer>
        <div>
          <h4>A title for the card</h4>
        </div>
        <FlexContainer>
          <div>
            <p>
              La descripcion... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore doloribus illo, non
              quibusdam adipisci, modi vero iste iure delectus optio tenetur. Perferendis eveniet sunt sed, ipsam
              repellat nisi corporis adipisci.
            </p>
          </div>
          <figure>
            <img src={FeaturedImg} />
          </figure>
        </FlexContainer>
        <FlexContainer>
          <div style={{ width: '65%' }}>
            <FlexContainer justify="space-around" inline>
              <Tag>Keyword</Tag>
              <Tag>Keyword</Tag>
              <Tag>Keyword</Tag>
            </FlexContainer>
          </div>
          <div style={{ width: '35%' }}>
            <FlexContainer justify="space-between" align="center" className="reactions-toolbar">
              <div>
                <FlexContainer justify="space-around" align="center" inline>
                  <PunchIcon />
                  <span>15</span>
                </FlexContainer>
              </div>
              <div>
                <FlexContainer justify="space-around" align="center" inline>
                  <CommentsIcon />
                  <span>99</span>
                </FlexContainer>
              </div>
            </FlexContainer>
          </div>
        </FlexContainer>
      </Card>
    </ShareArticleCardLayout>
  );
}
