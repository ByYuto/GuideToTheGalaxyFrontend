import React from 'react';
import { Ellipse } from '../../../assets/icons/svg-icons';
import FlexContainer from '../../UI/FlexContainer';
import Card from '../../UI/Card';
import Tag from '../../UI/Tag';
import { ShareArticleCardView } from './styled-components';
import ToolbarReactions from '../../UI/reaction-toolbar/ToolbarReactions';
import AuthorMeta from '../../UI/author-post/AuthorMeta';
import { getDateFormatted } from '../../../utils/utils';
export default function ArticleEmbedView({
  _id,
  categoryId,
  contentTypeId,
  title,
  image,
  location,
  keywords,
  textContent,
  user,
  create_at,
  updated_at,
  liked,
  likes,
  slug,
}) {
  //const dispatch = useDispatch();
  const keyWordsCutted = keywords?.slice(0, 10) || [];
  return (
    <ShareArticleCardView to={`/${categoryId.toLowerCase()}/${slug}`} className="article-container">
      <Card fullWidth>
        <FlexContainer justify="space-between" align="center">
          <div className="breadcrumb">
            {categoryId} <Ellipse /> {contentTypeId} <Ellipse /> {location ? location : 'Worldwide'}
          </div>
        </FlexContainer>

        <FlexContainer justify="space-between" align="stretch">
          <FlexContainer className="post-content" column breakRow="wrap" elmWidth="80%">
            <div style={{ flexGrow: 3 }}>
              <h4>{title}</h4>
              <p>{textContent}</p>
            </div>
            <div style={{ flexGrow: 1 }}>
              <FlexContainer justify="space-around" inline>
                {keyWordsCutted && keyWordsCutted.length > 0
                  ? keyWordsCutted.map((k, index) => (
                      <Tag tagType="primary" sm key={index} className="tag-embed-post">
                        {k}
                      </Tag>
                    ))
                  : null}
              </FlexContainer>
            </div>
            <div style={{ flexGrow: 1 }}>
              {user && (
                <AuthorMeta
                  authorName={user?.name}
                  postDate={(updated_at && getDateFormatted(updated_at)) || (create_at && getDateFormatted(create_at))}
                  avatarUrl={user?.avatar}
                />
              )}
            </div>
          </FlexContainer>
          <FlexContainer elmWidth="20%" column justify="flex-end">
            {image && image.content?.featured_sm ? (
              <figure>
                <img src={image.content.featured_m} alt={title} />
              </figure>
            ) : null}
            <FlexContainer justify="space-evenly" align="center" className="reactions-toolbar" elmWidth="90%">
              <ToolbarReactions articleId={_id} liked={liked} likes={likes} />
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </Card>
    </ShareArticleCardView>
  );
}
