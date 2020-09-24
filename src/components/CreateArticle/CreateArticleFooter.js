import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
import { useSelector } from 'react-redux';
import Loader from '../UI/Loader';

const StyledFooter = styled.div`
  display: flex;
  //flex-direction: row;
  justify-content: center;
  background: ${(props) => props.theme.baseColors.dark};
  border-top: 1px solid ${(props) => props.theme.accentColors.primary.color};
  padding-top: 24px;
  padding-bottom: 24px;
  z-index: 21;
  ${Button} {
    min-width: 128px;
    //background-color: ${(props) => props.theme.baseColors.middle};
    margin: 0 12px;
  }
`;

const CreateArticleFooter = ({
  onExitClick,
  onNextClick,
  exitDisabled,
  nextDisabled,
  publish,
  publishDisabled,
  onPublish,
}) => {
  const nextRef = useRef(null);
  const { loading, error, errorMessage } = useSelector((store) => store.newArticle);
  return (
    <StyledFooter>
      {!loading ? (
        <>
          <Button primary rounded onClick={onExitClick} disabled={exitDisabled}>
            EXIT
          </Button>
          {!publish && (
            <Button primary rounded onClick={onNextClick} disabled={nextDisabled} ref={nextRef}>
              NEXT
            </Button>
          )}
          {publish && (
            <Button primary rounded onClick={onPublish} disabled={publishDisabled} ref={nextRef}>
              Publish
            </Button>
          )}
        </>
      ) : (
        <Loader />
      )}
    </StyledFooter>
  );
};

export default CreateArticleFooter;
