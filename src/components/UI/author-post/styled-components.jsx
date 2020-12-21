import styled from 'styled-components';

export const AuthorMetaLayout = styled.div`
  & .author-metadata {
    font-family: Lato;
    font-style: normal;
    font-size: 12px;
    line-height: 14px;
  }

  & .date-metadata {
    color: #9695b7;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
  }

  & .post-author-avatar {
    overflow: hidden;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 0;
    margin-right: 10px;
    margin-bottom: 0;

    & img {
      width: 32px;
      height: auto;
    }
  }
`;
