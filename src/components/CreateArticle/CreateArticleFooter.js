import React, { useRef } from 'react';
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
  nexDisabledStep2,
  showNextStep2,
  showNextStep1,
}) => {
  const nextRef = useRef(null);
  const { loading, isUploadingPDF } = useSelector((store) => store.newArticle);

  return (
    <StyledFooter>
      {!loading ? (
        <>
          <Button primary rounded onClick={onExitClick} disabled={exitDisabled}>
            EXIT
          </Button>
          {showNextStep1 && (
            <Button primary rounded onClick={onNextClick} disabled={nextDisabled} ref={nextRef}>
              NEXT
            </Button>
          )}
          {showNextStep2 && (
            <Button primary rounded onClick={onNextClick} disabled={nexDisabledStep2} ref={nextRef}>
              NEXT
            </Button>
          )}
          {publish && (
            <Button primary rounded onClick={onPublish} disabled={publishDisabled || isUploadingPDF} ref={nextRef}>
              Publish {isUploadingPDF ? <Loader small={true} /> : null}
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
