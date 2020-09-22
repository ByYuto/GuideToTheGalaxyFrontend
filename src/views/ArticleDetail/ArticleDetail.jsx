import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledView, MaxWidthContainer, ArticleDetailContainer } from './styled-components';
import FlexContainer from '../../components/UI/FlexContainer';
import ExampleFeaturedImage from '../../assets/images/example-featured-img.jpg';
import AvatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import { Ellipse, CalendarIcon, OpenlinkIcon, PunchIcon, CommentsIcon } from '../../assets/icons/svg-icons';

export default function ArticleDetail() {
  return (
    <ArticleDetailContainer>
      <ThemeProvider theme={{ isDark: true }}>
        <StyledView className="header-content">
          <MaxWidthContainer>
            <div className="breadcrumb">
              Category <Ellipse /> Subcategory <Ellipse /> Worldwide
            </div>
            <FlexContainer className="metadata-container" align="stretch">
              <FlexContainer elmWidth="80%" column align="stretch">
                <h2>A title of an article 'cuz still don't have an endpoint to request data</h2>
                <div className="metadata-date">
                  <CalendarIcon className="head-article-content-icon" />
                  <span>Passed: June 12, 2019</span>
                </div>
                <div className="metadata-url">
                  <a href="https://youtube.com" target="_blank">
                    <OpenlinkIcon className="head-article-content-icon-link" />
                    https://www.theguardian.com/commentisfree/2019/
                  </a>
                </div>
              </FlexContainer>
              <FlexContainer elmWidth="20%" align="center">
                <figure className="featured-img">
                  <img src={ExampleFeaturedImage} />
                </figure>
              </FlexContainer>
            </FlexContainer>
          </MaxWidthContainer>
        </StyledView>
        <StyledView className="after-header-content">
          <MaxWidthContainer>
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
          </MaxWidthContainer>
        </StyledView>
        <p>
          <OpenlinkIcon className="head-article-content-icon" />
        </p>
      </ThemeProvider>
    </ArticleDetailContainer>
  );
}
